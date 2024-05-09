import os
import smtplib
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import requests
from dotenv import find_dotenv, load_dotenv
from flask import Blueprint, jsonify, request
from flask_login import login_required
from recurrent import RecurringEvent

load_dotenv(find_dotenv())

scheduler = Blueprint("scheduler", __name__)


@scheduler.route("/process-time", methods=["POST"])
@login_required
def process_time():
    """
    Parses a time string to determine if it represents a recurring or single event and returns the rrule and parameters.

    @return: A JSON response with the rrule, parameters, and event type.
    """
    time_string = request.json.get("time")
    if not time_string:
        return jsonify({"error": "No time string provided"}), 400

    r = RecurringEvent(now_date=datetime.now().replace(microsecond=0).isoformat())

    try:
        result = r.parse(time_string)
        if not result:
            raise ValueError("Could not parse time string into a recurring rule")
    except Exception as e:
        return jsonify({"error": f"Invalid time format: {str(e)}"}), 400

    params = r.get_params()
    process_datetime_params(params, ["until", "dtstart"])

    event_type = "recurring" if r.is_recurring else "single"
    return jsonify({"result": result, "params": params, "type": event_type}), 200


def process_datetime_params(params, keys):
    """
    Processes and formats datetime parameters in the event parameters.

    @param params: The event parameters.
    @param keys: The keys of the datetime parameters to process.
    """
    for key in keys:
        if key in params:
            try:
                formatted_datetime = datetime.strptime(params[key], "%Y%m%dT%H%M%S")
                params[key] = formatted_datetime.isoformat(timespec="minutes")
            except ValueError as e:
                print(f"Error formatting {key}: {str(e)}")


@scheduler.route("/schedule", methods=["POST"])
@login_required
def schedule_time():
    """
    Schedules an email to be sent at a specified time based on the provided cron expression.

    @return: A JSON response with a message indicating whether the email was scheduled successfully.
    """
    data = request.json
    schedule_type = data.get("type")
    cron = data.get("cron")
    subject = data.get("subject")
    message = data.get("message")
    to_email = "ps2245@cornell.edu"

    headers = generate_auth_headers(cron)
    destination = f"{os.environ.get('HOSTED_URL')}/send-email/"
    body = {"subject": subject, "message": message, "to_email": to_email, "cron": cron}
    qstash_url = "https://qstash.upstash.io/v2/schedules/"

    response = post_schedule_request(qstash_url + destination, headers, body)
    return process_schedule_response(response)


def generate_auth_headers(cron):
    """
    Generates headers for the scheduling API request.

    @param cron: The cron expression for the scheduled email.

    @return: A dictionary containing the headers for the request.
    """
    token = os.getenv("QSTASH_TOKEN")
    return {"Authorization": f"Bearer {token}", "Upstash-Cron": cron}


def post_schedule_request(url, headers, body):
    """
    Sends a POST request to the scheduling API.

    @param url: The URL of the QStash scheduling API and the destination URL for the scheduled email endpoint.
    @param headers: The headers for the request.
    @param body: The body of the request.

    @return: The response object from the request.
    """
    return requests.post(url, headers=headers, json=body)


def process_schedule_response(response):
    """
    Processes the response from the scheduling API.

    @param response: The response object from the scheduling API.

    @return: A JSON response with a message indicating whether the email was scheduled successfully.
    """
    if response.status_code in {200, 201}:
        data = response.json()
        message = "Email scheduled successfully!"
        return (jsonify({"message": message, "ID": data.get("scheduleId")}), 200)
    else:
        return jsonify({"error": f"Error scheduling email: {response.text}"}), 400


@scheduler.route("/send-email", methods=["POST"])
@login_required
def send_email():
    """
    Sends an email to a specified recipient.

    @param subject: The subject of the email.
    @param message: The message body of the email.
    @param to_email: The recipient's email address.

    @return: A JSON response with a message indicating whether the email was sent successfully.
    """
    data = request.json
    try:
        email_sent = send_email_func(data["subject"], data["message"], data["to_email"])
        if not email_sent["success"]:
            return jsonify({"error": email_sent["message"]}), 400
        return jsonify({"message": email_sent["message"]}), 200
    except Exception as e:
        return jsonify({"error": f"Error sending email: {str(e)}"}), 400


def send_email_func(subject, body, to_email):
    """
    Sends an email to the specified recipient.

    @param subject: The subject of the email.
    @param body: The body of the email.
    @param to_email: The recipient's email address.

    @return: A dictionary with a success flag and a message indicating the result of the email sending.
    """
    sender_email = os.getenv("EMAIL")
    password = os.getenv("PASSWORD")
    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 587

    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = to_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as smtp_server:
            smtp_server.starttls()
            smtp_server.login(sender_email, password)
            text = message.as_string()
            smtp_server.sendmail(sender_email, to_email, text)
            return {"success": True, "message": "Email sent successfully"}
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return {"success": False, "message": "Error sending email: {}".format(str(e))}

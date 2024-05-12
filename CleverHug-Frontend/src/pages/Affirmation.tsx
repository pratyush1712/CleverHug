import { useState } from "react";
import { rruleToCron, textToCron, cronToText } from "../utils/rrule";
import Loading from "../components/UI/Loading";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function Affirmation() {
	const [message, setMessage] = useState("");
	const [time, setTime] = useState("");
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState({ message: "", ID: "" });
	const [processedTime, setProcessedTime] = useState<any>(null);
	const [showTooltip, setShowTooltip] = useState(false);
	const [showMistakeTooltip, setShowMistakeTooltip] = useState(false);
	const [cron, setCron] = useState("");

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		// const response = await fetch(`${SERVER_URL}/scheduler/process-time`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Authorization: `Bearer ${localStorage.getItem("token")}`
		// 	},
		// 	body: JSON.stringify({ time })
		// });
		// const data = await response.json();
		// if (!response.ok) {
		// 	setError(data.error);
		// 	setLoading(false);
		// 	return;
		// }
		const cron = await textToCron(time);
		const text = await cronToText(cron);
		const data = { result: text, type: "recurring" };
		// const cronResp = await rruleToCron(data.result);
		setCron(cron);
		setProcessedTime(data);
		setLoading(false);
		setShowConfirmation(true);
	};

	const handleConfirm = async () => {
		const emailData = {
			subject: "PRATYUSH, YOU GOT THIS!",
			message,
			schedule_time: processedTime.result,
			cron: "55 * * * *", //cron !== "" ? cron : "50 8 * * 3",
			type: processedTime.type
		};
		const response = await fetch(`${SERVER_URL}/scheduler/schedule`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify(emailData)
		});
		const data = await response.json();
		setSuccess(data);
		setMessage("");
		setTime("");
		setLoading(false);
		setShowConfirmation(false);
	};

	const handleCancel = () => {
		setLoading(false);
		setShowConfirmation(false);
	};

	const rruleToText = (data: any) => {
		const rrule = data.params;
		const type = data.type;
		const freqMap: any = {
			yearly: "Yearly",
			monthly: "Monthly",
			weekly: "Weekly",
			daily: "Daily",
			hourly: "Hourly",
			minutely: "Minutely",
			secondly: "Secondly"
		};
		const untilFormat = new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric"
		});
		const recurring = type === "recurring";
		const freq = freqMap[rrule.freq];
		const interval = rrule.interval;
		const byweekday = rrule.byweekday;
		const byhour = rrule.byhour;
		const byminute = rrule.byminute;
		const bysecond = rrule.bysecond;
		const count = rrule.count;
		const until = rrule.until;
		const untilDate = until ? untilFormat.format(new Date(until)) : "";
		const text = recurring
			? `Repeats ${freq} every ${interval} ${interval > 1 ? "times" : "time"} ${byweekday ? `on ${byweekday}` : ""} ${
					byhour ? `at ${byhour} hours` : ""
				} ${byminute ? `at ${byminute} minutes` : ""} ${bysecond ? `at ${bysecond} seconds` : ""} ${count ? `for ${count} times` : ""} ${
					until ? `until ${untilDate}` : ""
				}`
			: `Once at ${untilFormat.format(new Date(rrule))}`;
		return text;
	};

	if (loading) return <Loading />;

	if (success && success.ID !== "" && success.message !== "") {
		const closeSuccess = setTimeout(() => {
			setSuccess({ message: "", ID: "" });
			clearTimeout(closeSuccess);
		}, 10000);
		return (
			<div className="top-20 bg-green-100 border border-green-400 text-green-700 md:w-3/4 px-4 py-3 rounded relative" role="alert">
				<strong className="font-bold">Success! </strong>
				<span className="block sm:inline">{success.message}</span>
				<br />
				Schedule ID: <span className="block sm:inline bg-green-900 text-white px-1.5 py-0.5">{success.ID}</span>
				<button onClick={() => setSuccess({ message: "", ID: "" })} className="absolute top-0 bottom-0 right-0 px-4 py-3">
					<svg
						xmlns="XXXXXXXXXXXXXXXXXXXXXXXXXX"
						className="h-6 w-6 text-green-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		);
	}

	if (error && error !== "") {
		const closeError = setTimeout(() => {
			setError("");
			clearTimeout(closeError);
		}, 10000);
		return (
			<div className="top-20 bg-red-100 border border-red-400 text-red-700 px-4 py-3 md:w-3/4 rounded relative" role="alert">
				<strong className="font-bold">Error! </strong>
				<span className="block sm:inline">{error}</span>
				<button onClick={() => setError("")} className="absolute top-0 bottom-0 right-0 px-4 py-3">
					<svg
						xmlns="XXXXXXXXXXXXXXXXXXXXXXXXXX"
						className="h-6 w-6 text-red-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		);
	}

	if (showConfirmation) {
		return (
			<div className="top-28 relative space-y-6 max-w-3xl min-h-full bg-sidebar-selected p-4 rounded-lg text-white">
				<h2>Please confirm your schedule</h2>
				<p className="">
					<strong className="bg-gray-900">Please Confirm the Message:</strong>
					<br /> {message}
				</p>
				<p className="relative">
					<strong className="bg-gray-900 relative">
						Please Confirm the Scheduled Times (processed by AI):
						<div
							className="absolute -right-3.5 top-0 cursor-pointer invert"
							onMouseOver={() => setShowMistakeTooltip(true)}
							onMouseOut={() => setShowMistakeTooltip(false)}
						>
							<img src="/assets/info.png" alt="question mark" className="w-3 h-3 color-white" />
							{showMistakeTooltip && (
								<div className="absolute top-full mt-2 ml-2 w-64 rounded-md bg-black shadow-lg p-3 text-sm text-gray-100">
									<strong>Common mistakes:</strong>
									<ul className="list-disc pl-4">
										<li className="text-gray-400 text-sm">Check Spellings of words like 'Tomorrow'.</li>
										<li className="text-gray-400 text-sm">Try removing 'Today' from the text.</li>
										<li className="text-gray-400 text-sm">Inconsistent intervals (e.g., mixing days and months).</li>
									</ul>
								</div>
							)}
						</div>
					</strong>
					<br />
					{processedTime && processedTime.result}
				</p>
				<p>
					<strong className="bg-gray-900">Please Confirm the CRON:</strong>
					<br /> {cron}
				</p>
				<button
					onClick={handleConfirm}
					className="bg-purple-button hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Confirm
				</button>
				<button
					onClick={handleCancel}
					className="bg-purple-button hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
				>
					Cancel
				</button>
			</div>
		);
	}

	return (
		<div className="space-y-3 pt-20 md:ml-3 md:max-w-[50vw] md:min-w-[50vw] min-h-full flex flex-row">
			<form className="space-y-3 w-full max-w-2/3 min-h-full" onSubmit={handleSubmit}>
				<h1 className="text-3xl font-semibold pb-2">Create Your Daily Affirmation</h1>
				<div className="pr-4 md:pr-0">
					<h2 className="block text-white py-1 pt-3.5">
						<label htmlFor="message">What's your message?</label>
					</h2>
					<textarea
						id="message"
						name="message"
						rows={5}
						className="mt-1 block w-full md:min-w-2/3 text-black rounded-lg p-3 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						placeholder="Write a positive message to yourself"
						value={message}
						onChange={e => setMessage(e.target.value)}
					/>
				</div>
				<div className="pr-4 md:pr-0">
					<label htmlFor="time" className="relative block text-sm font-medium text-white py-1">
						When would you like to receive this?
						<div className="ml-2">
							<span
								className="absolute bottom-3.5 left-[37.5%] invert cursor-pointer"
								onMouseOver={() => setShowTooltip(true)}
								onMouseOut={() => setShowTooltip(false)}
							>
								<img src="/assets/info.png" alt="question mark" className="w-3 h-3 color-white" />
							</span>
							{showTooltip && (
								<div className="absolute top-full mt-2 w-64 rounded-md bg-white shadow-lg p-3 text-sm text-gray-700">
									Examples of time queries:
									<ul className="list-disc pl-4">
										{[
											"Every day at 9:00 AM",
											"Every other day at 9:00 AM",
											"Every week at 9:00 AM",
											"Every other week at 9:00 AM",
											"Every month at 9:00 AM",
											"Every other month at 9:00 AM",
											"Every year at 9:00 AM",
											"From 9:00 AM to 5:00 PM",
											"On Second Tuesday of every month at 9:00 AM",
											"Every 30 minutes From 9:00 AM to 5:00 PM on Second Tuesday of every month for 2 years"
										].map(example => (
											<li key={example} className="text-gray-900 text-sm">
												{example}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</label>
					<input
						type="text"
						id="time"
						name="time"
						className="mt-1 block w-full md:min-w-2/3 mb-4 rounded-lg p-3 border text-black border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						placeholder="Enter a time or time range"
						value={time}
						onChange={e => setTime(e.target.value)}
					/>
				</div>
				<div className="pr-4 md:pr-0">
					<button
						type="submit"
						className="w-full md:min-w-2/3 rounded-lg py-2 flex justify-center mt-6 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-button hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
					>
						Schedule
					</button>
				</div>
			</form>
			{/* <div className="min-h-full">
				<h1 className="text-3xl font-semibold pb-2">Preview</h1>
				<div className="flex flex-col space-y-4">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="bg-sidebar-selected p-4 rounded-lg text-white w-80">
							<h2 className="text-xl font-semibold">Your Daily Affirmation</h2>
							<p>{message}</p>
							<p>{processedTime}</p>
							<p>{cron}</p>
						</div>
					))}
				</div>
			</div> */}
		</div>
	);
}

export default Affirmation;

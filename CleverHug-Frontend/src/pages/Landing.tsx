import { useEffect, useState } from "react";
import Loading from "../components/UI/Loading";

export default function Landing() {
	const [email, setEmail] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [alertDisplay, setAlertDisplay] = useState<{ type: string; message: string; color: string } | null>(null);

	const validateEmail = (email: string) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	const handleSignUp = async () => {
		if (!email || !validateEmail(email)) {
			setAlertDisplay({ type: "error", message: "Please enter a valid email adress", color: "red" });
			return;
		}
		setLoading(true);
		const SERVER_URL = process.env.REACT_APP_SERVER_URL;
		const response = await fetch(`${SERVER_URL}/scheduler/send-email`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				to_email: "ps2245@cornell.edu",
				subject: `Someone signed up for CleverHug!`,
				message: `Someone signed up for CleverHug! Their email is ${email}.`
			})
		});
		setLoading(false);
		if (response.ok) {
			const data = await response.json();
			setAlertDisplay({
				type: "success",
				message: "Thank you for signing up! You will receive an email from me shortly :)",
				color: "green"
			});
			setEmail("");
		} else {
			setAlertDisplay({
				type: "error",
				message: "Something went wrong. Please try again later or shoot me an email at pratyush@cleverhugs.life",
				color: "red"
			});
		}
		setLoading(false);
	};

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setAlertDisplay(null);
			clearTimeout(timeOut);
		}, 5000);
	}, [alertDisplay]);

	return (
		<div className="flex flex-col min-h-screen w-full bg-sidebar-background px-4 sm:px-6 lg:px-8 justify-start items-center">
			<header className="fixed top-0 w-full bg-main-background text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-800 text-sm">
				<div className="container mx-auto flex justify-between items-center">
					<div className="flex items-center space-x-3">
						<img src="/assets/app-logo.png" alt="Logo" className="w-6 h-6 inline-block" />
						<h1 className="text-lg sm:text-xl">CleverHug</h1>
					</div>
				</div>
			</header>
			{alertDisplay !== null && alertDisplay.message !== "" && (
				<div
					className={`top-20 bg-${alertDisplay.color}-600 border border-${alertDisplay.color}-400 text-${alertDisplay.color}-700 px-4 py-3 md:w-3/4 rounded relative`}
					role="alert"
				>
					<strong className="font-bold px-2">{alertDisplay.type.toUpperCase()}!</strong>
					<span className="block sm:inline">{alertDisplay.message}</span>
					<button onClick={() => setAlertDisplay(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
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
			)}
			<div className="flex flex-col sm:flex-row text-white full mt-16 sm:mt-24 mx-auto sm:px-6 lg:px-8 justify-center items-center">
				<img
					src="/assets/landing_banner.jpg"
					alt="Mindful Mail Logo"
					className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-0 sm:ml-10 mb-4 mt-4 rounded-lg border border-purple-button"
				/>
				<div className="flex-1 max-w-4xl">
					<div className="rounded-lg p-4 sm:px-6 lg:px-8">
						<div className="flex flex-col text-left align-left">
							<h1 className="font-manrope font-bold text-3xl sm:text-4xl lg:text-5xl mb-6">
								Empower Your Day with Scheduled Messages
							</h1>
							<p className="text-md sm:text-lg mb-6">
								CleverHug helps you schedule reminders for tasks, or send uplifting messages and affirmations to your future
								self. It’s a tool designed to keep you motivated and organized, making it easier for you to manage your time
								and maintain a positive mindset.
							</p>
							<div className="flex min-w-[100%] max-w-md">
								<input
									type="email"
									value={email}
									onKeyDown={e => e.key === "Enter" && handleSignUp()}
									onChange={e => setEmail(e.target.value)}
									placeholder="Email Address"
									className="flex-1 p-2 border text-black border-gray-300 rounded-l-lg focus:outline-none"
								/>
								<button
									className="bg-purple-button hover:bg-purple-600 text-white rounded-r-md px-4 text-sm md:text-lg"
									onClick={handleSignUp}
								>
									{loading ? <Loading /> : "Sign Up"}
								</button>
							</div>
							<button
								className="hover:bg-purple-button bg-purple-600 text-white rounded-md px-4 my-4 p-2 font-medium"
								onClick={() => (window.location.href = "/login")}
							>
								{loading ? <Loading /> : "Check out the app"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

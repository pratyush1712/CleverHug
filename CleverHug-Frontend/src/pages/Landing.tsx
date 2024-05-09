import { useState } from "react";

export default function Landing() {
	const [email, setEmail] = useState<string>("");

	const handleSignUp = async () => {
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

		const data = await response.json();
		if (response.ok) alert("Successfulle sent email to CleverHug team (THAT'S ME!) I will reach out to you soon.");
		else alert("Something went wrong. Please try again later or shoot me an email at ps2245@cornell.edu");
		window.location.href = "/login";
	};

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
			<div className="flex flex-col sm:flex-row text-white full mt-20 sm:mt-28 mx-auto sm:px-6 lg:px-8 justify-center items-start">
				<img
					src="/assets/landing_banner.jpg"
					alt="Mindful Mail Logo"
					className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-0 sm:mx-10 mb-8 rounded-lg border-4 border-[#2c2a2e]"
				/>
				<div className="flex-1 max-w-4xl">
					<div className="rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
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
									onChange={e => setEmail(e.target.value)}
									placeholder="Email Address"
									className="flex-1 p-2 border text-black border-gray-300 rounded-l-lg focus:outline-none"
								/>
								<button className="bg-purple-button text-white rounded-r-lg px-4 font-medium" onClick={handleSignUp}>
									Sign Up
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

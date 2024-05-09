import React from "react";

const App: React.FC = () => {
	return (
		<div className="flex flex-col min-h-screen min-w-screen bg-sidebar-background px-auto mx-auto justify-start items-center contents-center">
			<header className="absolute top-0 w-full bg-main-background text-white py-4 px-6 border-b border-b-gray-800 text-sm max-h-20">
				<div className="container mx-auto flex justify-between items-center">
					<div className="flex items-center space-x-3">
						<img src="/assets/app-logo.png" alt="Logo" className="w-6 h-6 inline-block" />
						<h1>CleverHug</h1>
					</div>
				</div>
			</header>
			<div className="text-white flex flex-row max-h-screen px-10 pt-28 px-auto mx-auto justify-center content-center">
				<img
					src="/assets/landing_banner.jpg"
					alt="Mindful Mail Logo"
					width={450}
					className="mx-10 mb-8 rounded-lg border-4 border-[#2c2a2e]"
				/>
				<div className="max-w-7xl w-full pr-32">
					<div className="rounded-lg shadow-lg">
						<div className="flex flex-col text-left align-left">
							<h1 className="font-manrope font-bold min-w-full text-6xl mb-6">Empower Your Day with Scheduled Messages</h1>
							<p className="text-lg mb-6">
								CleverHug helps you schedule reminders for tasks, or send uplifting messages and affirmations to your future
								self. It’s a tool designed to keep you motivated and organized, making it easier for you to manage your time
								and maintain a positive mindset.
							</p>
							<div className="flex min-w-[100%] max-w-md">
								<input
									type="email"
									placeholder="Email Address"
									className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
								/>
								<button className="bg-purple-button text-white rounded-r-lg px-4 font-medium">Sign Up</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;

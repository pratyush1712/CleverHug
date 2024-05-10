import React, { useState } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		const response = await fetch(`${SERVER_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password, remember })
		});
		const data = await response.json();
		if (data.error) {
			alert(data.error);
		} else {
			localStorage.removeItem("token");
			localStorage.setItem("token", data.token);
			window.location.href = "/";
		}
	};

	return (
		<div className="flex flex-col md:flex-row items-center justify-evenly min-h-[700px] md:min-h-screen bg-main-background">
			<header className="absolute top-0 w-full bg-main-background py-4 px-6 border-b border-b-gray-500 text-sm">
				<div className="container mx-auto flex justify-between items-center">
					<div className="flex items-center space-x-3 text-white">
						<img src="/assets/app-logo.png" alt="Logo" className="w-6 h-6 inline-block" />
						<h1>CleverHug</h1>
					</div>
				</div>
			</header>
			<div className="bg-sidebar mb-0 pt-12 px-12 pb-4 mx-2 md:mx-0 md:p-12 rounded-lg shadow-2xl mt-4 md:mt-0 md:w-1/2 text-white">
				<h1 className="text-xl md:text-3xl font-bold mb-4">CleverHug</h1>
				<p>CleverHug is a positive affirmation username scheduler. Sign in to access your account.</p>
			</div>
			<div className="bg-sidebar-selected p-4 md:p-8 md:mt-4 md:mr-8 rounded-lg shadow-2xl md:w-1/3 text-white text-sm">
				<p className="text-lg mb-4">Sign in to access your account.</p>
				<form onSubmit={handleLogin}>
					<div className="mb-4">
						<h5 className="text-white-500 pb-2">Username</h5>
						<input
							type="username"
							placeholder="Username"
							value={username}
							onChange={e => setUsername(e.target.value)}
							className="w-full p-3 border border-gray-300 rounded-lg text-black"
						/>
					</div>
					<div className="mb-4">
						<h5 className="text-white-500 pb-2">Password</h5>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							className="w-full p-3 border border-gray-300 rounded-lg text-black"
						/>
					</div>
					<div className="mb-4 flex items-center">
						<input
							type="checkbox"
							id="rememberMe"
							className="mr-2 bg-purple"
							checked={remember}
							onChange={e => setRemember(e.target.checked)}
						/>
						<label htmlFor="rememberMe">Remember me</label>
					</div>
					<button type="submit" className="w-full p-3 bg-purple-button text-white rounded-lg hover:bg-purple-600">
						Sign in
					</button>
					<div className="mt-4 text-center">
						<a href="/" className="text-purple-300 hover:underline">
							Forgot your password?
						</a>
					</div>
				</form>
			</div>
		</div>
	);
}

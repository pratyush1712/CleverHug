import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";

function AppBar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => setMenuOpen(!menuOpen);

	const data = useAuth();

	return (
		<header className="absolute top-0 w-full bg-main-background text-white py-4 px-6 border-b border-b-gray-800 text-sm max-h-20">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center space-x-3">
					<img src="/assets/app-logo.png" alt="Logo" className="w-6 h-6 inline-block" />
					<h1>CleverHug</h1>
				</div>

				<div className="hidden md:flex items-center">
					<span className="mr-10 cursor-pointer hover:text-gray-300">Home</span>
					<span className="mr-10 cursor-pointer hover:text-gray-300">Messages</span>
					<span className="mr-10 cursor-pointer hover:text-gray-300">Settings</span>
					<img src="/favicon.ico" alt={`${data.user?.full_name}`} className="w-6 h-6 rounded-full cursor-pointer" />
				</div>

				<button onClick={toggleMenu} className="md:hidden flex items-center cursor-pointer">
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d={!menuOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"}
						/>
					</svg>
				</button>
			</div>

			{menuOpen && (
				<nav className="md:hidden bg-[rgba(120,118,123,0.95)] pr-4 pl-4 py-4 rounded-md">
					<span className="block mb-3 cursor-pointer hover:text-gray-300 pb-2 pr-8 border-b border-gray-900">Home</span>
					<span className="block mb-3 cursor-pointer hover:text-gray-300 pb-2 pr-8 border-b border-gray-900">Messages</span>
					<span className="block mb-3 cursor-pointer hover:text-gray-300 pb-2 pr-8 border-b border-gray-900">Settings</span>
				</nav>
			)}
		</header>
	);
}

export default AppBar;

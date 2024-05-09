import React from "react";
import { useAuth } from "../../contexts/AuthProvider";

function Sidebar() {
	const path = window.location.pathname;
	const { user } = useAuth();
	return (
		<div className="min-w-64 max-w-60 min-h-full bg-sidebar-background absolute text-white py-5 pl-5 pr-3 space-y-4 pt-20 hidden md:block">
			<div className="relative min-w-full min-h-[80vh]">
				<div className="flex flex-row justify-start">
					<img src="https://pratyushsudhakar.com/favicon.png" alt="User Avatar" className="rounded-full w-10 h-10 mb-3" />
					<div className="ml-3 flex flex-col">
						<span className="font-semibold text-sm">{user?.full_name}</span>
						<span className="text-sm text-gray-400 text-xs">Premium User</span>
					</div>
				</div>
				<ul>
					{["Predefined Messages", "Custom Messages", "Message History", "Settings"].map(text => (
						<li key={text}>
							<a
								href="/"
								className={`hover:text-gray-400 block px-3 py-2 my-3 rounded-md
							${path === "/" && text === "Predefined Messages" ? "bg-sidebar-selected" : ""}
						text-sm`}
							>
								<img src={`/assets/${text.split(" ")[0].toLocaleLowerCase()}.png`} alt="Home" className="inline-block w-5 h-5 mr-2" />
								{text}
							</a>
						</li>
					))}
				</ul>
				<button
					className="bg-sidebar-selected absolute text-white min-w-full py-2 absolute bottom-[35.1%] rounded-md text-sm hover:bg-[#302d34]"
					onClick={() => {
						localStorage.removeItem("token");
						window.location.reload();
					}}
				>
					Logout
				</button>
			</div>
		</div>
	);
}

export default Sidebar;

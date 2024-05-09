import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout() {
	return (
		<div className="relative min-w-full min-h-screen text-white text-sm">
			<Sidebar />
			<AppBar />
			<Footer />
			<div className="pl-4 md:pl-72">
				<Outlet />
			</div>
		</div>
	);
}

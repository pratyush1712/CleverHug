import AppBar from "../components/Layout/AppBar";
import Footer from "../components/Layout/Footer";
import Sidebar from "../components/Layout/Sidebar";

export default function Home({ children }: { children: JSX.Element }) {
	return (
		<div className="relative min-w-full min-h-screen text-white text-sm">
			<Sidebar />
			<AppBar />
			<Footer />
			<div className="pl-4 md:pl-72 pt-20 m-auto z-0 w-full min-h-screen justify-center items-center">{children}</div>
		</div>
	);
}

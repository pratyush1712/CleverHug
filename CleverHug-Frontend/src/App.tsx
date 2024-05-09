import { useEffect, useRef, useState } from "react";
import { RouterProvider, createBrowserRouter, useRouteError } from "react-router-dom";
import Layout from "./components/Layout";
import Loading from "./components/UI/Loading";
import AuthContext from "./contexts/AuthProvider";
import AffirmationForm from "./pages/Affirmation";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { User } from "./types/user";
import { authenticatedUser } from "./utils/auth";

type Error = {
	data: string;
	error: { message: string; stack: string };
};

function ErrorBoundary() {
	const error = useRouteError() as Error;
	return (
		<div className="flex items-center justify-center h-screen">
			<h1 className="text-3xl mb-20 text-purple-button">{error.data as string} An error occurred.</h1>
		</div>
	);
}

const router = createBrowserRouter([
	{
		path: "/",
		Component: Landing
	},
	{
		errorElement: <ErrorBoundary />,
		element: <Layout />,
		children: [
			{
				path: "affirmations",
				Component: AffirmationForm
			}
		]
	},
	{
		path: "/login",
		Component: Login
	}
]);

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	const [user, setUser] = useState<User | null>(null);
	const mounted = useRef<boolean>(false);

	const authFailRedirect = async () => {
		if (window.location.pathname === "/login" || window.location.pathname === "/") return;
		window.location.href = "/login";
	};

	useEffect(() => {
		mounted.current = true;
		const authCheck = async () => {
			const authUser = await authenticatedUser();
			if (!authUser) {
				setLoading(false);
				authFailRedirect();
				return;
			}
			if (mounted.current) {
				setUser(authUser);
				setLoading(false);
			}
		};
		authCheck();
		return () => {
			mounted.current = false;
		};
	}, []);

	if (loading) return <Loading />;

	return (
		<div className="app min-h-screen bg-main-background">
			<AuthContext.Provider value={{ user, setUser, loading }}>
				<RouterProvider router={router} />
			</AuthContext.Provider>
		</div>
	);
}

export default App;

import React, { useState, useRef, useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AffirmationForm from "./pages/Affirmation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuthContext from "./contexts/AuthProvider";
import { authenticatedUser } from "./utils/auth";
import { User } from "./types/user";
import Loading from "./components/UI/Loading";

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
		id: "root",
		path: "/",
		errorElement: <ErrorBoundary />,
		element: (
			<Home>
				<AffirmationForm />
			</Home>
		),
		children: [
			{
				index: true,
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
		if (window.location.pathname === "/login") return;
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

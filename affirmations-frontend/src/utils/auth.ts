import { User } from "../types/user";

export const authenticatedUser = async (): Promise<User | null> => {
	const server_url = process.env.REACT_APP_SERVER_URL;
	try {
		const response = await fetch(`${server_url}/auth/check`, {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		});
		const data = await response.json();
		if (!response.ok || data?.error || !data?.authenticated) return null;
		return data.userDetails;
	} catch (error) {
		console.log(error);
		return null;
	}
};

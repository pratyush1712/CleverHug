import React, { createContext, useContext } from "react";
import { User } from "../types/user";

type AuthContextType = {
	user: User | null;
	setUser: (user: User | null) => void;
	loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => null,
	loading: true
});

export const useAuth = () => useContext(AuthContext);

export default AuthContext;

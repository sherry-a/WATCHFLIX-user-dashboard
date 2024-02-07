"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { IUser } from "@/utility/interfaces/user/user.d";
interface IUserContext {
  token: string;
  user: IUser | null;
  signIn: (user: IUser, token: string) => void;
  signOut: () => void;
  isAuthenticated: boolean;
}
export const UserContext = createContext<IUserContext | null>(null);
const authToken: string | null = localStorage.getItem("token");
export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string>(authToken ?? "");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(token)
  );
  const [user, setUser] = useState<IUser | null>(
    authToken ? JSON.parse(authToken) : null
  );
  const signIn = (user: IUser, token: string): void => {
    setIsAuthenticated(true);
    setUser(user);
    setToken(token);
    localStorage.setItem('token',JSON.stringify(token));
  };
  const signOut = (): void => {
    setIsAuthenticated(false);
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };
  const contextValues = useMemo(() => {
    return {
      user,
      token,
      signIn,
      signOut,
      isAuthenticated,
    };
  }, [user, token, isAuthenticated]);
  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("User Context Can Only Be Used Inside User Provider");
  }
  return userContext;
};

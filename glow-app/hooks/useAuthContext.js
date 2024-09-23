import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

//this is to access AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used within AuthContextProvider");
  }

  return context;
};

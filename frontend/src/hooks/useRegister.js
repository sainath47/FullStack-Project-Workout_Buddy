import { useState } from "react";
import { useAuthContext } from "./useAuthContext";



export const useRegister = () => {
  const {dispatch} =  useAuthContext()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const register = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else if (response.ok) {
      //save the toke to local storage \store in the local storage , eventhough you are gonna refresh the page the state is gonna reset but the localstorage will be having the credentials we are gonna set
      localStorage.setItem("user", JSON.stringify(json));
      //update the authcontext
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { register, isLoading, error };
};

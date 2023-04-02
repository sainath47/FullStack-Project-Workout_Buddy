import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [userInput, setUserInput] = useState({ email: "", password: "" });
const {login, error, isLoading} = useLogin()
  const handleSubmit = async(e) => {
    e.preventDefault();

await  login(userInput.email, userInput.password)
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    setUserInput((st) => {
      return {
        ...st,
        [name]: value,
      };
    });
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>Email:</label>
      <input
        type="text"
        name={"email"}
        value={userInput.email}
        onChange={handleChange}
      />
      <label>Password:</label>
      <input
        type="password"
        name={"password"}
        value={userInput.password}
        onChange={handleChange}
      />

      <button disabled={isLoading}>Log in</button>
    {error && <div className="error"> {error}</div>} 
    </form>
  );
};

export  {Login};

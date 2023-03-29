import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const [userInput, setUserInput] = useState({ email: "", password: "" });
const {register, error, isLoading} = useRegister()


  const handleSubmit = async (e) => {
    e.preventDefault();

console.log('userInput', userInput);
    await register(userInput.email, userInput.password)
    // console.log(userInput.email, userInput.password);
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
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Register</h3>
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

      <button disabled={isLoading}>Register</button>
      {error && <div className="error">
        {error}
        </div>}
    </form>
  );
};

export  {Register};

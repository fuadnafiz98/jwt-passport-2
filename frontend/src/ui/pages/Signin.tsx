import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const authContext = useContext(AuthContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(name, password);
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });
      const { data } = await response.json();
      authContext?.setAuthState(data);
    } catch (err) {
      console.log("error at signin");
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">SignIn</button>
    </form>
  );
};

export default SignIn;

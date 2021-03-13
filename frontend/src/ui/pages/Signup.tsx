import React, { useState } from "react";

const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("role");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(name, password, role);
    try {
      const data = await fetch("/api/auth/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password, role }),
      });
      const js = await data.json();
      console.log(js);
    } catch (err) {
      console.log("error at signup");
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="role">Role</label>
      <input
        type="text"
        name="role"
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button type="submit">SignUp</button>
    </form>
  );
};

export default SignIn;

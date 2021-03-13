import React, { useState } from "react";

const SignOut = () => {
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("hi");
    try {
      const data = await fetch("/api/auth/signout", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const js = await data.json();
      console.log(js);
    } catch (err) {
      console.log("error at signup");
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Signout</button>
      </form>
    </div>
  );
};

export default SignOut;

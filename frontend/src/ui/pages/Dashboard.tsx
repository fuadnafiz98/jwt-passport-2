//@ts-nocheck
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

function useInterval(callback, delay: number) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Dashboard = () => {
  const auth = useContext(AuthContext);

  const refreshToken = async () => {
    console.log("refresh token generating....");
    let response = await fetch("api/auth/token", {
      credentials: "include",
    });
    if (response.status === 401) {
      console.log("clearing");
      clearTimeout(refreshToken);
      return;
    }
    const { data } = await response.json();
    auth?.setAuthState(data);
    console.log("refreshed", data);
    setTimeout(refreshToken, 15000);
  };

  useInterval(() => refreshToken(), 15000);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("/api/vip", {
        credentials: "include",
      });
      if (response.status === 401) {
        //TODO: more work call /logout
        auth?.logout();
      }
      const json = await response.json();
      console.log(json);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h4>Dashboard</h4>
      <strong>{auth?.authState.userInfo?.name}</strong>
    </div>
  );
};

export default Dashboard;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { addNotification } from "./notificationSlice";

const useNotificationSocket = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  console.log("🛠️ Hook initialized. User state:", user);
  useEffect(() => {
    console.log("🛠️ useEffect triggered. User:", user ? "FOUND" : "NULL");
    if (!user) {
      console.log("🛑 Hook early exit: No user in Redux");
      return;
    }

    const role = user?.role || "user";
    console.log("🔍 Notification hook: User role is", role);
    const accessCookie = role === "admin" ? "admin_access_token" : role === "recruiter" ? "recruiter_access_token" : "user_access_token";
    const token = Cookies.get(accessCookie);
    console.log(`🔍 Notification hook: Looking for cookie ${accessCookie}, found token:`, token ? "EXISTS" : "MISSING");

    if (!token) {
      console.log(`🔍 Note: No access token found in JS cookies for ${role}. This is expected if HttpOnly is enabled. Proceeding to connect...`);
    }

    const wsUrl = `ws://localhost:8000/ws/notifications/` + (token ? `?token=${token}` : "");
    console.log(`📡 Attempting WebSocket connection to: ${wsUrl}`);

    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("🔔 Notification socket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📢 Notification received:", data);
      dispatch(addNotification(data));
    };

    socket.onerror = (error) => {
      console.error("Notification socket error:", error);
    };

    socket.onclose = (event) => {
      console.log("Notification socket closed:", event.code);
    };

    return () => {
      socket.close();
    };
  }, [user, dispatch]);
};

export default useNotificationSocket;
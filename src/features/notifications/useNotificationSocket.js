import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { addNotification } from "./notificationSlice";

const useNotificationSocket = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) return;

    const token = Cookies.get("access_token");

    if (!token) {
      console.log("No access token found. Notification socket not started.");
      return;
    }

    const socket = new WebSocket(
      `ws://127.0.0.1:8000/ws/notifications/?token=${token}`
    );

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
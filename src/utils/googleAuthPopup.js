import Cookies from "js-cookie";



export function openGooglePopup(url, width = 500, height = 600) {
  return new Promise((resolve, reject) => {
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      url,
      "GoogleAuthPopup",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    if (!popup) {
      return reject("Popup blocked");
    }

    console.log("🚀 OAuth popup opened");

    let messageReceived = false;

    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:8000"
    ];

    function messageHandler(event) {
      console.log("📩 MESSAGE RECEIVED:", event.data);

      if (!allowedOrigins.includes(event.origin)) {
        console.warn("❌ Ignoring unknown origin", event.origin);
        return;
      }

      if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
        messageReceived = true;

        window.removeEventListener("message", messageHandler);
        resolve(event.data.payload);

        setTimeout(() => popup.close(), 200);
      }

      if (event.data.type === "GOOGLE_AUTH_ERROR") {
        messageReceived = true;

        window.removeEventListener("message", messageHandler);
        reject(event.data.error);

        setTimeout(() => popup.close(), 200);
      }
    }

    window.addEventListener("message", messageHandler);

    // 🛑 FIXED: Do NOT reject immediately when popup closes
    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);

        if (!messageReceived) {
          console.warn("❌ Popup closed before any message was received");
          reject("Popup closed before login finished");
        }
      }
    }, 500);
  });
}

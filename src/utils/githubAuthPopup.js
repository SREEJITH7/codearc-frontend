export function openGitHubPopup(url, width = 500, height = 600) {
  return new Promise((resolve, reject) => {
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      url,
      "GitHubAuthPopup",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    if (!popup) return reject("Popup blocked");

    console.log("🐙 GitHub popup opened");

    let messageReceived = false;

    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:8000"
    ];

    function messageHandler(event) {
      console.log("📩 GitHub Message from popup:", event.data);

      if (!allowedOrigins.includes(event.origin)) {
        console.warn("❌ Unknown origin:", event.origin);
        return;
      }

      // SUCCESS
      if (event.data.type === "GITHUB_AUTH_SUCCESS") {
        messageReceived = true;
        window.removeEventListener("message", messageHandler);
        resolve(event.data.payload);
        setTimeout(() => popup.close(), 200);
      }

      // ERROR
      if (event.data.type === "GITHUB_AUTH_ERROR") {
        messageReceived = true;
        window.removeEventListener("message", messageHandler);
        reject(event.data.error);
        setTimeout(() => popup.close(), 200);
      }
    }

    window.addEventListener("message", messageHandler);

    // Detect popup close
    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);

        if (!messageReceived) {
          console.warn("❌ Popup closed before receiving GitHub message");
          reject("Popup closed before login finished");
        }
      }
    }, 400);
  });
}


const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const newIdBtn = document.getElementById("newIdBtn");

let autoScroll = true;
let userCode = localStorage.getItem("userCode");

/* Generate user code */

function generateUserCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";

    for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }

    return code;
}

/* Generate room code */
/* KEEP YOUR EXISTING generateRoomCode() HERE! */

/* Load or create user ID */

if (!userCode) {
    userCode = generateUserCode();
    localStorage.setItem("userCode", userCode);
}

/* Generate room */

const roomCode = generateRoomCode();


console.log("Room:", roomCode);

/* NEW ID button */

newIdBtn.addEventListener("click", () => {
    userCode = generateUserCode();

    localStorage.setItem("userCode", userCode);

    console.log("New user ID:", userCode);
});

/* Message creator */

function addMessage(text, user = roomCode) {
    const msg = document.createElement("div");

    msg.className = "msg";

    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    msg.innerHTML = `
    <span class="msg-time">[${time}]</span>
    <span class="msg-user">${user}</span>
    <span class="msg-text">${text}</span>
    `;

    messages.appendChild(msg);

    if (autoScroll) {
        messages.scrollTop = messages.scrollHeight;
    }
}

/* Detect if user has scrolled up */

messages.addEventListener("scroll", () => {
    const distance =
    messages.scrollHeight -
    messages.scrollTop -
    messages.clientHeight;

    autoScroll = distance < 50;
});

/* Send message */

function sendMessage() {
    const text = input.value.trim();

    if (!text) return;

    addMessage(text, userCode);

    input.value = "";
}

/* Send button */

sendButton.addEventListener("click", sendMessage);

/* Enter key */

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

/* Welcome messages */

addMessage("Welcome to Disco.", "SYSTEM");
addMessage(`Room code: ${roomCode}`, "SYSTEM");

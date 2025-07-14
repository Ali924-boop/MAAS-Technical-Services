import { useState, useEffect, useRef } from "react";

export default function CustomerChat() {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(true);

  const userEmail = "guest@example.com";
  const userProfileImage = `https://i.pravatar.cc/40?u=${userEmail}`;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    let cid = localStorage.getItem("conversationId");
    if (!cid) {
      cid = "guest_user_" + Date.now();
      localStorage.setItem("conversationId", cid);
    }
    setConversationId(cid);
  }, []);

  useEffect(() => {
    if (!conversationId) return;

    const loadMessages = async () => {
      try {
        const res = await fetch(`/api/getconversation?id=${conversationId}`);
        const data = await res.json();
        if (data?.conversation?.messages) {
          setMessages(data.conversation.messages);
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error("Error loading messages:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
    const interval = setInterval(loadMessages, 50000);
    return () => clearInterval(interval);
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || !conversationId) return;

    const newMsg = {
      sender: "user",
      name: "Guest User",
      email: userEmail,
      message: message.trim(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setMessage("");

    try {
      await fetch("/api/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          sender: "user",
          name: "Guest User",
          email: userEmail,
          message: newMsg.message,
        }),
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowChat((prev) => !prev)}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50"
        aria-label="Toggle customer chat"
      >
        💬
      </button>

      {showChat && (
        <div
          className="fixed bottom-20 right-4 w-[90vw] sm:w-96 bg-white shadow-xl rounded-xl p-4 z-50 flex flex-col max-h-[85vh]"
        >
          <div className="flex justify-between items-center  rounded bg-blue-600">
            <h2 className="text-white text-lg font-bold px-2">Customer Support</h2>
          </div>

          <div className="flex-grow overflow-y-auto p-2 mb-3 bg-gray-100 rounded flex flex-col gap-3 max-h-[60vh]">
            {loading ? (
              <p className="text-gray-500 text-sm">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="text-gray-500 text-sm">No messages yet. Start the conversation!</p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    } max-w-[85%]`}
                >
                  {msg.sender === "user" && (
                    <img
                      src={userProfileImage}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                      title="You"
                    />
                  )}
                  <div
                    className={`p-3 rounded-lg text-sm break-words ${msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-400 text-white"
                      }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              className="flex-grow p-2 border rounded"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

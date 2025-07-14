import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

export default function AdminChats() {
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        const decoded = jwt_decode(token);
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

        if (decoded.email !== adminEmail) {
          router.push("/admin/login");
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Token invalid", err);
        router.push("/admin/login");
      }
    };

    verifyToken();
  }, [router]);

  useEffect(() => {
    if (!loading) {
      const fetchChats = async () => {
        const res = await fetch("/api/getallconversations");
        const data = await res.json();
        if (data.success) setChats(data.conversations);
      };
      fetchChats();
    }
  }, [loading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected]);

  const handleReply = async () => {
    if (!reply.trim() || !selected) return;

    const res = await fetch("/api/conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId: selected.conversationId,
        sender: "admin",
        name: "Admin",
        email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        message: reply.trim(),
      }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      setSelected(data.conversation);
      setChats((prev) =>
        prev.map((chat) =>
          chat.conversationId === selected.conversationId ? data.conversation : chat
        )
      );
      setReply("");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-6 overflow-x-hidden">
      <h1 className="text-2xl font-bold">Admin Chat Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-auto md:h-[600px]">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded overflow-auto max-h-[300px] md:max-h-full">
          <h2 className="font-semibold mb-2">User Conversations</h2>
          {chats.length === 0 ? (
            <p>No conversations found.</p>
          ) : (
            <ul>
              {chats.map((chat) => (
                <li
                  key={chat._id}
                  className={`cursor-pointer border-b py-2 px-2 ${selected?.conversationId === chat.conversationId
                      ? "bg-blue-200 font-semibold"
                      : ""
                    }`}
                  onClick={() => setSelected(chat)}
                >
                  {chat.conversationId}
                  <br />
                  <small>
                    Last message:{" "}
                    {chat.messages.length
                      ? chat.messages[chat.messages.length - 1].message.substring(0, 30) + "..."
                      : "No messages yet"}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Message Panel */}
        <div className="w-full md:w-2/3 bg-gray-100 p-4 rounded flex flex-col">
          {selected ? (
            <>
              <h2 className="font-semibold mb-2">Conversation</h2>
              <div className="flex-grow overflow-y-auto bg-white p-2 rounded mb-2 max-h-[300px] md:max-h-[480px]">
                {selected.messages.map((m, i) => (
                  <div
                    key={i}
                    className={`mb-1 p-2 text-sm rounded ${m.sender === "admin" ? "bg-gray-300" : "bg-blue-200"
                      }`}
                  >
                    <strong>{m.sender}:</strong> {m.message}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // prevent form submission or unwanted new lines
                      handleReply();
                    }
                  }}
                  className="flex-grow p-2 border rounded"
                  placeholder="Type your reply"
                />

                <button
                  onClick={handleReply}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Reply
                </button>
              </div>
            </>
          ) : (
            <p>Select a conversation to view messages</p>
          )}
        </div>
      </div>
    </div>
  );
}

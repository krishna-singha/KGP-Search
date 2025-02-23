"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();
      
      const botMessage: Message = {
        text: data || "I'm not sure how to respond.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, something went wrong. Please try again later.", sender: "bot" },  // More user-friendly error message
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hscreenF flex flex-col items-center justify-center">
      <div className="my-8 w-full max-w-[1200px] flex justify-center">
        <div className="flex flex-col w-full h-[80vh] p-4 space-y-4 bg-white border rounded-lg shadow-lg">
          <h2 className="font-bold underline text-center">Chat Bot</h2>
          <div className="flex flex-col flex-1 space-y-4 overflow-y-auto p-2 ">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 max-w-[75%] ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white self-end rounded-tl-lg rounded-br-lg"
                    : "bg-gray-200 text-black self-start rounded-tr-lg rounded-bl-lg border"
                }`}
              >
                {message.text}
              </div>
            ))}
            {loading && (
              <div className="p-2 rounded-lg max-w-[75%] bg-gray-100 text-black self-start">
                Bot is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg"
              disabled={loading}
              aria-label="Chat input"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className={`p-2 rounded-lg transition ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              aria-label="Send message"
            >
              {loading ? "Loading..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
"use client";

import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaTimes } from "react-icons/fa";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const ChatBotBtn = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      const botMessage: Message = {
        text: data || "I'm not sure how to respond.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, something went wrong. Please try again later.",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110 focus:outline-none animate-pulse"
      >
        {open ? <FaTimes size={20} /> : <FaRobot size={24} />}
      </button>

      {/* Chat Box */}
      <div
        className={`fixed flex flex-col bottom-[5.5rem] right-6 z-40 shadow-xl border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
          open ? "w-1/3 h-[80vh] opacity-100" : "w-0 h-0 opacity-0"
        }`}
      >
        <div className="w-full flex items-center justify-between bg-blue-500 text-white py-3 px-5 rounded-t-xl shadow-lg">
          <div className="flex items-center gap-2">
            <FaRobot className="text-2xl" />
            <h2 className="text-lg font-semibold">ChatBot</h2>
          </div>
          <span className="text-sm opacity-80">Powered by Gemini</span>
        </div>

        {/* Chat Container */}
        <div className="w-full flex flex-col h-full bg-white shadow-xl border border-gray-300 rounded-b-xl overflow-hidden">
          {/* Chat Window (Only This Will Scroll) */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto space-y-4 p-4"
          >
            <div className="flex items-start gap-2">
              <FaRobot className="text-gray-600 text-lg" />
              <div className="p-3 max-w-[75%] bg-gray-200 text-gray-900 rounded-xl">
                👋 Hello! How can I assist you today?
              </div>
            </div>

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } items-center gap-2`}
              >
                {message.sender === "bot" && (
                  <FaRobot className="text-gray-600 text-lg" />
                )}
                <div
                  className={`p-3 max-w-[75%] rounded-xl ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {message.text}
                </div>
                {message.sender === "user" && (
                  <FaUser className="text-blue-500 text-lg" />
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-2">
                <FaRobot className="text-gray-600 text-lg" />
                <div className="p-3 max-w-[75%] bg-gray-300 text-gray-700 rounded-xl">
                  Bot is typing...
                </div>
              </div>
            )}
          </div>

          {/* Input Field */}
          <div className="flex items-center gap-2 mt-3 border border-gray-300 bg-gray-100 p-2 rounded-lg m-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
              placeholder="Type a message..."
              className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500"
              disabled={loading}
              aria-label="Chat input"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className={`p-2 rounded-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default ChatBotBtn;

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { FaPaperPlane, FaRobot, FaUser, FaTimes } from "react-icons/fa";

// interface Message {
//   text: string;
//   sender: "user" | "bot";
// }

// const ChatBotBtn = () => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatContainerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const userMessage: Message = { text: input, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch("/api/chatbot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(input),
//       });

//       const data = await response.json();

//       const botMessage: Message = {
//         text: data || "I'm not sure how to respond.",
//         sender: "bot",
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.log(error);

//       setMessages((prev) => [
//         ...prev,
//         {
//           text: "Sorry, something went wrong. Please try again later.",
//           sender: "bot",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Floating Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110 focus:outline-none animate-pulse"
//       >
//         {open ? <FaTimes size={20} /> : <FaRobot size={24} />}
//       </button>

//       {/* Chat Box (Expands from 0 to full screen) */}
// <div
//   className={`fixed inset-0 bg-white shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 ${
//     open ? "w-full h-full opacity-100" : "w-0 h-0 opacity-0"
//   }`}
// >
//         {/* Header */}
//         <div className="w-full flex items-center justify-between bg-blue-500 text-white py-3 px-5">
//           <div className="flex items-center gap-2">
//             <FaRobot className="text-2xl" />
//             <h2 className="text-lg font-semibold">ChatBot</h2>
//           </div>
//           <button
//             onClick={() => setOpen(false)}
//             className="text-white text-lg hover:opacity-80 transition"
//           >
//             <FaTimes />
//           </button>
//         </div>

//         {/* Chat Container */}
//         <div className="w-full flex flex-col h-full bg-gray-100">
//           {/* Chat Window */}
//           <div
//             ref={chatContainerRef}
//             className="flex-1 overflow-y-auto space-y-4 p-4"
//           >
//             <div className="flex items-start gap-2">
//               <FaRobot className="text-gray-600 text-lg" />
//               <div className="p-3 max-w-[75%] bg-gray-200 text-gray-900 rounded-xl">
//                 👋 Hello! How can I assist you today?
//               </div>
//             </div>

//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   message.sender === "user" ? "justify-end" : "justify-start"
//                 } items-center gap-2`}
//               >
//                 {message.sender === "bot" && (
//                   <FaRobot className="text-gray-600 text-lg" />
//                 )}
//                 <div
//                   className={`p-3 max-w-[75%] rounded-xl ${
//                     message.sender === "user"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-gray-900"
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//                 {message.sender === "user" && (
//                   <FaUser className="text-blue-500 text-lg" />
//                 )}
//               </div>
//             ))}

//             {loading && (
//               <div className="flex items-start gap-2">
//                 <FaRobot className="text-gray-600 text-lg" />
//                 <div className="p-3 max-w-[75%] bg-gray-300 text-gray-700 rounded-xl">
//                   Bot is typing...
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Input Field */}
//           <div className="flex items-center gap-2 mt-3 border border-gray-300 bg-gray-100 p-2 rounded-lg m-4">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
//               placeholder="Type a message..."
//               className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500"
//               disabled={loading}
//               aria-label="Chat input"
//             />
//             <button
//               onClick={sendMessage}
//               disabled={loading}
//               className={`p-2 rounded-lg transition ${
//                 loading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600 text-white"
//               }`}
//               aria-label="Send message"
//             >
//               <FaPaperPlane />
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChatBotBtn;

import React, { useRef } from "react";
import NavBar from "../NavBar/NavBar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Messages from "./Messages";
import {
  getUserProfile,
  getConversations,
  sendMessage,
} from "../../redux/Actions";
import Conversations from "./Conversations";
import { useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Cabecera from "./Cabecera";

export default function Chat() {
  const dispatch = useDispatch();

  const conversations = useSelector((state) => state.conversations);

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const socket = useRef(io("https://happytails2.herokuapp.com"));

  const [currentChat, setCurrentChat] = useState(null);

  const scrollRef = useRef();

  const id = localStorage.getItem("id");

  useEffect(() => {
    socket.current = io("https://happytails2.herokuapp.com");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", id);
  }, [id]);

  useEffect(() => {
    dispatch(getUserProfile(id));
    dispatch(getConversations(id));
  }, [dispatch, id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "https://happytails2.herokuapp.com/home/message/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      sender: id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members?.find((m) => m !== id);

    socket.current.emit("sendMessage", {
      senderId: id,
      receiverId,
      text: newMessage,
    });
    dispatch(sendMessage(message));
    setMessages([...messages, message]);
    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-h-screen">
      <NavBar />
      <div className="flex pt-14">
        <div className="w-32 lg:flex lg:justify-items-center flex-col items-center hidden"></div>

        <div className="w-72 mt-6 bg-yellow-500 mb-3 shadow-md shadow-slate-500 rounded-tl-md rounded-bl-md">
          <div className="text-xl text-white font-normal p-4">Chat</div>

          {/* <SearchUsers /> */}

          {conversations.length >= 5 ? (
            <div className="max-h-96 overflow-y-scroll">
              {conversations.map((u) => (
                <div className="flex-col m-3 items-center gap-3 bg-white shadow-sm rounded-md shadow-slate-600">
                  <span onClick={() => setCurrentChat(u)}>
                    <Conversations conversation={u} currentUser={id} />
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-h-96">
              {conversations.map((u) => (
                <div className="flex-col m-3 items-center gap-3 bg-white shadow-sm rounded-md shadow-slate-600">
                  <span onClick={() => setCurrentChat(u)}>
                    <Conversations conversation={u} currentUser={id} />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex mt-6 flex-col flex-grow bg-white mb-3">
          {/* cabecera */}
          {currentChat ? (
            <>
              <Cabecera el={currentChat.members.filter((d) => d !== id)} />
              <div className="w-full flex-grow bg-white shadow-sm shadow-slate-500 overflow-y-scroll">
                <div className="pr-1 h-96">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Messages
                        message={m}
                        own={m.sender === id}
                        mio={id}
                        el={m.sender !== id ? m.sender : false}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* text area */}
              <div className="flex w-full h-14 bg-white shadow-md shadow-slate-500 rounded-tr-md rounded-br-md">
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-100 rounded-tl-md rounded-bl-md py-3 ring-1 ring-yellow-800 focus:ring-1 focus:ring-yellow-800 focus:border-transparent shadow-md"
                />

                <button
                  type="button"
                  className="inline-flex rounded-tr-md rounded-br-md items-center justify-center ring-1 ring-yellow-800 focus:outline-none focus:ring-1 focus:ring-yellow-800 focus:border-transparent shadow-md px-4 py-3 transition duration-500 ease-in-out text-white bg-green-500 hover:bg-green-400"
                  onClick={handleSubmit}
                >
                  <span className="font-bold">Enviar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 ml-2 transform rotate-90"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <span className="flex p-6 justify-center items-center text-3xl text-gray-800 font-semibold">
              Seleccione un chat
            </span>
          )}
        </div>

        <div className="w-32 hidden lg:flex flex-col items-center"></div>
      </div>
    </div>
  );
}

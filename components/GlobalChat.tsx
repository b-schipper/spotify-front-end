"use client";
import {
  MessageRequest,
  MessageResponse,
  Profile,
} from "@/types/types";
import stomp from "stompjs";
import SockJS from "sockjs-client";
import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { axiosInstance } from "@/services/axios-service";
import { getUserProfile } from "@/services/user-service";
import { formatTimestamp } from "@/lib/date-converter";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";

const GlobalChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [sender, setSender] = useState<Profile | null>(null);

  const instance = axiosInstance();
  const { accessToken } = useAuth();

  const chatId = 1;

  const socket = new SockJS("http://localhost:8090/api/v1/ws", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  let stompClient = stomp.over(socket);

  useEffect(() => {
    socket.onopen = () => {
      console.log("Socket connected");
    };

    stompClient.connect({}, () => {
      stompClient.subscribe(`/queue/${chatId}`, (message) => {
        const messageData: MessageResponse = JSON.parse(message.body);
        setMessages((prevMessages) =>
          prevMessages ? [...prevMessages, messageData] : [messageData],
        );
      });
    });

    fetchSender();
    // fetchMessageHistory();

    return () => {
      stompClient.disconnect;
    };
  }, []);

  const fetchSender = async () => {
    try {
      const response = await getUserProfile(instance);
      setSender(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const fetchMessageHistory = async () => {
  //   try {
  //     const data = await getChannelMessagingHistory(instance, chatId);
  //     console.log(data);

  //     setMessages(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const sendMessage = () => {
    const messageRequest: MessageRequest = {
      chatId: chatId,
      senderId: sender?.id,
      content: message,
    };

    stompClient.send("/app/chat", {}, JSON.stringify(messageRequest));

    setMessage("");
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <ScrollArea className="max-h-full flex-grow overflow-y-auto">
      <div className="mb-12">
        {messages &&
          messages.map((msg) => (
            <div key={msg.id}>
              <div className="mb-2 flex flex-row items-center space-x-2 rounded-md p-1 duration-300 hover:bg-primary-500">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="pointer-events-none bg-gradient-to-br from-gray-500 to-secondary-100 text-xl capitalize">
                  { 
                    msg.likeBadge && <span data-testid="chat-avatar">🤍</span> ||
                    !msg.likeBadge && <span data-testid="chat-avatar">{msg.senderUsername.charAt(0)}</span>
                  }
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center space-x-2">
                    <h1 className="text-sm font-semibold text-black">
                      {msg.senderUsername}
                    </h1>
                    <h2 className="text-xs text-neutral-400 text-black">
                      {formatTimestamp(msg.createdAt)}
                    </h2>
                  </div>
                  <p className="font-light text-black-300">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-50 flex flex-row space-x-4">
        <input
          data-testid="send-message-input"
          placeholder="Message"
          className="flex-grow rounded-md bg-primary-500 p-2 outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          data-testid="send-message-button"
          className="rounded-md bg-secondary-100 px-4 text-black"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </ScrollArea>
  );
};

export default GlobalChat;

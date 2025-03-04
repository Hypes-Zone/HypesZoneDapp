import '../../assets/chat.scss'

import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { createChatRoom, getChatRooms } from "@/components/chatdapp/services/chatServices";
import { getJWT } from "@/components/authentications/services/authServices";


export function ChatUiApp() {
  const {publicKey} = useWallet();

  const [text, setText] = useState('');
  const [time, setTime] = useState(Date.now());
  const [roomId, setRoomId] = useState('');

  const [chatRooms, setChatRooms] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    EventListenerChatRoomsCreated();

    return () => {
      for (let key in chatRooms) {
        chatRooms[key].close();
      }
    }
  }, []);

  if (!publicKey) {
    return (
      <></>
    )
  }

  const openChat = (roomId: any) => {
    if (chatRooms[roomId]) {
      return;
    }

    const ws = new WebSocket(`wss://app.hypes.zone/ws/${roomId}/${publicKey}/${getJWT()}`);
    chatRooms[roomId] = ws;

    console.log("chatRooms", chatRooms);
    console.log("roomId", roomId);

    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.onmessage = (event) => {
      console.log('Message received:', event.data);

      // Get the room id from the event data
      let data = JSON.parse(event.data);
      let roomId = data.roomId;
      let message = data.message;
      let sender = data.sender;
      receiveChat(message, roomId, sender);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };

  }

  const EventListenerChatRoomsCreated = () => {
    getChatRooms(publicKey).then((result) => {
      let chat_rooms = result.chat_rooms;

      for (let i = 0; i < chat_rooms.length; i++) {
        console.log(chat_rooms[i]);
        let receiver = chat_rooms[i].public_key_user_receiver.toLowerCase() != publicKey.toString().toLowerCase() ? chat_rooms[i].public_key_user_receiver : chat_rooms[i].public_key_user_initiator;
        createNewChatRoom(chat_rooms[i].room_id, receiver);
      }

    }).catch((error) => {
      console.log("error: " + error);
      // alert("" + error + "");
    });
  }


  const setActive = (e: any) => {
    let current = document.getElementsByClassName("chat-box-active");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" chat-box-active", "");
    }

    let roomId = e.currentTarget.getAttribute("data-room-id");

    let chatBoxChats = document.getElementsByClassName("md:chat-box-chat");
    let chatBoxChatActiveIndex = 0;
    for (let i = 0; i < chatBoxChats.length; i++) {

      chatBoxChats[i].className = chatBoxChats[i].className.replace(" md:chat-box-chat-active", "");

      if (chatBoxChats[i].id === "chat-" + roomId) {
        chatBoxChatActiveIndex = i;
      }
    }

    chatBoxChats[chatBoxChatActiveIndex].className += " md:chat-box-chat-active";
    setRoomId(roomId);
    openChat(roomId);

    e.currentTarget.className += " chat-box-active";

  }

  const createNewChatRoom = (roomId: string, publicKey: any) => {
    let chatBoxID = "chat-" + roomId;

    // Return if chat already exists
    let chatBoxChatExists = document.getElementById(chatBoxID);
    if (chatBoxChatExists) {
      return;
    }

    // create li element
    let li = document.createElement("li");
    li.classList.add("chat-box-list-item");

    // create p element
    let p = document.createElement("p");
    p.textContent = publicKey;
    p.onclick = (e) => setActive(e);
    p.setAttribute("data-room-id", roomId);

    // append p to li
    li.appendChild(p);

    // append li to ul as first child in the list
    document.getElementById("chat-box-list-items")?.prepend(li);

    // Create the chat-box-chat
    let chatBoxChat = document.createElement("div");
    chatBoxChat.className = "md:col-span-2 md:chat-box md:chat-box-chat";

    chatBoxChat.id = chatBoxID;

    document.getElementById("chat-container")?.prepend(chatBoxChat);
  }

  const startNewChat = (e: any) => {
    const {value} = document.querySelector(e.target.getAttribute("data-input"));

    if (!value) {
      return;
    }

    createChatRoom(publicKey, value).then((result) => {
      document.querySelector(e.target.getAttribute("data-input")).value = '';

      if (!result.new_chat)
        return;

      createNewChatRoom(result.room_id, value);

    }).catch((error) => {
      console.log(error);
      document.querySelector(e.target.getAttribute("data-input")).value = '';
      alert("" + error + "");
    });
  }

  const sendChatEnter = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {  // enter key
      sendChat();
    }
  }

  const sendChat = () => {
    const value = text;
    setText('');

    if (!value || value === '' || value.length === 0 || value.trim() === '' || value.length > 1024) {
      return;
    }

    console.log(chatRooms)
    let ws = chatRooms[roomId];
    ws.send(value);
    //
    // let chatBoxChatActive = document.getElementsByClassName("md:chat-box-chat-active");
    // if (chatBoxChatActive.length === 0 || chatBoxChatActive.length > 1) {
    //   return;
    // }
    //
    // // create chat bubble
    // let chat = document.createElement("div");
    // chat.classList.add("chat");
    // chat.classList.add("chat-end");
    // chat.classList.add("fade-in-txt-1");
    //
    // // create chat bubble
    // let chatBubble = document.createElement("div");
    // chatBubble.classList.add("chat-bubble");
    // chatBubble.classList.add("chat-bubble-accent");
    // chatBubble.innerText = value;
    //
    // // append chat bubble to chat
    // chat.appendChild(chatBubble);
    //
    // // append chat to chat-box-chat
    // chatBoxChatActive[0].appendChild(chat);
    //
    // // scroll to bottom
    // chatBoxChatActive[0].scrollTop = chatBoxChatActive[0].scrollHeight;
  }

  const receiveChat = (value: any, roomId: any, sender: string) => {
    if (!value || value === '' || value.length === 0 || value.trim() === '' || value.length > 1024) {
      return;
    }

    let chatBoxRoomId = "chat-" + roomId;
    console.log("chatBoxRoomId", chatBoxRoomId);

    let chatBoxChat = document.getElementById(chatBoxRoomId);
    if (!chatBoxChat) {
      return;
    }

    console.log("1")
    // create chat bubble
    let chat = document.createElement("div");
    chat.classList.add("chat");
    if (sender !== publicKey.toString()) {
      chat.classList.add("chat-begin");
    } else {
      chat.classList.add("chat-end");
    }
    chat.classList.add("fade-in-txt-1");

    console.log("2")

    // create chat bubble
    let chatBubble = document.createElement("div");
    chatBubble.classList.add("chat-bubble");
    if (sender !== publicKey.toString()) {
      chatBubble.classList.add("chat-bubble-primary");
    } else {
      chatBubble.classList.add("chat-bubble-accent");
    }
    chatBubble.innerText = value;

    // append chat bubble to chat
    chat.appendChild(chatBubble);

    // append chat to chat-box-chat
    chatBoxChat.appendChild(chat);

    // scroll to bottom
    chatBoxChat.scrollTop = chatBoxChat.scrollHeight;
  }
  return (

    <div className="grid grid-flow-col grid-cols-3 md:grid-rows-1 gap-4 chat-box">

      <div className="md:col-span-1 chat-box-list md:chat-box">
        <div className="grid grid-rows-2">

          <div>
            <button className="btn btn-secondary text-white-50 btn-wide btn-center" data-input="#id-input"
                    data-items="#chat-box-list-items"
                    onClick={(e) => startNewChat(e)}>Start New Chat
            </button>
          </div>

          <div>
            <input id="id-input" type="text" className="input input-bordered start-new-chat-input"
                   placeholder="Enter Public Key"/>
          </div>
        </div>

        <div id="chat-box-scroll">
          <ul id="chat-box-list-items" className="menu menu-lg bg-base-200 rounded-box"></ul>
        </div>

      </div>

      <div id="chat-container" className="md:col-span-2 md:chat-container">

        <div className="chat-box-bottom">
          <div className="chat-box-input">
            <textarea id="send-input" value={text} className="input input-bordered chat-input" placeholder=". . ."
                      onChange={e => setText(e.target.value)} onKeyUp={sendChatEnter}></textarea>
          </div>

          <div className="chat-box-send">
            <button className="btn btn-secondary btn-wide btn-center" onClick={sendChat}>Send
            </button>
          </div>
        </div>

      </div>


    </div>
  )

}

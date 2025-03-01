import '../../assets/chat.scss'

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";


export function ChatUiApp() {
  const {publicKey} = useWallet();

  const [text, setText] = useState('');

  if (!publicKey) {
    return (
      <></>
    )
  }

  const setActive = (e: any) => {
    let current = document.getElementsByClassName("chat-box-active");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" chat-box-active", "");
    }

    let slugValue = e.currentTarget.textContent.replace(/\s+/g, '-').toLowerCase();

    let chatBoxChats = document.getElementsByClassName("md:chat-box-chat");
    for (let i = 0; i < chatBoxChats.length; i++) {
      if (chatBoxChats[i].id !== "chat-" + slugValue) {
        chatBoxChats[i].className = chatBoxChats[i].className.replace(" md:chat-box-chat-active", "");
      } else {
        chatBoxChats[i].className += " md:chat-box-chat-active";
      }
    }

    e.currentTarget.className += " chat-box-active";

  }

  const startNewChat = (e: any) => {
    const {value} = document.querySelector(e.target.getAttribute("data-input"));

    if (!value) {
      return;
    }

    document.querySelector(e.target.getAttribute("data-input")).value = '';

    // create li element
    let li = document.createElement("li");
    li.classList.add("chat-box-list-item");

    // create p element
    let p = document.createElement("p");
    p.textContent = value;
    p.onclick = (e) => setActive(e);

    // append p to li
    li.appendChild(p);

    // append li to ul as first child in the list
    document.querySelector(e.target.getAttribute("data-items")).prepend(li);
    //
    // let chat = ` <div className="md:col-span-2 md:chat-box md:chat-box-chat">
    //
    //   <div className="chat chat-start fade-in-txt-1">
    //     <div className="chat-bubble chat-bubble-primary">Remote</div>
    //   </div>
    //
    //   <div className="chat chat-end fade-in-txt-1">
    //     <div className="chat-bubble chat-bubble-accent">
    //       Local
    //     </div>
    //   </div>
    //
    // </div>`;

    // Create the chat-box-chat
    let chatBoxChat = document.createElement("div");
    chatBoxChat.className = "md:col-span-2 md:chat-box md:chat-box-chat";

    let slugValue = value.replace(/\s+/g, '-').toLowerCase();
    chatBoxChat.id = "chat-" + slugValue;

    document.getElementById("chat-container")?.prepend(chatBoxChat);
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

    let chatBoxChatActive = document.getElementsByClassName("md:chat-box-chat-active");
    if (chatBoxChatActive.length === 0 || chatBoxChatActive.length > 1) {
      return;
    }

    // create chat bubble
    let chat = document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add("chat-end");
    chat.classList.add("fade-in-txt-1");

    // create chat bubble
    let chatBubble = document.createElement("div");
    chatBubble.classList.add("chat-bubble");
    chatBubble.classList.add("chat-bubble-accent");
    chatBubble.innerText = value;

    // append chat bubble to chat
    chat.appendChild(chatBubble);

    // append chat to chat-box-chat
    chatBoxChatActive[0].appendChild(chat);

    // scroll to bottom
    chatBoxChatActive[0].scrollTop = chatBoxChatActive[0].scrollHeight;
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

import '../../assets/chat.scss'

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";


export function ChatUiApp() {
  const {publicKey} = useWallet();

  if (!publicKey) {
    return (
      <></>
    )
  }

  const setActive = (e: any) => {
    console.log('Setting active')
    let current = document.getElementsByClassName("chat-box-active");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" chat-box-active", "");
    }
    e.currentTarget.className += " chat-box-active";
  }

  const startNewChat = (e: any) => {
    console.log('Starting new chat')
    const {value} = document.querySelector(e.target.getAttribute("data-input"));
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
  }


  return (

    <div className="grid grid-flow-col grid-cols-3 md:grid-rows-1 gap-4 chat-box">

      <div className="md:col-span-1 chat-box-list md:chat-box">

        <div className="grid grid-rows-2">

          <div>
            <button className="btn btn-secondary text-white-50 btn-wide btn-center" data-input="#id-input" data-items="#chat-box-list-items"
                    onClick={(e) => startNewChat(e)}>Start New Chat
            </button>
          </div>

          <div>
            <input id="id-input" type="text" className="input input-bordered start-new-chat-input"
                   placeholder="Enter Public Key"/>
          </div>
        </div>

        <div id="chat-box-scroll">
          <ul id="chat-box-list-items" className="menu menu-lg bg-base-200 rounded-box">

          </ul>

        </div>


      </div>

      <div className="md:col-span-2 md:chat-box">

        <div className="chat chat-start fade-in-txt-2">
          <div className="chat-bubble chat-bubble-primary">What kind of nonsense is this</div>
        </div>

        <div className="chat chat-start fade-in-txt-4">
          <div className="chat-bubble chat-bubble-secondary">
            Put me on the Council and not make me a Master!??
          </div>
        </div>

        <div className="chat chat-start fade-in-txt-6">
          <div className="chat-bubble chat-bubble-accent">
            That&apos;s never been done in the history of the Jedi. It&apos;s insulting!
          </div>
        </div>

        <div className="chat chat-end fade-in-txt-8">
          <div className="chat-bubble chat-bubble-info">Calm down, Anakin.</div>
        </div>

        <div className="chat chat-end fade-in-txt-10">
          <div className="chat-bubble chat-bubble-success">You have been given a great honor.</div>
        </div>

        <div className="chat chat-end fade-in-txt-12">
          <div className="chat-bubble chat-bubble-warning">To be on the Council at your age.</div>
        </div>

        <div className="chat chat-end fade-in-txt-14">
          <div className="chat-bubble chat-bubble-error">It&apos;s never happened before.</div>
        </div>


      </div>
    </div>
  )

}

import '../../assets/chat.scss'

import React from "react";

export function ChatUiApp() {

  return (
    <div className="chat-box" style={{padding: '5%'}}>

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

  )

}

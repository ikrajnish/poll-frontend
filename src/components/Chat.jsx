import React from "react";
import chat from "../assets/Chat.png";

function Chat() {
  return (
      <div className="w-[60px] h-[60px] bg-[#5A66D1] rounded-full flex items-center justify-center cursor-pointer">
        <img src={chat} alt="Chat" className="w-[30px] h-[30px]" />
      </div>
  );
}

export default Chat;

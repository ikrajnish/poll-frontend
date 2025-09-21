import React, { useState, useEffect } from "react";
import AnswerPoll from "./AnswerPoll";
import socket from "../api/socket";
import Badge from "./Badge";
import Button from "./Button"; // Import your Button component

function StudentDashboard() {
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (joined) {
      socket.emit("student:join", { name }, (res) => {
        if (!res.ok) {
          alert(res.error);
          setJoined(false);
        }
      });
    }
  }, [joined]);

  if (!joined) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center bg-white px-4">
        {/* Badge / Label */}
        <Badge />

        {/* Heading */}
        <div className="mt-[26px] w-[762px]">
          <h1 className="text-[42px] font-[400] mb-[12px]">
            Let’s <span className="font-semibold">Get Started</span>
          </h1>
          <p className="text-[#5C5B5B] text-[19px] mb-10">
            If you’re a student, you’ll be able to{" "}
            <span className="font-semibold text-[#000000]">
              submit your answers
            </span>
            , participate in live polls, and see how your responses compare
            with your classmates
          </p>
        </div>

        {/* Name Input */}
        <div className="flex flex-col w-[507px] h-[95px] mt-[31px] gap-[12px] text-[18px]">
          <label className="mb-[12px] text-left">Enter your Name</label>
          <input
            className="rounded-[2px] bg-[#F2F2F2] text-[16px] font-semibold px-4 py-2 h-[60px]"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

        </div>
        <Button
            text="Continue"
            className="mt-[46px]"
            disabled={!name.trim()}
            onClick={() => setJoined(true)}
          />
      </div>
    );
  }

  return <AnswerPoll />;
}

export default StudentDashboard;

import React, { useState, useEffect } from "react";
import socket from "../api/socket";
import Badge from "./Badge";
import Button from "./Button";
import polygon from "../assets/polygon.png";
import PollResults from "./PollResults";
import PollHistory from "./PollHistory";
import eye from "../assets/Eye.png";
import Chat from "./Chat";

function TeacherDashboard() {
  const [options, setOptions] = useState(["", ""]);
  const [question, setQuestion] = useState("");
  const [time, setTime] = useState(60);
  const [open, setOpen] = useState(false);
  const [pollActive, setPollActive] = useState(false);
  const [poll, setPoll] = useState(null);
  const [pollNumber, setPollNumber] = useState(1);
  const [pollHistory, setPollHistory] = useState([]); // store all past polls
  const [showHistory, setShowHistory] = useState(false); // toggle view

  const addOption = () => setOptions([...options, ""]);
  const handleSelect = (value) => {
    setTime(value);
    setOpen(false);
  };
  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const createPoll = () => {
    if (!question.trim() || options.some((o) => !o.trim())) {
      alert("Please enter a question and all options.");
      return;
    }

    socket.emit(
      "teacher:createPoll",
      { question, options, duration: time },
      (res) => {
        if (res.ok) {
          setPoll(res.poll);
          setPollActive(true);
        } else {
          alert(res.error || "Error creating poll");
        }
      }
    );
  };

  useEffect(() => {
    socket.on("poll:update", (data) => setPoll(data));
    socket.on("poll:ended", (data) => {
      setPoll(data);

      // push ended poll into history
      setPollHistory((prev) => [...prev, data]);
    });
    return () => {
      socket.off("poll:update");
      socket.off("poll:ended");
    };
  }, []);

  // Active poll view
  if (pollActive && poll && !showHistory) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center relative">
        {/* Top-right: View Poll History button */}
        {/* Top-right: View Poll History button with Eye icon */}
        <div className="absolute top-[63px] right-[53px] w-[267px] h-[53px] flex items-center gap-[10px] bg-[#8F64E1] rounded-[34px] cursor-pointer mb-[207px] " onClick={() => setShowHistory(true)}>
            <img src={eye} alt="View Poll History" className="w-[30px] h-[30px] ml-[17px]" />
            <span className="text-white font-semibold text-[18px]">View Poll History</span>
        </div>


        {/* Center: Poll results */}
        <div className="flex justify-center w-full mt-[207px]">
          <PollResults poll={poll} role="teacher" questionNumber={pollNumber} />
        </div>

        {/* Ask New Question button */}
        <div className="flex justify-end w-full max-w-[720px] mt-[20px]">
          <Button
            
            text="+ Ask New Question"
            onClick={() => {
              setPollActive(false);
              setPoll(null);
              setQuestion("");
              setOptions(["", ""]);
              setTime(60);
              setPollNumber((prev) => prev + 1);
            }}
          />
        </div>
        <div className="fixed bottom-[50px] right-[32px] z-50">
            <Chat />
        </div>
      </div>
    );
  }

  // Poll history view
  if (showHistory) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center relative">
        <div
            className="absolute top-[63px] right-[53px] w-[267px] h-[53px] flex items-center justify-center bg-[#8F64E1] rounded-[34px] cursor-pointer mb-[207px] "
            onClick={() => setShowHistory(false)}
            >
            <span className="text-white font-semibold text-[18px]">Close Poll History</span>
        </div>

        <div className="w-full max-w-[720px] mt-[56px]">
          <PollHistory pollHistory={pollHistory} />
        </div>
        <div className="fixed bottom-[50px] right-[32px] z-50">
            <Chat />
        </div>
      </div>
    );
  }

  // Default dashboard (before poll starts)
  return (
    <div className="w-full ml-[123px] mt-[81px]">
      <div className="mb-[16px]">
        <Badge />
      </div>

      <div className="w-[737px]">
        <h1 className="text-[42px] font-[400] mb-2">
          Let’s <span className="font-semibold">Get Started</span>
        </h1>
        <p className="text-[#00000080] text-[19px] mb-10">
          You’ll have the ability to create and manage polls, ask questions, and
          monitor your students' responses in real-time.
        </p>
      </div>

      {/* Question input + Timer */}
      <div className="mb-6 mt-[34px] w-[865px]">
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold text-[20px]">Enter your question</label>
          <div className="relative">
            <div
              className="flex items-center gap-[10px] bg-[#F1F1F1] pl-[18px] pr-[18px] pt-[10px] pb-[10px] rounded-[7px] cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <span className="text-[18px] gap-[5px]">{time} seconds</span>
              <img
                src={polygon}
                alt="dropdown"
                className={`w-4 h-4 transition-transform duration-200 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {open && (
              <div className="absolute right-0 mt-1 w-full bg-white border rounded-md shadow-md z-10">
                {[30, 60, 90, 120].map((t) => (
                  <div
                    key={t}
                    onClick={() => handleSelect(t)}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {t} seconds
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full rounded-[2px] p-3 h-[174px] mt-[16px] focus:outline-none text-[18px] bg-[#F2F2F2] resize-none"
          placeholder="Type your question..."
          maxLength={100}
        />
        <div className="text-right mt-[-36px] mr-[15px] text-[15px]">
          {question.length}/100
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-6 mt-[34px]">
        <div>
          <h3 className="font-semibold text-[18px] mb-[12px] w-[507px]">Edit Options</h3>
          <div className="space-y-[12px]">
            {options.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-[#4E377B] to-[#8F64E1] text-white text-[11px]">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder="Enter option"
                  className="flex-1 rounded-[6px] bg-[#F2F2F2] px-4 py-3 text-[16px] font-semibold outline-none h-[60px]"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="mt-[25px] text-[14px] border border-[#7451B6] text-[#7451B6] px-5 py-2 rounded-[11px] cursor-pointer p-[10px]"
            >
              + Add More option
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[18px] mb-[37px]">Is it Correct?</h3>
          <div className="space-y-5">
            {options.map((_, idx) => (
              <div
                key={idx}
                className="flex items-center text-[17px] gap-[17px] mb-[50px]"
              >
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correct`}
                    className="w-4 h-4 accent-[#7451B6] cursor-pointer"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correct`}
                    className="w-4 h-4 accent-[#7451B6] cursor-pointer"
                  />
                  No
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[40.92px] border-t border-[#B6B6B6] w-[calc(100%+123px)] -ml-[123px]"></div>

      {/* Submit button */}
      <div className="flex justify-end mt-[20.08px] mr-[72.07px] mb-[14.42px]">
        <Button text="Ask Question" onClick={createPoll} />
      </div>
    </div>
  );
}

export default TeacherDashboard;

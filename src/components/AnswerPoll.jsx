import React, { useState, useEffect } from "react";
import socket from "../api/socket";
import Badge from "./Badge";
import PollResults from "./PollResults";
import Button from "./Button"; 
import timer from "../assets/Timer.png";
import Chat from "./Chat";

function AnswerPoll() {
  const [poll, setPoll] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);

  useEffect(() => {
    socket.on("poll:new", (data) => {
      setPoll(data);
      setAnswered(false);
      setSelected(null);
      setQuestionNumber((prev) => prev + 1);

      if (data.duration) {
        const secondsLeft = Math.floor(
          (new Date(data.expiresAt).getTime() - Date.now()) / 1000
        );
        setTimeLeft(secondsLeft > 0 ? secondsLeft : data.duration);
      }
    });

    socket.on("poll:update", (data) => setPoll(data));

    socket.on("poll:ended", (data) => {
      setPoll(data);
      setAnswered(true);
    });

    return () => {
      socket.off("poll:new");
      socket.off("poll:update");
      socket.off("poll:ended");
    };
  }, []);

  useEffect(() => {
    if (!timeLeft) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const submit = () => {
    if (selected === null) return;
    socket.emit(
      "student:submitAnswer",
      { pollId: poll.id, optionIndex: selected },
      (res) => {
        if (res.ok) setAnswered(true);
      }
    );
  };

  if (!poll)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Badge />
        <div className="w-[58px] h-[58px] border-4 border-t-transparent border-[#500ECE] rounded-full animate-spin mt-10" />
        <h1 className="text-[33px] font-semibold text-center mt-8">
          Wait for the teacher to ask questions..
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="rounded-[10px] bg-white p-6">
        {/* Show Question & Options if not answered */}
        {!answered ? (
          <>
            {/* Header */}
            <div className="flex items-center mb-[25px]">
              <h2 className="font-semibold text-[22px]">
                Question {questionNumber}
              </h2>
              {timeLeft > 0 && (
                <div className="flex items-center gap-2 ml-[35px]">
                  <img src={timer} alt="Timer" className="w-[18px] h-[18px]" />
                  <span className="text-red-500 font-semibold text-[16px]">
                    {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                    {String(timeLeft % 60).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>

            {/* Question */}
            <div className="rounded-t-[10px] overflow-hidden border border-[#AF8FF1]">
              <div className="bg-gradient-to-r from-[#343434] to-[#6E6E6E] text-white font-semibold text-[17px] px-4 py-3 mb-[18px] h-[50px] flex items-center">
                {poll.question}
              </div>

              {/* Options */}
              <div className="space-y-3 p-4 bg-white">
                {poll.options.map((opt, i) => (
                  <label
                    key={i}
                    className={`flex items-center h-[55px] w-[678px] gap-3 rounded-[6px] px-4 py-3 border cursor-pointer text-[16px] ${
                      selected === i
                        ? "border-[#8F64E1] bg-white"
                        : "border-[#8D8D8D30] bg-[#F2F2F2]"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-[24px] h-[24px] rounded-full text-white text-[13px] p-[10px] font-medium ${
                        selected === i
                          ? "bg-gradient-to-r from-[#8F64E1] to-[#4E377B]"
                          : "bg-[#6E6E6E]"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <input
                      type="radio"
                      name="answer"
                      value={i}
                      checked={selected === i}
                      onChange={() => setSelected(i)}
                      className="hidden"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <Button
                text="Submit"
                onClick={submit}
                disabled={selected === null}
                className="w-[233px] h-[58px]"
              />
            </div>
            <div className="fixed bottom-[50px] right-[32px] z-50">
                <Chat />
            </div>
          </>
        ) : (
          <>
            <PollResults poll={poll} questionNumber={questionNumber} />
            <p className="mt-[44px] text-center font-semibold text-[24px]">
              Wait for the teacher to ask a new question..
            </p>
            <div className="fixed bottom-[50px] right-[32px] z-50">
            <Chat />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AnswerPoll;

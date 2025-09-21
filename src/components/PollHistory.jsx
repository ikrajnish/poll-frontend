import React from "react";
import PollResults from "./PollResults";

function PollHistory({ pollHistory }) {
  if (!pollHistory || pollHistory.length === 0) {
    return (
      <div className=" bg-white p-6 mb-[45px]">
        <h2 className="text-[40px] mb-4">View<span className="font-semibold"> Poll History</span></h2>
        <p className="text-gray-500">No previous polls available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mb-[56px]">
      {pollHistory.map((poll, idx) => (
        <PollResults
          key={idx}
          poll={poll}
          questionNumber={idx + 1} // Show Q1, Q2, etc.
        />
      ))}
    </div>
  );
}

export default PollHistory;

import React from "react";

function PollResults({ poll, questionNumber }) {
  if (!poll) return null;

  // Calculate counts
  const counts =
    poll.counts ||
    poll.options.map((_, i) =>
      poll.responses
        ? Object.values(poll.responses).filter((v) => v === i).length
        : 0
    );

  const totalVotes = counts.reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-[10px] bg-white p-6">
      {/* Header */}
      <div className="flex items-center mb-[25px]">
        <h2 className="font-semibold text-[22px]">
          Question {questionNumber}
        </h2>
      </div>

      {/* Question */}
      <div className="rounded-t-[10px] overflow-hidden border border-[#AF8FF1]">
        <div className="bg-gradient-to-r from-[#343434] to-[#6E6E6E] text-white font-semibold text-[17px] px-4 py-3 mb-[18px] h-[50px] flex items-center">
          {poll.question}
        </div>

        {/* Options with progress bars */}
        <div className="space-y-3 p-4 bg-white">
          {poll.options.map((opt, i) => {
            const count = counts[i] || 0;
            const percentage = totalVotes
              ? Math.round((count / totalVotes) * 100)
              : 0;

            return (
              <div
                key={i}
                className="relative flex items-center h-[55px] w-[678px] gap-3 rounded-[6px] px-4 py-3 border border-[#8F64E1] bg-[#F2F2F2] overflow-hidden"
              >
                {/* Progress Bar */}
                <div
                  className="absolute top-0 left-0 h-full bg-[#8F64E1] transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>

                {/* Option number circle */}
                <span className="relative z-10 flex items-center justify-center w-[24px] h-[24px] rounded-full bg-white text-[#8F64E1] text-[13px] font-medium">
                  {i + 1}
                </span>

                {/* Text container */}
                <div className="relative flex justify-between items-center w-full z-10">
                  {/* Normal (black) text */}
                  <span className="text-[16px] font-medium relative">
                    {opt}
                    {/* White overlay text clipped to progress bar width */}
                    <span
                      className="absolute top-0 left-0 h-full text-white overflow-hidden"
                      style={{ width: `${percentage}%` }}
                    >
                      {opt}
                    </span>
                  </span>

                  {/* Percentage text */}
                  <span className="text-[15px] font-semibold text-black relative">
                    {percentage}%
                    {/* White overlay percentage clipped to progress bar width */}
                    <span
                      className="absolute top-0 left-0 h-full text-white overflow-hidden"
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage}%
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PollResults;

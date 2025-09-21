import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Badge from "../components/Badge";
import RoleCard from "../components/RoleCard";

function HomePage() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const continueHandler = () => {
    if (role === "student") navigate("/student");
    else if (role === "teacher") navigate("/teacher");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <Badge />
      <div className="mt-[26px] mx-auto">
        <h1 className="text-[40px] font-[400] mb-[5px] text-center">
          Welcome to the{" "}
          <span className="font-semibold text-[40px]">
            Live Polling System
          </span>
        </h1>

        <p className="font-[400] text-[19px] text-[#00000080] text-center">
          Please select the role that best describes you to begin using the live
          polling <br />
          system
        </p>
      </div>

      {/* Role Selection Cards */}
      <div className="flex flex-col sm:flex-row gap-[32px] mb-8 mt-[50px]">
        <RoleCard
          title="I’m a Student"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
          isActive={role === "student"}
          onClick={() => setRole("student")}
        />
        <RoleCard
          title="I’m a Teacher"
          description="Submit answers and view live poll results in real-time."
          isActive={role === "teacher"}
          onClick={() => setRole("teacher")}
        />
      </div>

      {/* Gradient Button */}
      <Button text="Continue" onClick={continueHandler} disabled={!role} />
    </div>
  );
}

export default HomePage;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";
import HomePage from "./pages/HomePage";
import AnswerPoll from "./components/AnswerPoll";
import Chat from "./components/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="*" element={<div className="p-10 text-xl">404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

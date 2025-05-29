import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import ExamsBro from "../../assets/Exams-bro.svg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-overlay">
        <h1>Welcome to <span className="highlight">LUMA</span></h1>
        <p className="subtitle">
          Learn Understand Master Achieve 
        </p>
        <img
          src={ExamsBro}
          alt="Get Started"
          className="svg-btn"
          onClick={() => navigate("/courses")}
        />
        <p className="get-started-label">Click to Get Started</p>
      </div>
    </div>
  );
};

export default Home;

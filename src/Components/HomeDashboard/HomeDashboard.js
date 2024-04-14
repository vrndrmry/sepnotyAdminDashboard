import React, { useState } from "react";
import "./homeDashboard.css";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import dashboard from "../../assets/dashboard.svg";
import imageError from '../../assets/imageError.svg'
import { Link } from "react-router-dom";
export default function HomeDashboard() {
  const [isClicked,setIsClicked]= useState(false)
  const labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Manhour per day",
        backgroundColor: "rgb(42, 126, 183)",
        borderColor: "rgb(42, 126, 183)",
        data: [0, 10, 5, 10, 20, 30, 45],
        lineTension: 0.4,
        pointRadius: 8,
      },
    ],
  };




  return (
    <div className="homeDashboard">
      <div className="adminCards">
        <div className="card">
          <div className="cardContent">
            <p>10</p>
            <p>Responses Received</p>
          </div>
          <Link to="/:userID/response">
            <div className="icons">
              <i className="bi bi-list-check"></i>
            </div>
          </Link>
        </div>
        <div className="card card2">
          <div className="cardContent">
            <p>100</p>
            <p>Blog post created</p>
          </div>
          <div className="icons">
            <i className="bi bi-book"></i>
          </div>
        </div>
        <div className="card card3">
          <div className="cardContent">
            <p>10</p>
            <p>Articles created</p>
          </div>
          <div className="icons">
            <i className="bi bi-newspaper"></i>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="charts">
          <Line data={data} />
        </div>
        <div>
          <img
            src={dashboard}
            alt="dashboard"
            onError={(e) => {
              e.target.src = imageError;
            }}
          />
        </div>
      </div>
    </div>
  );
}


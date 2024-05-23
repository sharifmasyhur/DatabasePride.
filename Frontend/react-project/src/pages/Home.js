import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/QuickCanteen.jpeg";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> QuickCanteen </h1>
        <p> Order Anywhere With Ease. </p>
        <Link to="/menu">
          <button> ORDER NOW </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
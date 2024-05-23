import React from "react";
import MultiplePizzas from "../assets/multiplePizzas.jpeg";
import "../styles/About.css";
function About() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${MultiplePizzas})` }}
      ></div>
      <div className="aboutBottom">
        <h1> ABOUT US</h1>
        <p>
        QuickCanteen is dedicated to enhancing the campus dining experience for students. 
        Our user-friendly online platform enables students to conveniently order their favorite meals from the campus canteen, eliminating the need to wait in long queues. 
        This saves students valuable time, allowing them to make the most of their breaks and transition between classes seamlessly.
        </p>
      </div>
    </div>
  );
}

export default About;
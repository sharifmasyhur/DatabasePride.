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
        <h1> ABOUT US </h1>
        <p>
        Proyek manajemen database ini bertujuan untuk menghilangkan antrian panjang, 
        menghemat waktu mahasiswa antar kelas atau saat istirahat. 
        mengembangkan situs web kantin kampus yang ramah pengguna yang 
        memungkinkan mahasiswa memesan makanan secara online dimanapun dan mengambilnya dengan nyaman tanpa perlu mengantri lama-lama.
        </p>
      </div>
    </div>
  );
}

export default About;

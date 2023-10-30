import React from "react";
import Navbar from "./NavBar/NavBar";
import "./Css/Home.css";

function HomePage() {
  return (
    <div>
      <Navbar />
      <h1 className="home">Bienvenue sur CotiCota !</h1>
      <p>Voici notre application de gestion des clubs et des membres.</p>

      <div className="feature">
        <h2>Gestion des Clubs</h2>
        <p>Créez, modifiez et supprimez des clubs en toute simplicité.</p>
      </div>

      <div className="feature">
        <h2>Gestion des Membres</h2>
        <p>
          Ajoutez et gérez les membres de vos clubs, mettez à jour leurs
          informations.
        </p>
      </div>

      <div className="feature">
        <h2>Convivialité</h2>
        <p>
          Une interface conviviale et intuitive pour une expérience utilisateur
          agréable.
        </p>
      </div>
    </div>
  );
}

export default HomePage;

import React from 'react';
import { Fade, Slide } from 'react-reveal';
import Navbar from './NavBar/NavBar';
import Footer from './Footer';
import './Css/Home.css';

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <Fade top>
          <h1 className="home">Bienvenue sur CotiCota !</h1>
        </Fade>


        <div className="features">
          <Slide left>
            <div className="feature">
              <h2>Gestion des Clubs</h2>
              <p>Créez, modifiez et supprimez des clubs en toute simplicité.</p>
            </div>
          </Slide>

          <Slide right>
            <div className="feature">
              <h2>Gestion des Membres</h2>
              <p>Ajoutez et gérez les membres de vos clubs, mettez à jour leurs informations.</p>
            </div>
          </Slide>

          <Slide left>
            <div className="feature">
              <h2>Convivialité</h2>
              <p>Une interface conviviale et intuitive pour une expérience utilisateur agréable.</p>
            </div>
          </Slide>

          <Slide left>
            <div className="feature">
              <h2>....</h2>
              <p>lorem ipsum dolor</p>
            </div>
          </Slide>
        </div>
      </div>
      <Fade bottom>
        <Footer/>   
      </Fade>
    </div>
  );
}

export default HomePage;

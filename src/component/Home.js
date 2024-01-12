import React from 'react';
import { Fade, Slide } from 'react-reveal';
import Navbar from './NavBar/NavBar';
import Footer from './Footer';
import './Css/Home.css';
import { useAuthValue } from './AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../Login/firebase';

function HomePage() {
  const { currentUser } = useAuthValue();
  const displayName = currentUser?.displayName || ''; // Récupère le nom complet de l'utilisateur

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <Fade top>
          <h1 className="home">Bienvenue sur CotiCota {displayName} !</h1>
        </Fade>

        <div className='center'>
          <div className='profile'>
            <h1>Profile</h1>
            <div className='profile-info'>
              
              {/* Affichage de l'email */}
              <div className='profile-item'>
                <strong>Email:</strong> {currentUser?.email}
              </div>

              {/* Ajout des champs nom et prénom */}
              <div className='profile-item'>
                <strong>Nom:</strong> {displayName}
              </div>

             
            </div>

            {/* Bouton de déconnexion */}
            <button className='sign-out-btn' onClick={() => signOut(auth)}>
              Sign Out
            </button>
          </div>
        </div>

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

          <Slide right>
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

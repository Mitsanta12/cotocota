import React from 'react';
import { Fade, Slide } from 'react-reveal';
import Navbar from '../component/NavBar/NavBar';
import Footer from '../component/Footer';
import { useAuthValue } from '../component/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../Login/firebase';
import 'tailwindcss/tailwind.css'; 

function UserHome() {
  const { currentUser } = useAuthValue();
  const displayName = currentUser?.displayName || ''; // Récupère le nom complet de l'utilisateur

  return (
    <div>
      <Navbar />
      <div className="home-container mx-auto p-8">
        <Fade top>
          <h1 className="text-4xl font-bold mb-8 text-indigo-700">Bienvenue sur CotiCota {displayName} !</h1>
        </Fade>

        <div className='flex justify-center items-center'>
          <div className='bg-white p-8 rounded-md shadow-md'>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Profil</h1>
            <div className='space-y-4 text-gray-700'>

              {/* Affichage de l'email */}
              <div className=''>
                <strong>Email:</strong> {currentUser?.email}
              </div>

              {/* Ajout des champs nom et prénom */}
              <div className=''>
                <strong>Nom:</strong> {displayName}
              </div>

            </div>

            {/* Bouton de déconnexion */}
            <button className='bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600' onClick={() => signOut(auth)}>
              Se déconnecter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
          <Slide left>
            <div className="feature bg-white p-8 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4 text-indigo-700">Gestion des Clubs</h2>
              <p className="text-gray-700">Créez, modifiez et supprimez des clubs en toute simplicité.</p>
            </div>
          </Slide>

          <Slide right>
            <div className="feature bg-white p-8 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4 text-indigo-700">Gestion des Membres</h2>
              <p className="text-gray-700">Ajoutez et gérez les membres de vos clubs, mettez à jour leurs informations.</p>
            </div>
          </Slide>

          <Slide left>
            <div className="feature bg-white p-8 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4 text-indigo-700">Convivialité</h2>
              <p className="text-gray-700">Une interface conviviale et intuitive pour une expérience utilisateur agréable.</p>
            </div>
          </Slide>

          <Slide right>
            <div className="feature bg-white p-8 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4 text-indigo-700">....</h2>
              <p className="text-gray-700">Lorem ipsum dolor</p>
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

export default UserHome;

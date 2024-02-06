import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/Clubs.css";
import Navbar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import Loader from "../Loader";

function UserClubList() {
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fait un appel à l'API pour obtenir la liste des clubs
    axios
      .get(`http://localhost:5000/clubs`)
      .then((response) => {
        // Vérifie les données de l'API dans la console
        console.log(response.data);
        setClubs(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des clubs:", error);
      })
      .finally(() => {
        // Arrête le chargement après que les données ont été récupérées
        setIsLoading(false);
      });
  }, []);

  //setTimeout pour afficher "Aucun club trouvé" après 20 secondes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (clubs.length === 0 && isLoading) {
        setIsLoading(false);
      }
    }, 20000); 

    return () => clearTimeout(timeoutId);
  }, [clubs, isLoading]);



  return (
    <div>
      <Navbar />
      {isLoading && <Loader />}
      {!isLoading && clubs.length === 0 && (
        <div className="no-clubs-message">
          <p className="center-text">AUCUN CLUB TROUVÉ</p>
        </div>
      )}
      {!isLoading && clubs.length > 0 && (
        <div className="list_club">
          <h1>Liste des clubs</h1>
          <ul>
            {clubs.map((club) => (
              <li key={club.club_id}>
                <p className="Description">{club.club_id}</p>
                <button className="ClubDetails"><Link to={`/clubs/${club.club_id}`}>{club.nom}</Link></button>
              </li>
            ))}
          </ul>
          <Link to="/create-club">
            <button className="create_button">Créer un nouveau club</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserClubList;

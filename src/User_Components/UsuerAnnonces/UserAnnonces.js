import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/Annonces.css";
import Navbar from "../NavBar/NavBar";
import Loader from "../Loader";

function UserAnnonces() {
  const [annonces, setAnnonces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fait un appel à l'API pour obtenir la liste des annonces
    axios
      .get(`http://localhost:5000/annonces`)
      .then((response) => {
        setAnnonces(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des annonces:", error);
      })
      .finally(() => {
        // Arrête le chargement après que les données ont été récupérées
        setIsLoading(false);
      });
  }, []);

  // Utilise setTimeout pour afficher "Aucune annonce trouvée" après 20 secondes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (annonces.length === 0 && isLoading) {
        setIsLoading(false);
      }
    }, 20000); // 20000 millisecondes (20 secondes)

    return () => clearTimeout(timeoutId);
  }, [annonces, isLoading]);

  return (
    <div>
      <Navbar />
      {isLoading && <Loader />}
      {!isLoading && annonces.length === 0 && (
        <div className="no-annonces-message">
          <p className="center-text">AUCUNE ANNONCE TROUVÉE</p>
        </div>
      )}
      {!isLoading && annonces.length > 0 && (
        <div className="annonces_list">
          <h1>Liste des annonces</h1>
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Club ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {annonces.map((annonce) => (
                <tr key={annonce.annonce_id}>
                  <td>{annonce.titre}</td>
                  <td>{annonce.contenu}</td>
                  <td>{annonce.club_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserAnnonces;

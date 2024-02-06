import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../NavBar/NavBar";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import "../Css/ClubDetails.css";

function UserClubDetails() {
  const { club_id } = useParams();
  const [club, setClub] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fait un appel à l'API pour obtenir les détails du club
    axios
      .get(`http://localhost:5000/clubs/${club_id}`)
      .then((response) => {
        setClub(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails du club:",
          error
        );
        setIsLoading(false);
      });

    // Fait un appel à l'API pour obtenir les membres du club
    axios
      .get(`http://localhost:5000/members/clubs/${club_id}`)
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des membres du club:",
          error
        );
      });
  }, [club_id]);

  const handleCancel = () => {
    // Redirige vers la page des clubs en cas d'annulation
    navigate("/clubs");
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <Loader />
      </div>
    );
  }



  return (
    <div>
      <Navbar />
      <div className="club_details">
        <h1 className="detail">Détails sur le club</h1>
        <div className="card">
          <p>ID du club: {club.club_id}</p>
          <p>Nom du club: {club.nom}</p>
          <p>Description du club: {club.description}</p>
          <p>Responsable: {club.responsable_name}</p>
        </div>

        <h2>A propos du club</h2>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Numéro de téléphone</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.member_id}>
                <td>{member.nom}</td>
                <td>{member.prenom}</td>
                <td>{member.email}</td>
                <td>{member.numero_telephone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-container">
          <Link to={`/members/${club.club_id}`}>
            <button>Voir tous les membres</button>
          </Link>
          <button type="button">Cotisations</button>
          <button type="button">Evenements</button>
        </div>
      </div>
      <button type="button" onClick={handleCancel}>
        Retourner à le liste des clubs
      </button>
    </div>
  );
}

export default UserClubDetails;

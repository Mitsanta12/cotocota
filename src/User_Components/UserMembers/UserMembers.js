import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../NavBar/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import "../Css/ClubDetails.css";

function Members() {
  const { club_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fait un appel à l'API pour obtenir les membres du club
    axios
      .get(`http://localhost:5000/members/clubs/${club_id}`)
      .then((response) => {
        setMembers(response.data);
        setIsLoading(false); // Met fin au chargement une fois les membres obtenus
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des membres du club:",
          error
        );
        setIsLoading(false); // Met fin au chargement en cas d'erreur
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
        <h2>Membres du club</h2>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Numéro de téléphone</th>
              <th>Action</th>
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
      
        <button type="button" onClick={handleCancel}>
          Retourner aux listes des clubs
        </button>
      </div>
    </div>
  );
}

export default Members;

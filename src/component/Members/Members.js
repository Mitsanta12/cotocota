import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  const handleEditMember = (memberId) => {
    // Redirige vers la page de modification du membre avec l'ID du membre
    navigate(`/members/${club_id}/edit_member/${memberId}`);
  };

  const handleDeleteMember = async (memberId) => {
    try {
      // Fait une requête DELETE pour supprimer le membre
      await axios.delete(`http://localhost:5000/members/${memberId}`);
      // Actualise la liste des membres après la suppression
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.member_id !== memberId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression du membre:", error);
    }
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
                <td>
                  <button type="button" onClick={() => handleEditMember(member.member_id)}>
                    Modifier
                  </button>
                  <button type="button" onClick={() => handleDeleteMember(member.member_id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={`/clubs/${club_id}/create_member`}>
          <button type="button">Ajouter un nouveau membre</button>
        </Link>
        <button type="button" onClick={handleCancel}>
          Retourner aux listes des clubs
        </button>
      </div>
    </div>
  );
}

export default Members;

// EditMember.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../NavBar/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import "../Css/CreateMember.css";

function EditMember() {
  const { club_id, member_id } = useParams();
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [numeroTelephone, setNumeroTelephone] = useState("");
  // Ajoute une variable d'état pour le Club ID
  const [clubId, setClubId] = useState("");

  useEffect(() => {
    // Fait un appel à l'API pour obtenir les détails du membre à modifier
    axios
      .get(`http://localhost:5000/members/${member_id}`)
      .then((response) => {
        const memberData = response.data;
        setNom(memberData.nom);
        setPrenom(memberData.prenom);
        setEmail(memberData.email);
        setNumeroTelephone(memberData.numero_telephone);
        // Définie la valeur du Club ID à partir des données du membre
        setClubId(memberData.club_id);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des détails du membre:", error);
      });
  }, [member_id]);

  const handleUpdateMember = async () => {
    try {
      // Fait une requête PUT pour mettre à jour les informations du membre
      await axios.put(`http://localhost:5000/members/${member_id}`, {
        nom,
        prenom,
        email,
        numero_telephone: numeroTelephone,
        // Assure de conserver le Club ID inchangé dans la requête PUT
        club_id: clubId,
      });
      // Redirige vers la page des membres du club après la modification
      navigate(`/members/${club_id}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du membre:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/members/${club_id}`); // Redirige vers la page des membres du club
  };

  return (
    <div>
      <Navbar />
      <div className="create_member">
        <h1>Modifier un membre</h1>
        <form>
          <label>Club ID:</label>
          <input type="text" value={clubId} readOnly />

          <label>Nom:</label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />

          <label>Prénom:</label>
          <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />

          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Numéro de téléphone:</label>
          <input type="tel" value={numeroTelephone} onChange={(e) => setNumeroTelephone(e.target.value)} required />

          <div className="btn">
            <button type="button" onClick={handleUpdateMember}>Enregistrer les modifications</button>
            <button type="button" onClick={handleCancel}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMember;

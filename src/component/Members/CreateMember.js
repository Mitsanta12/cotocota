import React, { useState } from "react";
import axios from "axios";
import Navbar from "../NavBar/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import "../Css/CreateMember.css";

function CreateMember() {
  const { club_id } = useParams();
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [numeroTelephone, setNumeroTelephone] = useState("");

  const handleCreateMember = async () => {
    try {
      // Fait une requête POST pour créer un nouveau membre
      await axios.post("http://localhost:5000/create_members", {
        nom,
        prenom,
        email,
        numero_telephone: numeroTelephone,
        club_id: parseInt(club_id),
      });

      // Redirige vers la page des membres du club après la création
      navigate(`/members/${club_id}`);
    } catch (error) {
      console.error("Erreur lors de la création du membre:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/members/${club_id}`); // Redirige vers la page des membres du club
  };

  return (
    <div>
      <Navbar />
      <div className="create_member">
        <h1>Créer un nouveau membre</h1>
        <form>
          <label>Nom:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />

          <label>Prénom:</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Numéro de téléphone:</label>
          <input
            type="tel"
            value={numeroTelephone}
            onChange={(e) => setNumeroTelephone(e.target.value)}
            required
          />

          <label>Club ID:</label>
          <input
            type="text"
            value={club_id}
            readOnly
          />

          <div className="btn">
            <button type="button" onClick={handleCreateMember}>
              Créer le membre
            </button>
            <button type="button" onClick={handleCancel}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateMember;

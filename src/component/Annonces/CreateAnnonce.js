import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import "../Css/CreateAnnonce.css";

function CreateAnnonce() {
  const navigate = useNavigate();

  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [clubs, setClubs] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState("");

  useEffect(() => {
    // Fait un appel à l'API pour obtenir la liste des clubs
    axios
      .get(`http://localhost:5000/clubs`)
      .then((response) => {
        setClubs(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des clubs:", error);
      });
  }, []);

  const handleCreateAnnonce = async () => {
    if (!titre || !contenu || !selectedClubId) {
      console.log("Tous les champs doivent être remplis.");
      return; // Empêche la création si des champs sont vides
    }

    try {
      // Fait une requête POST pour créer une nouvelle annonce avec le club sélectionné
      await axios.post("http://localhost:5000/annonces", {
        titre,
        contenu,
        club_id: selectedClubId,
      });

      // Redirige vers la page des annonces après la création
      navigate("/annonces");
    } catch (error) {
      console.error("Erreur lors de la création de l'annonce:", error);
    }
  };

  const handleCancel = () => {
    navigate("/annonces"); // Redirige vers la page des annonces
  };

  return (
    <div>
      <Navbar />
      <div className="create_annonce">
        <h1>Créer une nouvelle annonce</h1>
        <form>
          <label>Titre:</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />

          <label>Contenu:</label>
          <textarea
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            required
          ></textarea>

          <label>Club:</label>
          <select
            value={selectedClubId}
            onChange={(e) => setSelectedClubId(e.target.value)}
            required
          >
            <option value="">Sélectionnez un club</option>
            {clubs.map((club) => (
              <option key={club.club_id} value={club.club_id}>
                {club.nom}
              </option>
            ))}
          </select>

          <div className="btn">
            <button type="button" onClick={handleCreateAnnonce}>
              Créer l'annonce
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

export default CreateAnnonce;

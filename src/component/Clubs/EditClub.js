import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
import "../Css/EditClub.css";

function EditClub() {
  const { club_id } = useParams();
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [responsableName, setresponsableName] = useState("");

  useEffect(() => {
    // Fait un appel à l'API pour obtenir les détails du club à modifier
    axios
      .get(`http://localhost:5000/clubs/${club_id}`)
      .then((response) => {
        const clubData = response.data;
        setNom(clubData.nom);
        setDescription(clubData.description);
        setresponsableName(clubData.responsable_name);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails du club:",
          error
        );
      });
  }, [club_id]);

  const handleUpdateClub = async () => {
    try {
      // Fait une requête PUT pour mettre à jour les informations du club
      await axios.put(`http://localhost:5000/edit_club/${club_id}`, {
        nom,
        description,
        responsable_name: responsableName,
      });
      // Redirige vers la page de liste des clubs après la modification
      navigate("/clubs");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du club:", error);
    }
  };

  const handleCancel = () => {
    navigate("/clubs"); // Redirige vers la page des clubs
  };

  return (
    <div>
      <Navbar />
      <div className="edit_club">
        <h1>Modifier le club</h1>
        <form>
          <label>Nom du club:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />

          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label>Nom du responsable:</label>
          <input
            type="text"
            value={responsableName}
            onChange={(e) => setresponsableName(e.target.value)}
            required
          />
          <div className="btn">
            <button type="button" onClick={handleUpdateClub}>
              Enregistrer les modifications
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

export default EditClub;

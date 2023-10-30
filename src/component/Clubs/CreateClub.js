import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
import "../Css/CreateClub.css";

function CreateClub() {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [responsableName, setresponsableName] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateClub = async () => {
    if (!nom || !description || !responsableName) {
      // Affiche un message d'erreur si les champs ne sont pas tous remplis
      setErrorMessage("Tous les champs doivent être remplis");
      return;
    }

    try {
      await axios.post("http://localhost:5000/create_club", {
        nom,
        description,
        responsable_name: responsableName,
      });

      // Navigue vers la liste des clubs après la création réussie
      navigate("/clubs");
    } catch (error) {
      console.error("Erreur lors de la création du club:", error);
    }
  };

  const handleCancel = () => {
    // Redirige vers la page des clubs en cas d'annulation
    navigate("/clubs");
  };

  return (
    <div>
      <Navbar />
      <div className="content">
        <h1>Créer un nouveau club</h1>
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
            required
          ></textarea>

          <label>Nom du responsable:</label>
          <input
            type="text"
            value={responsableName}
            onChange={(e) => setresponsableName(e.target.value)}
            required
          />
          <div>
            <button type="button" onClick={handleCreateClub}>
              Créer
            </button>
            <button type="button" onClick={handleCancel}>
              Annuler
            </button>
            <div className="Erreur">
              {errorMessage && <p className="error_message">{errorMessage}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateClub;

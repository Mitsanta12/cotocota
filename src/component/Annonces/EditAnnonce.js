import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
import "../Css/EditAnnonce.css";

function EditAnnonce() {
  const { annonce_id } = useParams();
  const navigate = useNavigate();

  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [clubId, setClubId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fait un appel à l'API pour obtenir les détails de l'annonce à modifier
    axios
      .get(`http://localhost:5000/annonces/${annonce_id}`)
      .then((response) => {
        const annonceData = response.data;
        setTitre(annonceData.titre);
        setContenu(annonceData.contenu);
        setClubId(annonceData.club_id);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'annonce:",
          error
        );
      });
  }, [annonce_id]);

  const handleUpdateAnnonce = async () => {
    try {
      // Fait une requête PUT pour mettre à jour les informations de l'annonce
      await axios.put(`http://localhost:5000/edit_annonce/${annonce_id}`, {
        titre,
        contenu,
        club_id: clubId,
      });

      // Redirige vers la page de liste des annonces après la modification
      navigate("/annonces");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'annonce:", error);
      setErrorMessage(
        "Une erreur est survenue lors de la mise à jour de l'annonce."
      );
    }
  };

  const handleCancel = () => {
    navigate("/annonces"); // Redirige vers la page des annonces
  };

  return (
    <div>
      <Navbar />
      <div className="edit_annonce">
        <h1>Modifier l'annonce</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form>
          <label>Club ID:</label>
          <input type="text" value={clubId} readOnly />

          <label>Titre de l'annonce:</label>
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
          ></textarea>

          <div className="btn">
            <button type="button" onClick={handleUpdateAnnonce}>
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

export default EditAnnonce;

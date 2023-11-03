import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';

import './Css/Footer.css';

function Footer() {
  return (
    <footer>
      <div className="social-links">
        <h3>Suivez-moi sur les réseaux sociaux :</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com/Mitsanta.Raz/" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="lien_vers_linkedin" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a href="lien_vers_instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a href="https://wa.me/numéro_whatsapp" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEnvelope,
  faHeadset,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Contato from "./Contato";
import "./Header.css";

function Header({ carrinho, isLoggedIn, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="desapegalogo.png" alt="Desapega Livros" />
        </Link>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Digite o que você procura"
          className="search-bar"
        />
        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className="menu">
        <div className="hamburger-menu">
          <button className="hamburger-button" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faBars} />
            <span>Todas as categorias</span>
          </button>
          <ul className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
            <li>Editora Penguin</li>
            <li>Ficção Científica</li>
            <li>Literatura Brasileira</li>
            <li>Literatura Estrangeira</li>
            <li>Biografia</li>
            <li>Lançamentos</li>
          </ul>
        </div>

        <span onClick={openModal} className="contact-button">
          <FontAwesomeIcon icon={faHeadset} /> Contato
        </span>

        {isLoggedIn ? (
          <>
            <span>
              <Link to="/adicionar-livro" className="add-book-button">
                Adicionar Livro
              </Link>
            </span>
            <span>
              <Link to="/perfil" className="profile-button">
                Ver Perfil
              </Link>
            </span>
            <span>
              <button onClick={onLogout} className="logout-button">
                Sair
              </button>
            </span>
          </>
        ) : (
          <span>
            <Link to="/login" className="login-button">
              <FontAwesomeIcon icon={faUser} /> Entrar ou Cadastrar
            </Link>
          </span>
        )}

        <button className="cart-button">
          <FontAwesomeIcon icon={faEnvelope} />
          <span className="cart-count">{carrinho.length}</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="custom-modal">
          <div className="modal-content">
            <button onClick={closeModal} className="close-modal">
              X
            </button>
            <Contato />
          </div>
          <div className="modal-overlay" onClick={closeModal}></div>
        </div>
      )}
    </header>
  );
}

export default Header;

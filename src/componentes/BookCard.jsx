import React from "react";
import "./BookCard.css";

function BookCard({ livro, onImageClick, onAdicionarCarrinho }) {
  return (
    <div className="book-card">
      <img
        src={livro.imagem}
        alt={livro.titulo}
        onClick={() => onImageClick(livro.id)} // Aciona a navegação
        style={{ cursor: "pointer" }}
      />
      <h3>{livro.titulo}</h3>
      <p>Autor: {livro.autor || "Não informado"}</p>
      <p>
        Disponibilidade:{" "}
        {livro.disponibilidade ? "Disponível" : "Indisponível"}
      </p>
      <div className="book-card-footer">
        <button
          className="solicitar-button"
          onClick={() => onAdicionarCarrinho(livro)}
          disabled={!livro.disponibilidade}
        >
          Solicitar
        </button>
      </div>
    </div>
  );
}

export default BookCard;

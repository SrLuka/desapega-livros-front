import React from "react";
import BookCard from "./BookCard";
import "./BookList.css";
import { useNavigate } from "react-router-dom";

function BookList({ livros, onAdicionarCarrinho }) {
  const navigate = useNavigate();

  const handleImageClick = (id) => {
    navigate(`/livros/${id}`);
  };

  if (!Array.isArray(livros)) {
    return <p>Erro ao carregar livros.</p>;
  }

  return (
    <section className="book-list">
      <h2>Destaques</h2>
      <div className="books">
        {livros.length === 0 ? (
          <p>Nenhum livro encontrado.</p>
        ) : (
          livros.map((livro) => (
            <BookCard
              key={livro.id}
              livro={livro}
              onAdicionarCarrinho={onAdicionarCarrinho}
              onImageClick={handleImageClick} 
            />
          ))
        )}
      </div>
    </section>
  );
}

export default BookList;

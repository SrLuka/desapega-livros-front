import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BookDetails.css";

function BookDetails({ onAdicionarCarrinho }) {
  const { id } = useParams(); // Obtém o ID do livro da URL
  const [livro, setLivro] = useState(null); // Estado do livro atual

  useEffect(() => {
    axios
      .get(`http://localhost:5000/livros/${id}`)
      .then((response) => setLivro(response.data))
      .catch((error) => console.error("Erro ao carregar livro:", error));
  }, [id]);

  if (!livro) {
    return <p>Carregando detalhes...</p>;
  }

  // Verifica a disponibilidade do livro
  const isDisponivel = livro.disponibilidade;

  return (
    <div className="book-details">
      <div className="book-details-left">
        <img src={livro.imagem} alt={livro.titulo} />
      </div>
      <div className="book-details-right">
        <h2>{livro.titulo}</h2>
        <p><strong>Autor:</strong> {livro.autor || "Não informado"}</p>
        <p><strong>Descrição:</strong></p>
        <p>{livro.sinopse || "Descrição não disponível"}</p>
        <p>
          <strong>Disponibilidade:</strong>{" "}
          <span className={isDisponivel ? "disponivel" : "indisponivel"}>
            {isDisponivel ? "Disponível" : "Indisponível"}
          </span>
        </p>
        <button
          className={`solicitar-button ${isDisponivel ? "enabled" : "disabled"}`}
          onClick={() => isDisponivel && onAdicionarCarrinho(livro)}
          disabled={!isDisponivel} 
        >
          Solicitar
        </button>
      </div>
    </div>
  );
}

export default BookDetails;

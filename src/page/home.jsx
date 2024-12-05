import React, { useState, useEffect } from "react";
import axios from "axios";
import BookList from "../componentes/BookList";
import "./home.css";
import AddBookForm from "../componentes/AddBookForm";

function Home({ onAdicionarCarrinho, isLoggedIn }) {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/livros")
      .then((response) => {
        setLivros(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Erro ao carregar os livros!");
        setLoading(false);
      });
  }, []);

  const handleLivroAdicionado = (novoLivro) => {
    setLivros((prevLivros) => [...prevLivros, novoLivro]);
  };

  if (loading) return <p>Carregando livros...</p>;
  if (error) return <p>{error}</p>;

  return(
  <BookList
  livros={livros}
  onAdicionarCarrinho={onAdicionarCarrinho}
  isLoggedIn={isLoggedIn}/>
  );
}

export default Home;

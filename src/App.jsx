import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Header from "./componentes/Header";
import "./App.css";
import Home from "./page/home";
import Login from "./page/login";
import AddBook from "./page/AddBook";
import BookDetails from "./page/BookDetails";

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [livros, setLivros] = useState([]); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAdicionarCarrinho = (livro) => {
    setCarrinho((prevCarrinho) => [...prevCarrinho, livro]);
    alert(`Livro "${livro.titulo}" adicionado ao carrinho!`);
  };

  const handleLivroAdicionado = (novoLivro) => {
    setLivros((prevLivros) => [...prevLivros, novoLivro]);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} carrinho={carrinho} />
      <Routes>
        <Route
          path="/"
          element={<Home onAdicionarCarrinho={handleAdicionarCarrinho} />}
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/adicionar-livro"
          element={
            isLoggedIn ? (
              <AddBook onLivroAdicionado={handleLivroAdicionado} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
        path="/livros/:id" element={<BookDetails onAdicionarCarrinho={handleAdicionarCarrinho} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

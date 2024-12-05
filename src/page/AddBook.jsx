import React from "react";
import AddBookForm from "../componentes/AddBookForm";

function AddBook({ onLivroAdicionado }) {
  return (
    <div>
      <h2>Adicionar Livro</h2>
      <AddBookForm onLivroAdicionado={onLivroAdicionado} />
    </div>
  );
}

export default AddBook;

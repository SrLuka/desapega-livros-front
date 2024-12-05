import React, { useState } from "react";
import axios from "axios";
import "./AddBookForm.css";

function AddBookForm({ onLivroAdicionado }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    if (file) {
      setImagemPreview(URL.createObjectURL(file));
    } else {
      setImagemPreview(null);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMensagem("");

    
    if (!titulo || !descricao || !imagem) {
      setMensagem("Por favor, preencha todos os campos obrigatórios.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("autor", autor || "Desconhecido");
      formData.append("sinopse", descricao);
      formData.append("imagem", imagem);

      const response = await axios.post("http://localhost:5000/livros", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onLivroAdicionado(response.data); 
      setMensagem("Livro adicionado com sucesso!");

      
      setTitulo("");
      setAutor("");
      setDescricao("");
      setImagem(null);
      setImagemPreview(null);
    } catch (error) {
      setMensagem(
        error.response?.data?.mensagem || "Erro ao adicionar o livro. Tente novamente."
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <h3>Adicionar Novo Livro</h3>

     
      <input
        type="text"
        placeholder="Título *"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
        disabled={isSubmitting}
      />

      
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        disabled={isSubmitting}
      />

      
      <textarea
        placeholder="Descrição *"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="description-field"
        required
        disabled={isSubmitting}
      ></textarea>

      
      <div className="upload-container">
        {imagemPreview && (
          <div className="image-preview">
            <img src={imagemPreview} alt="Pré-visualização" />
          </div>
        )}
        <label className="custom-file-upload">
          Selecionar Imagem *
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            disabled={isSubmitting}
            required
          />
        </label>
      </div>


      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Adicionar"}
      </button>

      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}

export default AddBookForm;

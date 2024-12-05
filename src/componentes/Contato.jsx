import React, { useState } from "react";
import "./Contato.css";

function Contato() {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulário enviado com sucesso!");
    setShowModal(false);
  };

  return (
    <div>
      {/* Formulário de Contato */}
      <h2>Fale Conosco</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" required />
        </label>
        <label>
          E-mail:
          <input type="email" name="email" required />
        </label>
        <label>
          Mensagem:
          <textarea name="mensagem" rows="5" required />
        </label>
        <div className="form-actions">
          <button type="submit">Enviar</button>
          <button type="button" onClick={handleClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contato;

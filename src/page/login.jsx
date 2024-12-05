import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const loginFake = {
    email: "admin@test.com",
    password: "admin",
  };

  // Função de login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email === loginFake.email && password === loginFake.password) {
      onLogin();
      navigate("/"); 
    } else {
      setErrorMessage("Credenciais inválidas! Tente novamente.");
    }
  };

  // Função de registro
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    alert(`Cadastro realizado com sucesso!\nNome: ${name}\nE-mail: ${email}`);
    setIsRegistering(false);
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? "Cadastro" : "Login"}</h2>

      <form onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}>
        {isRegistering && (
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              required
            />
          </label>
        )}

        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            required
          />
        </label>

        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </label>

        {isRegistering && (
          <label>
            Confirme sua Senha:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua senha"
              required
            />
          </label>
        )}

        <button type="submit">{isRegistering ? "Cadastrar" : "Entrar"}</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>
        {isRegistering ? (
          <>
            Já tem uma conta?{" "}
            <button onClick={() => setIsRegistering(false)}>Faça login</button>
          </>
        ) : (
          <>
            Não tem uma conta?{" "}
            <button onClick={() => setIsRegistering(true)}>Cadastre-se</button>
          </>
        )}
      </p>
    </div>
  );
}

export default Login;

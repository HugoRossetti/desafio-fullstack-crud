"use client";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  lastName: string;
  age: number;
  email: string;
  cpf: string;
}

export default function Home() {
  const [user, setUser] = useState<User>({} as User);
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    obterUsers();
  }, []);

  async function obterUsers() {
    try {
      const resp = await fetch("http://localhost:3001/users");
      const users: User[] = await resp.json();
      setUsers(users);
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
    }
  }

  async function criarUser() {
    try {
      const existingUser = users.find(
        (u) =>
          u.name === user.name ||
          u.lastName === user.lastName ||
          u.email === user.email ||
          u.cpf === user.cpf
      );

      if (existingUser) {
        setErrorMessage("Email ou CPF já cadastrados!");
        return;
      }

      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar usuário");
      }

      setUser({} as User);
      setErrorMessage(""); // Limpa o erro caso a criação seja bem-sucedida
      await obterUsers();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      setErrorMessage("Erro ao criar usuário.");
    }
  }

  async function alterarUser() {
    try {
      await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      setUser({} as User);
      setErrorMessage(""); // Limpa o erro ao alterar
      await obterUsers();
    } catch (error) {
      console.error("Erro ao alterar usuário:", error);
    }
  }

  async function obterUserPorId(id: number) {
    try {
      const resp = await fetch(`http://localhost:3001/users/${id}`);
      const user: User = await resp.json();
      setUser(user);
    } catch (error) {
      console.error("Erro ao obter usuário por ID:", error);
    }
  }

  async function excluirUser(id: number) {
    try {
      await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
      });
      await obterUsers();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  }

  function renderizarFormUser() {
    return (
      <div className="flex flex-col gap-4 w-1/3">
        {errorMessage && (
          <div className="bg-red-500 text-white p-2 rounded-md text-center">
            {errorMessage}
          </div>
        )}
        <div className="flex flex-col">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={user.name ?? ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="bg-zinc-700 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="sobrenome">Sobrenome</label>
          <input
            id="sobrenome"
            type="text"
            value={user.lastName ?? ""}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            className="bg-zinc-700 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="age">Idade</label>
          <input
            id="age"
            type="number"
            value={user.age ?? ""}
            onChange={(e) => setUser({ ...user, age: +e.target.value })}
            className="bg-zinc-700 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={user.email ?? ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="bg-zinc-700 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            type="text"
            value={user.cpf ?? ""}
            onChange={(e) => setUser({ ...user, cpf: e.target.value })}
            className="bg-zinc-700 p-2 rounded-md"
          />
        </div>
        <div>
          {user.id ? (
            <button
              onClick={alterarUser}
              className="bg-blue-500 px-4 py-2 rounded-md w-full">
              Alterar User
            </button>
          ) : (
            <button
              onClick={criarUser}
              className="bg-blue-500 px-4 py-2 rounded-md w-full">
              Criar User
            </button>
          )}
        </div>
      </div>
    );
  }

  function renderizarUsers() {
    return (
      <div className="flex flex-col gap-2 w-1/3">
        {users.length === 0 ? (
          <p className="text-white text-center">Nenhum usuário cadastrado</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col bg-zinc-800 px-4 py-2 rounded-md">
              <div className="flex justify-between">
                <div>
                  {user.name} {user.lastName}
                </div>
                <div>{user.age} anos</div>
              </div>
              <div>{user.email}</div>
              <div>{user.cpf}</div>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => obterUserPorId(user.id)}
                  className="bg-green-500 p-2 rounded-md">
                  Alterar
                </button>
                <button
                  onClick={() => excluirUser(user.id)}
                  className="bg-red-500 p-2 rounded-md">
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      {renderizarFormUser()}
      {renderizarUsers()}
    </div>
  );
}

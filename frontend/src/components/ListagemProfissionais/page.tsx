// components/ListagemProfissionais.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Profissional {
  id: number;
  nome: string;
  cpf: string;
  especialidade: string;
  telefone: string;
  email: string;
  senha: string;
  created_at: string | null;
  updated_at: string | null;
}

const ListagemProfissionais = () => {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/profissionais');
        setProfissionais(response.data);
      } catch (error) {
        setError('Ocorreu um erro ao carregar os profissionais. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Listagem de Profissionais</h2>
      <ul>
        {profissionais.map((profissional) => (
          <li key={profissional.id}>
            <p>Nome: {profissional.nome}</p>
            <p>CPF: {profissional.cpf}</p>
            <p>Especialidade: {profissional.especialidade}</p>
            <p>Telefone: {profissional.telefone}</p>
            <p>Email: {profissional.email}</p>
            <p>Senha: {profissional.senha}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListagemProfissionais;

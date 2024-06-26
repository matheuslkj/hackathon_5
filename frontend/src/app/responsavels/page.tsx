"use client";
import { useState, useEffect } from 'react';
import { Menu } from '@/components/Menu';
import Modal from '@/components/Modal'; // Importe o componente Modal personalizado se necessário
import { getResponsaveis, getIdosos, createResponsavel, updateResponsavel, deleteResponsavel } from '../api/route'; // Importe as funções centralizadas
import validator from 'validator'; // Importar validator para validar CPF e telefone
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const API_URL = 'http://127.0.0.1:8000/api/v1/responsavels';

interface Responsavel {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
  senha: string;
  idoso_id: number;
}

interface Idoso {
  id: number;
  nome: string;
}

const ResponsavelPage = () => {
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
  const [idosos, setIdosos] = useState<Idoso[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingResponsavelId, setEditingResponsavelId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    endereco: '',
    senha: '',
    idoso_id: 0,
  });
  const [formErrors, setFormErrors] = useState({
    cpf: '',
    telefone: '',
  });

  useEffect(() => {
    const fetchResponsaveis = async () => {
      try {
        const data = await getResponsaveis();
        setResponsaveis(data);
      } catch (error) {
        console.error('Erro ao buscar responsáveis:', error);
      }
    };

    const fetchIdosos = async () => {
      try {
        const data = await getIdosos();
        setIdosos(data || []); // Certificar-se de que idosos seja inicializado como array vazio se data for null/undefined
      } catch (error) {
        console.error('Erro ao buscar idosos:', error);
      }
    };

    fetchResponsaveis();
    fetchIdosos();
  }, []);

  const openModal = (responsavel: Responsavel | null) => {
    if (responsavel) {
      setFormData({
        nome: responsavel.nome,
        cpf: responsavel.cpf,
        telefone: responsavel.telefone,
        endereco: responsavel.endereco,
        senha: responsavel.senha,
        idoso_id: responsavel.idoso_id || 0,
      });
      setEditingResponsavelId(responsavel.id);
      setIsEditing(true);
    } else {
      setFormData({
        nome: '',
        cpf: '',
        telefone: '',
        endereco: '',
        senha: '',
        idoso_id: 0,
      });
      setEditingResponsavelId(null);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingResponsavelId(null);
    setFormErrors({
      cpf: '',
      telefone: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Limpar erros quando o usuário começa a digitar novamente
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação de CPF usando validator
    if (!validator.isLength(formData.cpf || '', { min: 11, max: 11 })) {
      setFormErrors({ ...formErrors, cpf: 'CPF deve conter 11 dígitos' });
      return;
    }

    // Validação de telefone usando validator
    if (!validator.isMobilePhone(formData.telefone || '', 'any', { strictMode: false })) {
      setFormErrors({ ...formErrors, telefone: 'Telefone inválido' });
      return;
    }

    try {
      if (isEditing && editingResponsavelId) {
        await updateResponsavel(editingResponsavelId, formData);
      } else {
        await createResponsavel(formData);
      }
      closeModal();
      const updatedResponsaveis = await getResponsaveis();
      setResponsaveis(updatedResponsaveis);
    } catch (error) {
      console.error('Erro ao cadastrar ou atualizar responsável:', error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await deleteResponsavel(id);
      const updatedResponsaveis = await getResponsaveis();
      setResponsaveis(updatedResponsaveis);
    } catch (error) {
      console.error('Erro ao deletar responsável:', error);
    }
  };

  return (
    <div className="container">
      <Menu />
      <main className="main" style={{marginLeft: '200px'}}>
        <h1 className="title">Responsáveis</h1>
        <button className="btn btn-primary mb-3" onClick={() => openModal(null)}>
          Cadastrar Responsável
        </button>
        <ul className="list-group mb-3">
          {responsaveis.map((responsavel) => (
            <li key={responsavel.id} className="list-group-item">
              <h2>{responsavel.nome}</h2>
              <p>CPF: {responsavel.cpf}</p>
              <p>Telefone: {responsavel.telefone}</p>
              <p>Endereço: {responsavel.endereco}</p>
              <p>
                Idoso Associado: {responsavel.idoso_id ? idosos.find((idoso) => idoso.id === responsavel.idoso_id)?.nome : 'Não especificado'}
              </p>
              <button className="btn btn-secondary me-2" onClick={() => openModal(responsavel)}>
                <FaEdit size={20}/>
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(responsavel.id)}>
                <FaTrashAlt size={20}/>
              </button>
            </li>
          ))}
        </ul>
      </main>

      {isModalOpen && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? 'Editar Responsável' : 'Cadastrar Responsável'}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cpf">CPF:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cpf"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.cpf && <div className="text-danger">{formErrors.cpf}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefone">Telefone:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.telefone && <div className="text-danger">{formErrors.telefone}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="endereco">Endereço:</label>
                    <textarea
                      className="form-control"
                      id="endereco"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="idoso_id">Idoso Associado:</label>
                    <select
                      className="form-control"
                      id="idoso_id"
                      name="idoso_id"
                      value={formData.idoso_id}
                      onChange={handleSelectChange}
                      required
                    >
                      <option value={0}>Selecione um idoso</option>
                      {idosos.map((idoso) => (
                        <option key={idoso.id} value={idoso.id}>
                          {idoso.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  {!isEditing && ( // Não exibir campo de senha ao editar responsável
                    <div className="form-group">
                      <label htmlFor="senha">Senha:</label>
                      <input
                        type="password"
                        className="form-control"
                        id="senha"
                        name="senha"
                        value={formData.senha}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsavelPage;


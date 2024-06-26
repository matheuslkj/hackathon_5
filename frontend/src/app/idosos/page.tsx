"use client";
import { useState, useEffect } from 'react';
import { Menu } from '@/components/Menu';
import Modal from '@/components/Modal'; // Importe o componente Modal personalizado se necessário
import {  getIdosos, deleteIdoso, updateIdoso, createIdoso } from '../api/route'; // Importe as funções centralizadas
import validator from 'validator'; // Importar validator para validar CPF e telefone

const API_URL = 'http://127.0.0.1:8000/api/v1/idosos';

interface Idoso {
  id: number;
  nome: string;
  nascimento: string;
  endereco: string;
  telefone: string;
  historico_medico: string;
  cpf: string;
}


const IdosoPage = () => {
  const [idosos, setIdosos] = useState<Idoso[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIdosoId, setEditingIdosoId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    nascimento: '',
    endereco: '',
    telefone: '',
    historico_medico: '',
    cpf: '',
  });
  const [formErrors, setFormErrors] = useState({
    telefone: '',
    cpf: '',
  });

  useEffect(() => {
    const fetchIdosos = async () => {
      try {
        const data = await getIdosos();
        setIdosos(data);
      } catch (error) {
        console.error('Erro ao buscar idosos:', error);
      }
    };

    fetchIdosos();
  }, []);

  const openModal = (idoso: Idoso | null) => {
    if (idoso) {
      setFormData({
        nome: idoso.nome,
        nascimento: idoso.nascimento,
        endereco: idoso.endereco,
        telefone: idoso.telefone,
        historico_medico: idoso.historico_medico,
        cpf: idoso.cpf
      });
      setEditingIdosoId(idoso.id);
      setIsEditing(true);
    } else {
      setFormData({
        nome: '',
        nascimento: '',
        endereco: '',
        telefone: '',
        historico_medico: '',
        cpf: '',
      });
      setEditingIdosoId(null);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingIdosoId(null);
    setFormErrors({
      telefone: '',
      cpf: '',
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
      if (isEditing && editingIdosoId) {
        await updateIdoso(editingIdosoId, formData);
      } else {
        await createIdoso(formData);
      }
      closeModal();
      const updatedIdosos = await getIdosos();
      setIdosos(updatedIdosos);
    } catch (error) {
      console.error('Erro ao cadastrar ou atualizar responsável:', error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await deleteIdoso(id);
      const updatedIdosos = await getIdosos();
      setIdosos(updatedIdosos);
    } catch (error) {
      console.error('Erro ao deletar responsável:', error);
    }
  };

  return (
    <div className="container">
      <Menu />
      <main className="main">
        <h1 className="title">Idosos</h1>
        <button className="btn btn-primary mb-3" onClick={() => openModal(null)}>
          Cadastrar Idoso
        </button>
        <ul className="list-group mb-3">
          {idosos.map((idoso) => (
            <li key={idoso.id} className="list-group-item">
              <h2>{idoso.nome}</h2>
              <p>Nascimento: {idoso.nascimento}</p>
              <p>Endereço: {idoso.endereco}</p>
              <p>Telefone: {idoso.telefone}</p>
              <p>Histórico Médico: {idoso.historico_medico}</p>
              <p>CPF: {idoso.cpf}</p>
              <button className="btn btn-secondary me-2" onClick={() => openModal(idoso)}>
                Editar
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(idoso.id)}>
                Deletar
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
                <h5 className="modal-title">{isEditing ? 'Editar Idoso' : 'Cadastrar Idoso'}</h5>
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
                    <label htmlFor="nascimento">Nascimento:</label>
                    <textarea
                      className="form-control"
                      id="nascimento"
                      name="nascimento"
                      value={formData.nascimento}
                      onChange={handleInputChange}
                      required
                    />
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
                    <label htmlFor="historico_medico">Histórico Médico:</label>
                    <textarea
                      className="form-control"
                      id="historico_medico"
                      name="historico_medico"
                      value={formData.historico_medico}
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

export default IdosoPage;


// src/pages/idosos/page.tsx

"use client";
import { useState, useEffect } from 'react';
import { Menu } from '@/components/Menu';
import { getIdosos, createIdoso, updateIdoso, deleteIdoso } from '../api/route'; // Importação das funções centralizadas
import validator from 'validator'; // Importar validator para validar CPF e telefone

const IdosoPage = () => {
  const [idosos, setIdosos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIdosoId, setCurrentIdosoId] = useState<number | null>(null); // Ajuste aqui para number
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Limpar erros quando o usuário começa a digitar novamente
    setFormErrors({ ...formErrors, [name]: '' });
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
      if (isEditing && currentIdosoId !== null) {
        await updateIdoso(currentIdosoId, formData); // currentIdosoId é number aqui
      } else {
        await createIdoso(formData);
      }
      setIsModalOpen(false);
      setIsEditing(false);
      setCurrentIdosoId(null);
      setFormData({
        nome: '',
        nascimento: '',
        endereco: '',
        telefone: '',
        historico_medico: '',
        cpf: '',
      }); // Resetando o formData para os valores iniciais
      const updatedIdosos = await getIdosos();
      setIdosos(updatedIdosos);
    } catch (error) {
      console.error('Erro ao cadastrar ou atualizar idoso:', error);
    }
  };

  const handleEdit = (idoso: any) => {
    setFormData({
      nome: idoso.nome,
      nascimento: idoso.nascimento.split('T')[0], // Ajuste para data no formato correto
      endereco: idoso.endereco,
      telefone: idoso.telefone,
      historico_medico: idoso.historico_medico,
      cpf: idoso.cpf,
    });
    setCurrentIdosoId(idoso.id); // id deve ser number
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => { // id é number
    try {
      await deleteIdoso(id.toString());
      const updatedIdosos = await getIdosos();
      setIdosos(updatedIdosos);
    } catch (error) {
      console.error('Erro ao deletar idoso:', error);
    }
  };

  return (
    <div className="container">
      <Menu />
      <main className="main">
        <h1 className="title">Idosos</h1>
        <button className="btn btn-primary mb-3" onClick={() => {
          setIsEditing(false);
          setFormData({
            nome: '',
            nascimento: '',
            endereco: '',
            telefone: '',
            historico_medico: '',
            cpf: '',
          });
          setIsModalOpen(true);
        }}>
          Cadastrar Idoso
        </button>
        <ul className="list-group mb-3">
          {idosos.map((idoso: any) => (
            <li key={idoso.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h2>{idoso.nome}</h2>
                <p>Nascimento: {idoso.nascimento}</p>
                <p>Endereço: {idoso.endereco}</p>
                <p>Telefone: {idoso.telefone}</p>
                <p>Histórico Médico: {idoso.historico_medico}</p>
                <p>CPF: {idoso.cpf}</p>
              </div>
              <div className="d-grid gap-2 col-1.5 mx-auto">
                <button className="btn btn-secondary" onClick={() => handleEdit(idoso)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(idoso.id)}>
                  Deletar
                </button>
              </div>
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
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsModalOpen(false)}>
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
                    <input
                      type="date"
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

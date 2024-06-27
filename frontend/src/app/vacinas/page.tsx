"use client";
import { useState, useEffect } from 'react';
import { Menu } from '@/components/Menu';
import Modal from '@/components/Modal'; // Importe o componente Modal personalizado se necessário
import { getVacinas, createVacina, updateVacina, deleteVacina } from '../api/route'; // Importe as funções centralizadas
import { FaEdit, FaTrashAlt } from 'react-icons/fa';  
import { isAuthenticated, verificaTokenExpirado } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';

const VacinaPage = () => {
  const [vacinas, setVacinas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVacinaId, setCurrentVacinaId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    doses_necessarias: 1,
    data_campanha: '',
  });

  const router = useRouter();

    useEffect(() => {
        const token = parseCookies()['vacithon.token'];
    
        const authenticated = isAuthenticated();
    
        const isExpired = verificaTokenExpirado(token);

    if (!isAuthenticated || isExpired) {
        router.push('/login');
      }
    }, [router]);

  useEffect(() => {
    const fetchVacinas = async () => {
      try {
        const data = await getVacinas();
        setVacinas(data);
      } catch (error) {
        console.error('Erro ao buscar Vacinas:', error);
      }
    };

    fetchVacinas();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentVacinaId) {
        await updateVacina(currentVacinaId, formData);
      } else {
        await createVacina(formData);
      }
      setIsModalOpen(false);
      setIsEditing(false);
      setCurrentVacinaId(null);
      setFormData({
        nome: '',
        descricao: '',
        doses_necessarias: 1,
        data_campanha: '',
      }); // Resetando o formData para os valores iniciais
      const updatedVacinas = await getVacinas();
      setVacinas(updatedVacinas);
    } catch (error) {
      console.error('Erro ao cadastrar ou atualizar Vacina:', error);
    }
  };

  const handleEdit = (vacina: any) => {
    setFormData({
      nome: vacina.nome,
      descricao: vacina.descricao,
      doses_necessarias: vacina.doses_necessarias,
      data_campanha: vacina.data_campanha ? vacina.data_campanha.split('T')[0] : '',
    });
    setCurrentVacinaId(vacina.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteVacina(id);
      const updatedVacinas = await getVacinas();
      setVacinas(updatedVacinas);
    } catch (error) {
      console.error('Erro ao deletar Vacina:', error);
    }
  };

  return (
    <div className="container">
      <Menu />
      <main className="main" style={{maxWidth: '1000px', marginLeft: '210px'}}>
        <h1 className="title">Vacinas</h1>
        <button className="btn btn-primary mb-3" onClick={() => {
          setIsEditing(false);
          setFormData({
            nome: '',
            descricao: '',
            doses_necessarias: 1,
            data_campanha: '',
          });
          setIsModalOpen(true);
        }}>
          Cadastrar Vacina
        </button>
        <ul className="list-group mb-3">
          {vacinas.map((vacina: any) => (
            <li key={vacina.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h2>{vacina.nome}</h2>
                <p>{vacina.descricao}</p>
              </div>
              <div className="d-grid gap-2 col-1.5 mx-auto">
                <button className="btn btn-secondary" onClick={() => handleEdit(vacina)}>
                  <FaEdit />
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(vacina.id)}>
                  <FaTrashAlt />
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
                <h5 className="modal-title">{isEditing ? 'Editar Vacina' : 'Cadastrar Vacina'}</h5>
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
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                      className="form-control"
                      id="descricao"
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="doses_necessarias">Doses Necessárias:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="doses_necessarias"
                      name="doses_necessarias"
                      value={formData.doses_necessarias}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="data_campanha">Data da Campanha:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="data_campanha"
                      name="data_campanha"
                      value={formData.data_campanha}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
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

export default VacinaPage;
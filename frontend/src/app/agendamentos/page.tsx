"use client";
import { useState, useEffect } from 'react';
import { Menu } from '@/components/Menu';
import Modal from '@/components/Modal'; // Importe o componente Modal personalizado se necessário
import { createAgendamento, deleteAgendamento, getAgendamentos, getIdosos, getProfissionais, getResponsaveis, updateAgendamento } from '../api/route'; // Importe as funções centralizadas
import validator from 'validator'; // Importar validator para validar CPF e telefone
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const API_URL = 'http://127.0.0.1:8000/api/v1/agendamentos';

interface Agendamento {
    id: number;
    responsavel_id: number;
    profissional_saude_id: number;
    idoso_id: number;
    data_hora: string;
    status: string;
}

interface Responsavel {
    id: number;
    nome: string;
}

interface Profissional {
    id: number;
    nome: string;
}

interface Idoso {
    id: number;
    nome: string;
}

const AgendamentoPage = () => {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
    const [profissionais, setProfissionais] = useState<Profissional[]>([]);
    const [idosos, setIdosos] = useState<Idoso[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingAgendamentoId, setEditingAgendamentoId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        responsavel_id: 0,
        profissional_saude_id: 0,
        idoso_id: 0,
        data_hora: '',
        status: '',
    });

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const data = await getAgendamentos();
                setAgendamentos(data);
            } catch (error) {
                console.error('Erro ao buscar agendamentos:', error);
            }
        };

        const fetchResponsaveis = async () => {
            try {
                const data = await getResponsaveis();
                setResponsaveis(data || []); // Certificar-se de que responsáveis seja inicializado como array vazio se data for null/undefined
            } catch (error) {
                console.error('Erro ao buscar responsáveis:', error);
            }
        };

        const fetchProfissionais = async () => {
            try {
                const data = await getProfissionais();
                setProfissionais(data || []); // Certificar-se de que profissionais seja inicializado como array vazio se data for null/undefined
            } catch (error) {
                console.error('Erro ao buscar profissionais:', error);
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

        fetchAgendamentos();
        fetchResponsaveis();
        fetchProfissionais();
        fetchIdosos();
    }, []);

    const openModal = (agendamento: Agendamento | null) => {
        if (agendamento) {
            setFormData({
                responsavel_id: agendamento.responsavel_id,
                profissional_saude_id: agendamento.profissional_saude_id,
                idoso_id: agendamento.idoso_id,
                data_hora: agendamento.data_hora,
                status: agendamento.status,
            });
            setEditingAgendamentoId(agendamento.id);
            setIsEditing(true);
        } else {
            setFormData({
                responsavel_id: 0,
                profissional_saude_id: 0,
                idoso_id: 0,
                data_hora: '',
                status: '',
            });
            setEditingAgendamentoId(null);
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditingAgendamentoId(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: parseInt(value) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEditing && editingAgendamentoId) {
                await updateAgendamento(editingAgendamentoId, formData);
            } else {
                await createAgendamento(formData);
            }
            closeModal();
            const updatedAgendamentos = await getAgendamentos();
            setAgendamentos(updatedAgendamentos);
        } catch (error) {
            console.error('Erro ao cadastrar ou atualizar agendamento:', error);
        }
    };

    const handleDelete = async (id: any) => {
        try {
            await deleteAgendamento(id);
            const updatedAgendamentos = await getAgendamentos();
            setAgendamentos(updatedAgendamentos);
        } catch (error) {
            console.error('Erro ao deletar Agendamento:', error);
        }
    };

    return (
        <div className="container">
            <Menu />
            <main className="main" style={{marginLeft: '200px'}}>
                <h1 className="title">Agendamento</h1>
                <button className="btn btn-primary mb-3" onClick={() => openModal(null)}>
                    Cadastrar Agendamento
                </button>
                <ul className="list-group mb-3">
                    {agendamentos.map((agendamento) => (
                        <li key={agendamento.id} className="list-group-item">
                            <p>
                                Responsável: {agendamento.responsavel_id ? responsaveis.find((responsavel) => responsavel.id === agendamento.responsavel_id)?.nome : 'Não especificado'}
                            </p>
                            <p>
                                Profissional de Saúde: {agendamento.profissional_saude_id ? profissionais.find((profissionais) => profissionais.id === agendamento.profissional_saude_id)?.nome : 'Não especificado'}
                            </p>
                            <p>
                                Idoso Associado: {agendamento.idoso_id ? idosos.find((idoso) => idoso.id === agendamento.idoso_id)?.nome : 'Não especificado'}
                            </p>
                            <p>Data: {agendamento.data_hora}</p>
                            <p>Status: {agendamento.status}</p>
                            <button className="btn btn-secondary me-2" onClick={() => openModal(agendamento)}>
                                <FaEdit size={20}/>
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(agendamento.id)}>
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
                                <h5 className="modal-title">{isEditing ? 'Editar Agendamento' : 'Cadastrar Agendamento'}</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="responsavel_id">Responsável:</label>
                                        <select
                                            className="form-control"
                                            id="responsavel_id"
                                            name="responsavel_id"
                                            value={formData.responsavel_id}
                                            onChange={handleSelectChange}
                                            required
                                        >
                                            <option value={0}>Selecione um Responsável</option>
                                            {responsaveis.map((responsavel) => (
                                                <option key={responsavel.id} value={responsavel.id}>
                                                    {responsavel.nome}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="profissional_saude_id">Profissional de Saúde:</label>
                                        <select
                                            className="form-control"
                                            id="profissional_saude_id"
                                            name="profissional_saude_id"
                                            value={formData.profissional_saude_id}
                                            onChange={handleSelectChange}
                                            required
                                        >
                                            <option value={0}>Selecione um Profissional</option>
                                            {profissionais.map((profissional) => (
                                                <option key={profissional.id} value={profissional.id}>
                                                    {profissional.nome}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="idoso_id">Idoso:</label>
                                        <select
                                            className="form-control"
                                            id="idoso_id"
                                            name="idoso_id"
                                            value={formData.idoso_id}
                                            onChange={handleSelectChange}
                                            required
                                        >
                                            <option value={0}>Selecione um Idoso</option>
                                            {idosos.map((idoso) => (
                                                <option key={idoso.id} value={idoso.id}>
                                                    {idoso.nome}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="data_hora">Data:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="data_hora"
                                            name="data_hora"
                                            value={formData.data_hora}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status">Status:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="status"
                                            name="status"
                                            value={formData.status}
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

export default AgendamentoPage;

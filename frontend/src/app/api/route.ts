// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

export const getIdosos = async () => {
  try {
    const response = await axios.get(`${API_URL}/idosos`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar Idosos:', error);
    throw error;
  }
};

export const getVacinas = async () => {
  try {
    const response = await axios.get(`${API_URL}/vacinas`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar Vacinas:', error);
    throw error;
  }
};

// Funções de POST
export const createVacina = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/vacinas`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar Vacina:', error);
    throw error;
  }
};

// Funções de PUT
export const updateVacina = async (id: string, data: any) => {
    try {
      const response = await axios.put(`${API_URL}/vacinas/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar Vacina:', error);
      throw error;
    }
  };

// Funções de DELETE
export const deleteVacina = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/vacinas/${id}`);
  } catch (error) {
    console.error('Erro ao deletar Vacina:', error);
    throw error;
  }
};

export const getResponsaveis = async () => {
    try {
      const response = await axios.get(`${API_URL}/responsavels`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar Responsáveis:', error);
      throw error;
    }
  };
  
  export const getResponsavel = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/responsavels/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar Responsável com ID ${id}:`, error);
      throw error;
    }
  };
  
  export const createResponsavel = async (responsavelData: any) => {
    try {
      const response = await axios.post(`${API_URL}/responsavels`, responsavelData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar Responsável:', error);
      throw error;
    }
  };
  
  export const updateResponsavel = async (id: number, responsavelData: any) => {
    try {
      const response = await axios.put(`${API_URL}/responsavels/${id}`, responsavelData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar Responsável com ID ${id}:`, error);
      throw error;
    }
  };

  export const deleteResponsavel = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/responsavels/${id}`);
    } catch (error) {
      console.error('Erro ao deletar Responsável:', error);
      throw error;
    }
  };
  
  export const getIdoso = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/idosos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar Idosos com ID ${id}:`, error);
      throw error;
    }
  };
  
  export const createIdoso = async (idosoData: any) => {
    try {
      const response = await axios.post(`${API_URL}/idosos`, idosoData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar Idoso:', error);
      throw error;
    }
  };
  
  export const updateIdoso = async (id: number, idosoData: any) => {
    try {
      const response = await axios.put(`${API_URL}/idosos/${id}`, idosoData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar Idoso com ID ${id}:`, error);
      throw error;
    }
  };

  export const deleteIdoso = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/idosos/${id}`);
    } catch (error) {
      console.error('Erro ao deletar Idosos:', error);
      throw error;
    }
  };

  export const getAgendamentos = async () => {
    try {
      const response = await axios.get(`${API_URL}/agendamentos`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar Agendamentos:', error);
      throw error;
    }
  };
  
  export const createAgendamento = async (agendamentoData: any) => {
    try {
      const response = await axios.post(`${API_URL}/agendamentos`, agendamentoData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar Agendamento:', error);
      throw error;
    }
  };
  
  export const updateAgendamento = async (id: number, agendamentoData: any) => {
    try {
      const response = await axios.put(`${API_URL}/agendamentos/${id}`, agendamentoData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar Agendamento com ID ${id}:`, error);
      throw error;
    }
  };

  export const deleteAgendamento = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/agendamentos/${id}`);
    } catch (error) {
      console.error('Erro ao deletar Agendamento:', error);
      throw error;
    }
  };

  export const getProfissionais = async () => {
    try {
      const response = await axios.get(`${API_URL}/profissionais`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar Profissionais:', error);
      throw error;
    }
  };

  export const getProfissional = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/profissionais/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar Profissionais com ID ${id}:`, error);
      throw error;
    }
  };
// Defina outras funções para outros endpoints da API (responsáveis, idosos, profissionais, agendamentos, etc.)

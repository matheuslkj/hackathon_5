// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

export const getIdosos = async () => {
  try {
    const response = await axios.get(`${API_URL}/idosos`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar idosos:', error);
    throw error;
  }
};

export const getVacinas = async () => {
  try {
    const response = await axios.get(`${API_URL}/vacinas`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar vacinas:', error);
    throw error;
  }
};

// Funções de POST
export const createVacina = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/vacinas`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar vacina:', error);
    throw error;
  }
};

// Funções de PUT
export const updateVacina = async (id: string, data: any) => {
    try {
      const response = await axios.put(`${API_URL}/vacinas/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar vacina:', error);
      throw error;
    }
  };

// Funções de DELETE
export const deleteVacina = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/vacinas/${id}`);
  } catch (error) {
    console.error('Erro ao deletar vacina:', error);
    throw error;
  }
};

export const getResponsaveis = async () => {
    try {
      const response = await axios.get(`${API_URL}/responsavels`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar responsáveis:', error);
      throw error;
    }
  };
  
  export const getResponsavel = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/responsavels/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar responsável com ID ${id}:`, error);
      throw error;
    }
  };
  
  export const createResponsavel = async (responsavelData: any) => {
    try {
      const response = await axios.post(`${API_URL}/responsavels`, responsavelData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar responsável:', error);
      throw error;
    }
  };
  
  export const updateResponsavel = async (id: number, responsavelData: any) => {
    try {
      const response = await axios.put(`${API_URL}/responsavels/${id}`, responsavelData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar responsável com ID ${id}:`, error);
      throw error;
    }
  };

  export const deleteResponsavel = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/responsavels/${id}`);
    } catch (error) {
      console.error('Erro ao deletar responsavels:', error);
      throw error;
    }
  };
  
  export const getIdoso = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/idosos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar idosos com ID ${id}:`, error);
      throw error;
    }
  };
  
  export const createIdoso = async (idosoData: any) => {
    try {
      const response = await axios.post(`${API_URL}/idosos`, idosoData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar idoso:', error);
      throw error;
    }
  };
  
  export const updateIdoso = async (id: number, idosoData: any) => {
    try {
      const response = await axios.put(`${API_URL}/idosos/${id}`, idosoData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar idoso com ID ${id}:`, error);
      throw error;
    }
  };

  export const deleteIdoso = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/idosos/${id}`);
    } catch (error) {
      console.error('Erro ao deletar idosos:', error);
      throw error;
    }
  };
// Defina outras funções para outros endpoints da API (responsáveis, idosos, profissionais, agendamentos, etc.)

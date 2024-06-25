// src/utils/auth.ts
import { parseCookies } from 'nookies';
import { destroyCookie } from 'nookies';
import {jwtDecode} from 'jwt-decode';

export const isAuthenticated = () => {
  const cookies = parseCookies();
  return !!cookies['vacithon.token'];
};
export const logout = () => {
    localStorage.clear();
    destroyCookie(null, 'vacithon.token');
    // Adicione aqui qualquer outra limpeza necessária (ex.: state global, localStorage, etc.)
  };

  export const verificaTokenExpirado = (token: string | undefined): boolean => {
    if (token) {
      try {
        const decodedToken: { exp?: number } = jwtDecode(token);
  
        if (decodedToken && decodedToken.exp) {
          // Obtenha o timestamp atual em segundos
          const currentTime = Math.floor(Date.now() / 1000);
  
          // Verifique se o token expirou comparando com o timestamp atual
          return decodedToken.exp < currentTime;
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return true; // Em caso de erro, considere o token como expirado por segurança
      }
    }
  
    // Se não houver token ou se houver problemas ao decodificá-lo, considere como expirado
    return true;
  };
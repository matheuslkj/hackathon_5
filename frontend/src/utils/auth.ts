// src/utils/auth.ts
import { parseCookies, destroyCookie } from 'nookies';
import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => {
  const cookies = parseCookies();
  return !!cookies['vacithon.token'];
};

export const logout = () => {
  localStorage.clear();
  destroyCookie(null, 'vacithon.token');
};

export const verificaTokenExpirado = (token: string | undefined) => {
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);

      if (decodedToken && decodedToken.exp) {
        return decodedToken.exp < new Date().getTime() / 1000;
      }
      return false;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return false;
    }
  }
  return true;
};

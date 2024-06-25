"use client"
import { useRouter } from 'next/router';
import { logout } from '@/utils/auth';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
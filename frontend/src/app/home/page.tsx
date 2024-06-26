"use client"
import { Menu } from "@/components/Menu";
import { isAuthenticated, verificaTokenExpirado } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect } from "react";

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        const token = parseCookies()['vacithon.token'];
        console.log('Token:', token);
    
        const authenticated = isAuthenticated();
        console.log('Is Authenticated:', authenticated);
    
        const isExpired = verificaTokenExpirado(token);
        console.log('Is Token Expired:', isExpired);

    if (!isAuthenticated || isExpired) {
        console.log('Redirecting to login...');
        router.push('/login');
      }
    }, [router]);

    return(
        <>
        <Menu  />
        </>
    )
}

export default Home
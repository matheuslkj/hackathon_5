"use client"
import { Menu } from "@/components/Menu";
import { isAuthenticated, verificaTokenExpirado } from "@/utils/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import style from "./style.module.css"

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
            <div className={style.divBanner}>
                <Image
                    className={style.imagem} src="/images/banner.jpg" alt={'Banner'} width={1159} height={500} 
                />
            </div>
            <div>
                <h3 className={style.titulo}>Bem-Vindo o painel de controle do Vacithon</h3>
            </div>
        </>
    )
}

export default Home
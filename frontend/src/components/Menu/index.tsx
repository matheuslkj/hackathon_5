// src/components/Menu/index.tsx
"use client";
import style from "./style.module.css";
import Link from "next/link";
import { BsPersonHeart } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { IoMdPerson } from "react-icons/io";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { TbVaccine } from "react-icons/tb";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/auth";
import { useEffect } from "react";

export const Menu = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      logout();
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <body className={style.body}>
      <nav className={style.nav}>
        <div className={style.divPrincipal}>
          <div className={style.divLogo}>
            <Image
              className={style.image}
              src="/images/logo.png"
              alt={"Logo"}
              width={180}
              height={180}
            />
            <p>
              <span>Cargo</span>
            </p>
          </div>
          <ul className={style.ul}>
            <li>
              <Link href="/vacinas">
                <TbVaccine className={style.icone} />
                <span>Vacina</span>
              </Link>
            </li>
            <li>
              <Link href="/idosos">
                <IoMdPerson className={style.icone} />
                <span>Idoso</span>
              </Link>
            </li>
            <li>
              <Link href="/responsavels">
                <BsPersonHeart className={style.icone} />
                <span>Responsável</span>
              </Link>
            </li>
            <li>
              <Link href="/agendamentos">
                <RiCalendarScheduleFill className={style.icone} />
                <span>Agendamento</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={style.divBotao}>
          <button className={style.botaoLogout} onClick={handleLogout}>
            <GoSignOut />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </body>
  );
};

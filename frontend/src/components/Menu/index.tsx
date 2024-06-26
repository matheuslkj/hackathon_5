// src/components/Menu/index.tsx
"use client";
import style from "./style.module.css";
import Link from "next/link";
import { BsPersonHeart } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { IoMdPerson } from "react-icons/io";
import { RiCalendarScheduleFill, RiHospitalFill } from "react-icons/ri";
import { TbVaccine } from "react-icons/tb";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/auth";

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
          </div>
          <ul className={style.ul}>
            <li>
              <Link href="/home">
                <RiHospitalFill className={style.icone}/>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/vacinas">
                <TbVaccine className={style.icone} />
                <span>Vacinas</span>
              </Link>
            </li>
            <li>
              <Link href="/idosos">
                <IoMdPerson className={style.icone} />
                <span>Idosos</span>
              </Link>
            </li>
            <li>
              <Link href="/responsavels">
                <BsPersonHeart className={style.icone} />
                <span>Responsáveis</span>
              </Link>
            </li>
            <li>
              <Link href="/agendamentos">
                <RiCalendarScheduleFill className={style.icone} />
                <span>Agendamentos</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={style.divBotao}>
          <button className={style.botaoLougout} onClick={handleLogout}>
            <GoSignOut /> 
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </body>
  );
};

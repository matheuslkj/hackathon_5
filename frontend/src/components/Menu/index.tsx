import style from './style.module.css'
import { BsPersonHeart } from "react-icons/bs"
import { GoSignOut } from "react-icons/go"
import { IoMdPerson } from "react-icons/io"
import { RiCalendarScheduleFill } from "react-icons/ri"
import { TbVaccine } from "react-icons/tb"
import Image from 'next/image'

export const Menu = () => {
    return(
        <>
        <body className={style.body}>
            <nav className={style.nav}>
                <div className={style.divPrincipal}>
                    <div className={style.divLogo}>
                        <Image className={style.image} src="/images/logo.png" alt={'Logo'} width={150} height={150}/>
                        <p>
                            <span>
                                Cargo
                            </span>
                        </p>
                    </div>
                    <ul className={style.ul}>
                        <li>
                            <a href="#">
                                <TbVaccine className={style.icone}/>
                                <span>
                                    Vacina
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <IoMdPerson className={style.icone}/>
                                <span>
                                    Idoso
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <BsPersonHeart className={style.icone}/>
                                <span>
                                    Responsável
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <RiCalendarScheduleFill className={style.icone}/>
                                <span>
                                    Agendamento
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={style.divBotao}>
                    <button className={style.botaoLougout}>
                        <GoSignOut />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>
        </body>
        </>
    )
}
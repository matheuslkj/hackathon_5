"use client"
import { useRouter } from 'next/navigation'
import styles from './style.module.css'
import Image from 'next/image'
import { SyntheticEvent, useCallback, useRef, useState } from 'react'
import axios from 'axios'
import { setCookie } from 'nookies'
import { Loading } from '@/components/Loading'
import { Toast } from '@/components/Toast'
import InputMask from 'react-input-mask'
import Link from 'next/link'

export default function RegisterProfissional() {
    const router = useRouter()
    const refForm = useRef<HTMLFormElement>(null);
    const cpfInputRef = useRef<InputMask>(null);
    const [toast, setToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null);

    const submitForm = useCallback((e: SyntheticEvent) => {
        e.preventDefault();

        if (refForm.current && refForm.current?.checkValidity()) {
            setLoading(true)
            const target = e.target as typeof e.target & {
                nome: { value: string },
                cpf: { value: string },
                especialidade: { value: string },
                telefone: { value: string },
                email: { value: string },
                senha: { value: string },
            }

            const nome = target.nome.value;
            const cpf = target.cpf.value.replace(/[^\d]/g, '');
            const especialidade = target.especialidade.value;
            const telefone = target.telefone.value;
            const email = target.email.value;
            const senha = target.senha.value;

            console.log('Enviando dados:', { nome, cpf, especialidade, telefone, email, senha });

            axios.post('http://127.0.0.1:8000/api/v1/profissionais',
                {
                    nome,
                    cpf,
                    especialidade,
                    telefone,
                    email,
                    senha
                }
            ).then((resposta) => {
                console.log('Resposta da API :', resposta.data);

                if (resposta.data && resposta.data.id) {
                    setCookie(
                        undefined,
                        'vacithon.token',
                        resposta.data.token,
                        { path: '/' }
                    )
                    setToastMessage('Cadastro realizado com sucesso!');
                    setToast(true);
                    setTimeout(() => {
                        router.push('/login');
                    }, 2000); // Redireciona após 2 segundos
                } else {
                    setToastMessage('Dados Inválidos');
                    setToast(true)
                }
                setLoading(false)
            }).catch((err) => {
                console.log('Erro da Requisição: ', err)

                if (err.response && err.response.status === 422) {
                    setApiError('Verifique seus dados e tente novamente.');
                } else {
                    setApiError('Ocorreu um erro ao processar sua requisição. Por favor, tente novamente mais tarde.');
                }

                setToast(true)
                setLoading(false)
            })
        } else {
            if (refForm.current) {
                refForm.current.classList.add('was-validated')
            }
        }
    }, [router])

    return (
        <>
            <Loading loading={loading} />
            <Toast
                show={toast}
                message={apiError || toastMessage}
                colors={apiError ? 'danger' : 'success'}
                onClose={() => { setToast(false); setApiError(null) }}
            />
            <section className={styles.secao}>
                <div className={styles.div1}>
                    <div className={styles.div2}>
                        <div className={styles.div3}>
                            <span className={styles.span}>
                                <Image className={styles.imagem} src="/images/cadeado.png" alt={'Cadeado'} width={80} height={100} />
                            </span>
                            <h2>Cadastre-se</h2>
                            <div className={styles.divForm}>
                                <form
                                    noValidate
                                    onSubmit={submitForm}
                                    ref={refForm}
                                >
                                    <div>
                                        <label>Nome*</label>
                                        <input type="text" placeholder="Digite seu Nome" name="nome"
                                            className={styles.input} required />
                                    </div>
                                    <div>
                                        <label>CPF*</label>
                                        <InputMask mask="999.999.999-99" type="text" placeholder="Digite seu CPF"
                                            name="cpf" className={styles.input} required ref={cpfInputRef}
                                        />
                                    </div>
                                    <div>
                                        <label>Especialidade*</label>
                                        <input type="text" placeholder="Digite sua Especialidade" name="especialidade"
                                            className={styles.input} required />
                                    </div>
                                    <div>
                                        <label>Telefone*</label>
                                        <InputMask mask="(99) 99999-9999" type="text" placeholder="Digite seu Telefone"
                                            name="telefone" className={styles.input} required />
                                    </div>
                                    <div>
                                        <label>Email*</label>
                                        <input type="email" placeholder="Digite seu Email" name="email"
                                            className={styles.input} required />
                                    </div>
                                    <div>
                                        <label>Senha*</label>
                                        <input type="password" placeholder="Digite sua Senha" name="senha"
                                            className={styles.input} required />
                                    </div>
                                    <button type='submit'>Cadastrar</button>
                                </form>
                            </div>
                            <Link href="/login" legacyBehavior>
                                <a className={styles.opcao}>Já tem uma conta? Faça login</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

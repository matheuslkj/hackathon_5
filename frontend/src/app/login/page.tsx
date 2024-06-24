"use client"
import { useRouter } from 'next/navigation'
import styles from './style.module.css'
import Image from 'next/image'
import { SyntheticEvent, useCallback, useRef, useState } from 'react'
import axios from 'axios'
import { setCookie } from 'nookies'
import { Loading } from '@/components/Loading'
import { Toast } from '@/components/Toast'
import InputMask, { InputState, Props as InputMaskProps } from 'react-input-mask'

export default function Login() {

    const router = useRouter()
    const refForm = useRef<HTMLFormElement>(null);
    const cpfInputRef = useRef<InputMask>(null);
    const [toast, setToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null); // Estado para armazenar erros da API

    
    const submitForm = useCallback((e: SyntheticEvent) => {
        e.preventDefault();

        if (refForm.current && refForm.current?.checkValidity()) {
            setLoading(true)
            const target = e.target as typeof e.target & {
                cpf: { value: string },
                senha: { value: string },
            }

            const cpf = target.cpf.value.replace(/[^\d]/g, '');
            const senha = target.senha.value;

            console.log('Enviando dados:', { cpf, senha });

            axios.post('http://127.0.0.1:8000/api/v1/profissionais',
                {
                    cpf: cpf,
                    senha: senha
                }
            ).then((resposta) => {
                console.log('Resposta da API :', resposta.data);

                if (resposta.data && resposta.data.token) {
                    setCookie(
                        undefined,
                        'vacithon.token',
                        resposta.data.token,
                        { path: '/' }
                    )
                    router.push('/home')
                } else {
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


    return(
        <>
        <Loading loading={loading} />
        <Toast
            show={toast}
            message={apiError || 'Dados Inválidos'}
            colors='danger'
            onClose={() => {setToast(false); setApiError(null)}}
        />
        <section className={styles.secao}>
            <div className={styles.div1}>
                <div className={styles.div2}>
                    <div className={styles.div3}>
                        <span className={styles.span}>
                            <Image className={styles.imagem} src="/images/cadeado.png" alt={'Cadeado'} width={80} height={100}/>
                        </span>
                        <h2>Faça seu Login</h2>
                        <div className={styles.divForm}>
                            <form
                                noValidate
                                onSubmit={submitForm}
                                ref={refForm}
                            >
                                <div>
                                    <label>CPF*</label>
                                    <InputMask mask="999.999.999-99" type="text" placeholder="Digite seu CPF"
                                            name="cpf" className={styles.input} required ref={cpfInputRef}
                                        />
                                </div>
                                <div>
                                    <label>Senha*</label>
                                    <input type="password" placeholder="Digite sua Senha" name="senha" 
                                    className={styles.input} required />
                                </div>
                                <button type='submit'>Login</button>
                            </form>
                        </div>
                        <a href="#" className={styles.opcao}>Não tem uma conta? Cadastre-se</a>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

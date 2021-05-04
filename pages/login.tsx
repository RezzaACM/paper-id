import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Style from '../styles/Login.module.css';
import Link from 'next/link'
import { useFormik } from 'formik';
import { LoginValidation } from '../src/helper/LoginValidation';
import axios from 'axios';


export interface ILogin {
    username: string,
    password: string
}

export const LoginValue: ILogin = {
    username: "",
    password: ""
}



const Login: React.FunctionComponent = () => {
    const [isLoading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const router = useRouter()

    const {
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        handleBlur,
    } = useFormik({
        initialValues: LoginValue,
        validationSchema: LoginValidation,
        onSubmit: async (val) => {
            setIsDisabled(true);
            setLoading(true)
            const data = {
                username: val.username,
                password: val.password
            }

            axios.post('https://development.paper.id:3500/test-case/api/v1/login', data)
                .then(res => {
                    const data = {
                        ...res.data,
                        username: val.username
                    };
                    const dataToString = JSON.stringify(data)
                    localStorage.setItem('_token', dataToString)
                    router.push('/')
                })
                .catch(err => {
                    console.log(err);
                })
        }
    })

    useEffect(()=>{
        if(localStorage.getItem('_token')){
            router.push('/')
        }
    },[router])

    return (
        <div className={Style.root}>
            <div className={Style.logoPaper}>
                <img src="/paperlogowhite.svg" alt="logo-paper.id" />
            </div>

            <div className={Style.loginRow}>
                <div className={Style.headlineText}>
                    <h1 className="text-center">Masuk ke Paper.id <img src="/Tutorial.svg" alt="" /></h1>
                    <div className={Style.underline}></div>
                </div>

                <div className={Style.tagline}>
                    <p>Masuk dengan akun yang terdaftar di Paper.id/PayPer</p>
                </div>

                <div className={Style.loginForm}>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-4">
                            <div className="col-12">
                                <div className={Style.inputIconWrap}>
                                    <span className={Style.inputIcon}>
                                        <img src="/icon_account_white.svg" alt="" />
                                    </span>
                                    <input
                                        placeholder="Username"
                                        type="text"
                                        className={`${Style.inputWithIcon} ${errors.username && touched.username ? 'is-invalid-2' : ''}`}
                                        id="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="username"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-12">
                                <div className={Style.inputIconWrap}>
                                    <span className={Style.inputIcon}>
                                        <img src="/icon_lock_white.svg" alt="" />
                                    </span>
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        id="password"
                                        className={`${Style.inputWithIcon} ${errors.password && touched.password ? 'is-invalid-2' : ''}`}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-12">
                                <Link href="/forget-password">
                                    <a className={`d-flex justify-content-end ${Style.forgetPass}`}>
                                        Lupa Kata Sandi?
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button
                                    type="submit"
                                    className={Style.confirmButton}>
                                    Masuk
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default Login;
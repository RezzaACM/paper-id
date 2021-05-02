import React, { useState } from 'react';
import Style from '../styles/Login.module.css';
import Link from 'next/link'
import { useFormik } from 'formik';
import { LoginValidation } from '../src/helper/LoginValidation';

export interface ILogin {
    email: string,
    password: string
}

export const LoginValue: ILogin = {
    email: "",
    password: ""
}



const Login: React.FunctionComponent = () => {
    const [isLoading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    // const router = useRouter()

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
                email: val.email,
                password: val.password
            }

            console.log(data);
        }
    })

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
                                        placeholder="Email"
                                        type="email"
                                        className={`${Style.inputWithIcon} ${errors.email && touched.email ? 'is-invalid-2' : ''}`}
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="email"
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

function useRouter() {
    throw new Error('Function not implemented.');
}

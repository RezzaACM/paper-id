import React, { useEffect } from 'react';
import Style from './Layout.module.css';
import Link from 'next/link';
import Navbar from './Navbar';
import { useRouter } from 'next/router'

interface ILayout {
    children?: any
}

const Layout: React.FunctionComponent<ILayout> = ({ children }) => {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('_token');
        if (!token) {
            router.push('/login');
        }
    })

    return (
        <div className={Style.wrapper}>
            <div className={Style.sidebar}>
                <div className={Style.sidebarContent}>
                    <div className={Style.logoSidebar}>
                        <img src="/paperlogowhite.svg" alt="" />
                    </div>

                    <div className={Style.sidebarMenu}>
                        <Link href="/">
                            <a className={Style.menu}>
                                <img src="/dashboard.svg" alt="" />
                                <span>Dashboard</span>
                            </a>
                        </Link>
                        <Link href="/finance/account">
                            <a className={Style.menu}>
                                <img src="/finance.svg" alt="" />
                                <span>Finance</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={Style.main}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
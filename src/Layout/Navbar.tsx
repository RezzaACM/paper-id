import React, { useEffect, useState } from 'react';
import styles from './Layout.module.css';
import { useRouter } from 'next/router'
import moment from 'moment';

interface INavbar {
    header?: string
}

const Navbar: React.FunctionComponent<INavbar> = ({ header }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState({
        username: '',
        name: "",
        last_login: ""
    })
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('_token'));
        setData({
            username: user?.username,
            name: user?.name,
            last_login: user?.last_login
        })
    }, [])

    const logout = () => {
        localStorage.removeItem('_token');
        router.push('/login')
    }

    return (
        <div className={`d-flex align-items-center ${header ? 'justify-content-between' : 'justify-content-end'}`}>
            <h1>{header ? header : ''}</h1>
            <div
                onClick={() => setOpen(prevState => !prevState)}
                className={styles.profile}>
                <img src="/users.svg" alt="" />
                <span>Profile</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
                <div className={`${styles.boxProfile} ${open ? 'show' : 'hide'}`}>
                    <div className="row mb-3">
                        <span className={styles.labelProfile}>
                            Username
                                 </span>
                        <span className={styles.valueProfile}>
                            {data.username}
                        </span>
                    </div>
                    <div className="row mb-3">
                        <span className={styles.labelProfile}>
                            Name
                        </span>
                        <span className={styles.valueProfile}>
                            {data.name}
                        </span>
                    </div>
                    <div className="row mb-2">
                        <span className={styles.labelProfile}>
                            Last Login
                                </span>
                        <span className={styles.valueProfile}>
                            {moment(data.last_login).format('LLL')}
                        </span>
                    </div>
                    <div className="row">
                        <span className={styles.labelProfile} onClick={logout}>
                            Logout
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
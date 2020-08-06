import React from 'react';
import Link from 'next/link';
import Logout from './Logout';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <nav className={styles.container}>
            <div className={styles.navigation}>
                <Link
                    href="/"
                    as="/"
                    shallow={true}
                >
                    <a href="/" className="text-dark">
                        Home
                    </a>
                </Link>
            </div>
            <h1>
                Simple Web App
            </h1>
            <div className={styles.logout}>
                <Logout/>
            </div>
        </nav>
    )
};

export default Header;
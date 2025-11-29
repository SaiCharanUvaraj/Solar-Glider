import React, { useEffect } from 'react'
import styles from "./SignIn.module.css"

const SignIn = () => {
    useEffect(() => {
        document.body.style.backgroundImage = 'url("/src/assets/bgImage.jpg")';
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        return () => {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundSize = "";
            document.body.style.backgroundRepeat = "";
            document.body.style.backgroundAttachment = "";
        };
    }, []);
    return (
        <div className={styles.signinContainer}>
            <div className={styles.signinBox}>
                <p className={styles.heading}>Sign In</p>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button>Login</button>
            </div>
        </div>
    )
}

export default SignIn
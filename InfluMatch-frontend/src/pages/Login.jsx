import React,{useState} from 'react';
import styles from "../Css files/Login.module.css";
import {Link} from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e)=>{
        const{name,value}=e.target;
        setFormData((prev)=>({
            ...prev,[name]:value
        }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        if (!formData.email || !formData.password) {
          alert("⚠️ Please fill all fields before continuing!");
          return;
        }
    }
    return (
        <main className={styles.container}>
            {/*left section*/}
            <section className={styles.left}>
                <div className={styles.leftContent}>
                    <p className={styles.welcome}>Welcome to</p>
                    <div className={styles.titleWrap}>
                        <h1 className={styles.title}>InfluMatch</h1>
                        <div className={styles.titleDecor} aria-hidden="true">
                           
                            <span className={`${styles.emoji} ${styles.floatY}`}>
                                🤩
                            </span>
                            <span className={`${styles.emoji} ${styles.floatY2}`}>
                                🚀
                            </span>
                            <span className={`${styles.emoji} ${styles.floatY3}`}>
                                ⭐
                            </span>
                            <span className={`${styles.emoji} ${styles.floatY4}`}>
                                🎯
                            </span>
                            <span className={`${styles.emoji} ${styles.floatY2}`}>
                                🔥
                            </span>
                            <span className={`${styles.emoji} ${styles.floatY}`}>
                                🎨
                            </span>
                            <span className={`${styles.emoji} ${styles.floatY3}`}>
                                💡
                            </span>
                            <span className={`${styles.emoji} ${styles.floatY2}`}>
                                😄
                            </span>
                            <span className={`${styles.emoji} ${styles.floatY4}`}>
                                📱
                            </span>
                            <span className={`${styles.emoji} ${styles.floatY}`}>
                                ⚡
                            </span>
                            <div className={`${styles.shape} ${styles.circle} ${styles.delay1}`} />
                            <div className={`${styles.shape} ${styles.square} ${styles.delay2}`} />
                            <div className={`${styles.shape} ${styles.circleSm} ${styles.delay3}`} />
                            <div className={`${styles.shape} ${styles.squareTilt} ${styles.delay4}`} />
                            <div className={`${styles.shape} ${styles.circleXs} ${styles.delay5}`} />
                        </div>
                    </div>
                    <div className={styles.bottomTexts}>
                        <h4 className={styles.subtitle}>Connect.Collaborate.Grow</h4>
                        <p className={styles.desc}>Build partnerships that drive growth</p>
                    </div>
                </div>
                <div className={styles.glow} aria-hidden="true" />
            </section>
            {/*right section*/}
            <section className={styles.right}>
                <div className={styles.card}>
                    <h2 className={styles.formTitle}>Welcome!</h2>
                    <p className={styles.formSubtitle}>Log in to continue your journey</p>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label>Email Id</label>
                        <input className={styles.input} type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your username" />
                        <label>Password</label>
                        <input className={styles.input} type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
                        <button type="submit" className={styles.signInBtn}>Log In</button>
                    </form>
                    <p className={styles.signUpText}>
                      Don’t have an account? <Link to='/signup'><a href="#">Sign Up</a></Link>
                    </p>
                </div>
            </section>
        </main>
    );
}

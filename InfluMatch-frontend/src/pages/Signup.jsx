import React,{useState} from 'react';
import styles from "../Css files/Signup.module.css";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange=(e)=>{
        const {name, value} =e.target;
        setFormData((prev) =>({
            ...prev,[name]:value
        }));
    };

    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();

        if (!formData.email || !formData.password) {
          alert("⚠️ Please fill all fields before continuing!");
          return;
        }
        console.log("Signup successful:", formData, accountType);
      
        navigate("/questions");
    };

    const [accountType, setAccountType] = useState(null);
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
                {!accountType?(

                <div className={styles.card}>
                    <h2>Get Started</h2>
                    <p>Choose your account type to start your journey</p>
                    <div className={styles.buttons}>
                        <button className={styles.brandBtn}
                        onClick={()=>setAccountType("brand")}>
                            <span aria-hidden>🏢</span>
                            <span className={styles.btnContent}>
                                <span className={styles.btnTitle}>I’m a Brand</span>
                                <span className={styles.smallText}>Looking for talented creators</span>
                            </span>
                        </button>
                        <button className={styles.creatorBtn}
                        onClick={()=>setAccountType("creator")}>
                            <span aria-hidden>🎨</span>
                            <span className={styles.btnContent}>
                                <span className={styles.btnTitle}>I’m a Creator</span>
                                <span className={styles.smallText}>Ready to collaborate and grow</span>
                            </span>
                        </button>
                    </div>
                    <div className={styles.benefits}>
                        <p>Find the right match for your goals</p>
                        <p>Easy collaboration process</p>
                        <p>Grow together with insights</p>
                    </div>
                </div>
                ):(
                <div className={styles.card}>
                    <div className={styles.headerRow}>
                        <button className={styles.backBtn} onClick={()=>setAccountType(null)}>
                            ← Back
                        </button>
                        <div className={styles.accountBadge}>
                            <span aria-hidden>
                                {accountType === "brand" ? "🏢" : "🎨"}
                            </span>
                            <span>{accountType === "brand" ? "Brand" : "Creator"} Account</span>
                        </div>
                    </div>
                    <h2 className={styles.formTitle}>Welcome!</h2>
                    <p className={styles.formSubtitle}>Sign up to start your journey</p>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label>Email Id</label>
                        <input className={styles.input} type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email id" />
                        <label>Password</label>
                        <input className={styles.input} type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
                        <button type="submit" className={styles.signInBtn}>Sign Up</button>
                    </form>
                    <p className={styles.signUpText}>
                        Already have an account? <Link to='/login'><a href="#">Log in</a></Link>
                    </p>
                </div>
                )}
            </section>
        </main>
    );
}

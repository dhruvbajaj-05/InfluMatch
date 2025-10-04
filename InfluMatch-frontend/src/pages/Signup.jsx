import React, { useState } from 'react';
import styles from "../Css files/Signup.module.css";
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [accountType, setAccountType] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("⚠️ Please fill all fields before continuing!");
      return;
    }

    try {
      // only sending signup request if user chose BRAND
      if (accountType === "brand") {
        const res = await fetch("http://localhost:5000/api/brand-auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        const data = await res.json();
        if (!res.ok) {
          alert(data.msg || "Signup failed");
          return;
        }

        console.log("✅ Signup successful:", data);
        // redirect brand to questionnaire
        navigate("/questions");
      } else if (accountType === "creator") {
        alert("Creator signup flow not yet implemented!");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <main className={styles.container}>
      {/* Left section */}
      <section className={styles.left}>
        <div className={styles.leftContent}>
          <p className={styles.welcome}>Welcome to</p>
          <div className={styles.titleWrap}>
            <h1 className={styles.title}>InfluMatch</h1>
            <div className={styles.titleDecor} aria-hidden="true">
              <span className={`${styles.emoji} ${styles.floatY}`}>🤩</span>
              <span className={`${styles.emoji} ${styles.floatY2}`}>🚀</span>
              <span className={`${styles.emoji} ${styles.floatY3}`}>⭐</span>
              <span className={`${styles.emoji} ${styles.floatY4}`}>🎯</span>
              <span className={`${styles.emoji} ${styles.floatY2}`}>🔥</span>
              <span className={`${styles.emoji} ${styles.floatY}`}>🎨</span>
              <span className={`${styles.emoji} ${styles.floatY3}`}>💡</span>
              <span className={`${styles.emoji} ${styles.floatY2}`}>😄</span>
              <span className={`${styles.emoji} ${styles.floatY4}`}>📱</span>
              <span className={`${styles.emoji} ${styles.floatY}`}>⚡</span>
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

      {/* Right section */}
      <section className={styles.right}>
        {!accountType ? (
          <div className={styles.card}>
            <h2>Get Started</h2>
            <p>Choose your account type to start your journey</p>
            <div className={styles.buttons}>
              <button
                className={styles.brandBtn}
                onClick={() => setAccountType("brand")}
              >
                <span aria-hidden>🏢</span>
                <span className={styles.btnContent}>
                  <span className={styles.btnTitle}>I’m a Brand</span>
                  <span className={styles.smallText}>
                    Looking for talented creators
                  </span>
                </span>
              </button>
              <button
                className={styles.creatorBtn}
                onClick={() => setAccountType("creator")}
              >
                <span aria-hidden>🎨</span>
                <span className={styles.btnContent}>
                  <span className={styles.btnTitle}>I’m a Creator</span>
                  <span className={styles.smallText}>
                    Ready to collaborate and grow
                  </span>
                </span>
              </button>
            </div>
            <div className={styles.benefits}>
              <p>Find the right match for your goals</p>
              <p>Easy collaboration process</p>
              <p>Grow together with insights</p>
            </div>
          </div>
        ) : (
          <div className={styles.card}>
            <div className={styles.headerRow}>
              <button className={styles.backBtn} onClick={() => setAccountType(null)}>
                ← Back
              </button>
              <div className={styles.accountBadge}>
                <span aria-hidden>
                  {accountType === "brand" ? "🏢" : "🎨"}
                </span>
                <span>
                  {accountType === "brand" ? "Brand" : "Creator"} Account
                </span>
              </div>
            </div>
            <h2 className={styles.formTitle}>Welcome!</h2>
            <p className={styles.formSubtitle}>Sign up to start your journey</p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label>Email Id</label>
              <input
                className={styles.input}
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email id"
              />
              <label>Password</label>
              <input
                className={styles.input}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <button type="submit" className={styles.signInBtn}>Sign Up</button>
            </form>
            <p className={styles.signUpText}>
              Already have an account? <Link to='/login'>Log in</Link>
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

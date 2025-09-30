import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import pic1 from "../pictures/pic1.jpeg";
import pic2 from "../pictures/pic2.jpg";
import styles from "../Css files/Home.module.css";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [typedText, setTypedText] = useState("");
  //const hasStartedTyping = useRef(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 100;
      const elementPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const typewriterText = "InfluMatch";
    let currentIndex = 0;
    
    setTypedText("");
    
    const typeInterval = setInterval(() => {
      if (currentIndex < typewriterText.length) {
        setTypedText(typewriterText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setShowIntro(false);
          setTimeout(() => {
            setShowMainContent(true);
          }, 300);
        }, 1000);
      }
    }, 150);
    
    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div>
      {showIntro && (
        <div className={styles.introOverlay}>
          <div className={styles.typewriterContainer}>
            <span className={styles.typewriterText}>{typedText}</span>
            <span className={styles.cursor}>|</span>
          </div>
        </div>
      )}

      <div className={`${styles.mainContent} ${showMainContent ? styles.visible : ''}`}>
        <Navbar />

        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Click. Collaborate. Grow</h1>
            <h5 className={styles.heroSubtitle}>Where meaningful connections between brands and creators happen</h5>
            <p className={styles.heroDescription}>
              Join thousands of brands and influencers who trust InfluMatch to create 
              authentic partnerships that drive real results. Our intelligent matching 
              system connects you with the perfect collaborators for your next campaign.
            </p>
          </div>
        </section>

        <section>
          <div id="brands" className={styles.brandDiv}>
            <div className={styles.brandText}>
              <h2>For Brands</h2>
              <p>
                Matching with the right influencers should never feel like swiping
                in the dark. With InfluMatch, we help you not only browse through
                the right profiles but also access a curated network of creators
                who match your goals and niche.
              </p>
              <p>
                Whether you're a niche DTC brand or a startup with the need for
                multiple influencers — we've got you covered. Manage campaigns,
                track ROI, and build long-term relationships that grow with you.
              </p>
              <p>
                Grow your brand with creators who make your product shine. Let's
                build together!
              </p>
            </div>
            <div className={styles.brandImage}>
              <img src={pic1} alt="Brands working with influencers" />
            </div>
          </div>

          <div id="influencers" className={styles.brandDiv}>
            <div className={styles.brandImage}>
              <img src={pic2} alt="Influencers collaborating with brands" />
            </div>
            <div className={styles.brandText}>
              <h2>For Influencers</h2>
              <p>
                Tired of reaching out with a cold DM? On InfluMatch your content
                speaks for itself. Build a profile that showcases what you do best
                and let the right brands come to you.
              </p>
              <p>
                From engagement data to niche tags and brand mentions, we help
                brands understand your value at a glance. Whether you're a
                micro-influencer or just getting started, your story matters here
                and we help you grow along the process.
              </p>
              <p>
                Turn your passion into a professional journey with InfluMatch.
                Let's build together!
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
import styles from './Footer.module.css';

export default function Footer() {
    return(
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h3>InfluMatch</h3>
              <p>
                Connecting brands with the right influencers to create meaningful 
                collaborations that drive growth and engagement. Our platform makes 
                it easy to find, connect, and collaborate with the perfect partners.
              </p>
              <div className={styles.socialIcons}>
                <div className={styles.socialIcon}>📱</div>
                <div className={styles.socialIcon}>📷</div>
                <div className={styles.socialIcon}>🐦</div>
                <div className={styles.socialIcon}>💼</div>
              </div>
            </div>

            <div className={styles.footerSection}>
              <h3>Quick Links</h3>
              <ul className={styles.footerLinks}>
                <li><a href="#">About Us</a></li>
                <li><a href="#">How It Works</a></li>
                <li><a href="#">Success Stories</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div className={styles.footerSection}>
              <h3>Legal</h3>
              <ul className={styles.footerLinks}>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">Data Protection</a></li>
                <li><a href="#">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; 2024 InfluMatch. All rights reserved. | Made with ❤️ for creators and brands</p>
          </div>
        </footer>
    )
}
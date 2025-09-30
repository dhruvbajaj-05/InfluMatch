import styles from './Navbar.module.css';
import { Link, useInRouterContext } from 'react-router-dom';

export default function Navbar() {
  const inRouter = useInRouterContext();
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 100; // Height of the fixed navbar
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>InfluMatch</div>
      <ul className={styles.navLinks}>
        <li><a href="#" onClick={() => scrollToSection('brands')}>Brands</a></li>
        <li><a href="#" onClick={() => scrollToSection('influencers')}>Influencers</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact</a></li>
        <li>
          {inRouter ? (
            <Link to='/login' className={styles.loginLink}>Login</Link>
          ) : (
            <a href='/login' className={styles.loginLink}>Login</a>
          )}
        </li>
        <li>
          {inRouter ? (
            <Link to='/signup' className={styles.signupButton}>Sign Up</Link>
          ) : (
            <a href='/signup' className={styles.signupButton}>Sign Up</a>
          )}
        </li>
      </ul>
    </nav>
  );
}

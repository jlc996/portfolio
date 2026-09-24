// Hero.jsx


// React Router
import { Link } from "react-router-dom";


// Profile image
import profile from "../../assets/profile/profile.png";


// Component styles
import styles from "../../styles/home/Hero.module.css";



// Hero component
function Hero() {


    return (

        <section className={styles.hero}>


            {/* Left Side */}
            <div className={styles.heroContent}>


                <p className={styles.heroGreeting}>
                    Hello, I'm
                </p>


                <h1>
                    Joshua Craven
                </h1>


                <h2>
                    Frontend Developer
                </h2>


                <p>
                    I build responsive, accessible, and modern web applications
                    using HTML, CSS, JavaScript, React, Bootstrap, and REST APIs.
                    I enjoy creating clean user interfaces and interactive user
                    experiences while continually expanding my full stack
                    development skills.
                </p>



                <div className={styles.heroButtons}>


                    <Link
                        to="/projects"
                        className={`${styles.button} ${styles.primaryButton}`}
                    >
                        View My Projects
                    </Link>


                    <Link
                        to="/contact"
                        className={`${styles.button} ${styles.secondaryButton}`}
                    >
                        Contact Me
                    </Link>


                </div>


            </div>



            {/* Right Side */}
            <div className={styles.heroImage}>


                <img
                    src={profile}
                    alt="Joshua Craven"
                />


            </div>


        </section>

    );

}


export default Hero;
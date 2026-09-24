// Home.jsx


// Home sections
import Hero from "../components/home/Hero";
import LiveDemo from "../components/home/LiveDemo";
import TechStack from "../components/home/TechStack";
import Metrics from "../components/home/Metrics";


// Page styles
import styles from "../styles/pages/Home.module.css";



function Home() {


    return (

        <section className={styles.home}>


            {/* Introduction + Profile Picture */}

            <Hero />


            {/* Digital Timekeeper Live Demo */}

            <LiveDemo />


            {/* Technology Stack */}

            <TechStack />


            {/* Portfolio Metrics */}

            <Metrics />


        </section>

    );

}


export default Home;
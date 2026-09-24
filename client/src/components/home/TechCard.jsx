// TechCard.jsx


// Import styles
import styles from "../../styles/home/TechCard.module.css";



function TechCard({ technology }) {


    return (

        <article className={styles.techCard}>

            {technology}

        </article>

    );

}


export default TechCard;
// MetricCard.jsx


// Import styles
import styles from "../../styles/home/MetricCard.module.css";



function MetricCard({ value, label }) {


    return (

        <article className={styles.metricCard}>


            <h3>
                {value}
            </h3>


            <p>
                {label}
            </p>


        </article>

    );

}


export default MetricCard;
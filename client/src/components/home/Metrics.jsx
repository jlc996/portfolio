// Metrics.jsx


// Import reusable component
import MetricCard from "./MetricCard";


// Import styles
import styles from "../../styles/home/Metrics.module.css";


// Import metrics data
import {
    metricsData
} from "../../data/homeData";



function Metrics() {


    return (

        <section className={styles.metrics}>


            {
                metricsData.map((metric) => (

                    <MetricCard

                        key={metric.id}

                        value={metric.value}

                        label={metric.label}

                    />

                ))
            }


        </section>

    );

}


export default Metrics;
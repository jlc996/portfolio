// TechStack.jsx


// Import reusable component
import TechCard from "./TechCard";


// Import styles
import styles from "../../styles/home/TechStack.module.css";


// Import technology data
import {
    techStackData
} from "../../data/homeData";



function TechStack() {


    return (

        <section className={styles.techStack}>


            <h2>
                Core Technologies
            </h2>



            <div className={styles.techGrid}>


                {
                    techStackData.map((technology, index) => (

                        <TechCard

                            key={index}

                            technology={technology}

                        />

                    ))
                }


            </div>


        </section>

    );

}


export default TechStack;
// HighlightSection.jsx


// Import reusable component
import HighlightCard from "./HighlightCard";


// Import highlight data
import {
    highlights
} from "../../data/experienceData";


// Import styles
import styles from "../../styles/experience/HighlightSection.module.css";



// Highlight Section Component
function HighlightSection() {


    return (

        <section className={styles.highlights}>


            {/* Section Heading */}
            <h2>
                Professional Highlights
            </h2>



            <div className={styles.highlightsGrid}>


                {
                    highlights.map((highlight) => (

                        <HighlightCard

                            key={highlight.id}

                            title={highlight.title}

                            text={highlight.description}

                        />

                    ))
                }


            </div>


        </section>

    );

}



export default HighlightSection;
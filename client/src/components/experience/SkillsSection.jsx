// SkillsSection.jsx

// Import reusable component
import SkillCard from "./SkillCard";

// Import skill data
import {
  skillCategories
} from "../../data/experienceData";

// Import styles
import styles from "../../styles/experience/SkillsSection.module.css";


// Skills section component
function SkillsSection() {

  return (

    <section className={styles.skillsSection}>


      {/* Section Heading */}
      <h2>
        Technical Skills
      </h2>



      {/* Skill Cards Grid */}
      <div className={styles.skillsGrid}>


        {
          skillCategories.map((category) => (

            <SkillCard

              key={category.id}

              title={category.title}

              skills={category.skills}

            />

          ))
        }


      </div>


    </section>

  );

}


// Export component
export default SkillsSection;
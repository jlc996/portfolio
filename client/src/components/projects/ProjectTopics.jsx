// ProjectTopics.jsx

// Import component styles
import styles from "../../styles/projects/ProjectTopics.module.css";


// Project Topics component
function ProjectTopics({ topics }) {


  // Do not render anything
  // if the project has no topics
  if (!topics?.length) {

    return null;

  }


  // Render project topics
  return (

    <div className={styles.projectTopics}>

      {topics.map((topic) => (

        <span
          key={topic}
          className={styles.topicBadge}
        >

          {topic}

        </span>

      ))}

    </div>

  );

}


// Export component
export default ProjectTopics;
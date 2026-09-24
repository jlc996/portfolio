// ProjectActions.jsx

// Import React Router Link
import { Link } from "react-router-dom";

// Import component styles
import styles from "../../../styles/projects/projectDetails/ProjectActions.module.css";


// Project Actions component
function ProjectActions({ project }) {

  return (

    <div className={styles.detailsButtons}>

      {/* ==========================
          Live Demo Button
          Only displays if a
          homepage URL exists
      ========================== */}

      {project.homepage && (

        <a
          href={project.homepage}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.primaryButton}`}
        >

          Live Demo

        </a>

      )}


      {/* ==========================
          GitHub Button
      ========================== */}

      <a
        href={project.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.button} ${styles.primaryButton}`}
      >

        View on GitHub

      </a>


      {/* ==========================
          Back to Projects Button
      ========================== */}

      <Link
        to="/projects"
        className={`${styles.button} ${styles.secondaryButton}`}
      >

        Back to Projects

      </Link>

    </div>

  );

}


// Export component
export default ProjectActions;
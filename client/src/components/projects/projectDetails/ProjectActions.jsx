// ProjectActions.jsx

import { Link } from "react-router-dom";

import styles from "../../../styles/projects/projectDetails/ProjectActions.module.css";


function ProjectActions({ project }) {

  return (

    <div className={styles.detailsButtons}>

      {/* ==========================
          Live Demo Button
      ========================== */}

      {project.liveUrl && (

        <a
          href={project.liveUrl}
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
        href={project.githubUrl}
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


export default ProjectActions;
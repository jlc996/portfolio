// ProjectCard.jsx

// Import React Router navigation
import { Link } from "react-router-dom";

// Import component styles
import styles from "../../styles/projects/ProjectCard.module.css";


// Reusable Project Card component
function ProjectCard({ project }) {

  return (

    <article className={styles.projectCard}>

      {/* ==========================
          Project Name
      ========================== */}

      <h2>

        {project.name
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (letter) =>
            letter.toUpperCase()
          )}

      </h2>


      {/* ==========================
          Project Description
      ========================== */}

      <p>

        {project.description ||
          "No description available."}

      </p>


      {/* ==========================
          Project Information
      ========================== */}

      <div className={styles.projectInfo}>

        <p>

          <strong>
            Language:
          </strong>{" "}

          {project.language ||
            "N/A"}

        </p>


        <p>

          <strong>
            Stars:
          </strong>{" "}

          {project.stargazers_count}

        </p>


        <p>

          <strong>
            Updated:
          </strong>{" "}

          {new Date(
            project.updated_at
          ).toLocaleDateString()}

        </p>

      </div>


      {/* ==========================
          Action Buttons
      ========================== */}

      <div className={styles.projectButtons}>


        {/* View Details Page */}

        <Link
          to={`/projects/${project.name}`}
          className={`${styles.button} ${styles.primaryButton}`}
        >

          View Details

        </Link>


        {/* Open GitHub Repository */}

        <a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.secondaryButton}`}
        >

          GitHub

        </a>


      </div>

    </article>

  );

}


// Export component
export default ProjectCard;
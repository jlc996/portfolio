// ProjectCard.jsx

import { Link } from "react-router-dom";

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
            Technologies:
          </strong>{" "}

          {project.technologies?.join(", ") ||
            "N/A"}

        </p>


        <p>

          <strong>
            Created:
          </strong>{" "}

          {project.createdAt
            ? new Date(
                project.createdAt
              ).toLocaleDateString()
            : "N/A"}

        </p>


        <p>

          <strong>
            Updated:
          </strong>{" "}

          {project.updatedAt
            ? new Date(
                project.updatedAt
              ).toLocaleDateString()
            : "N/A"}

        </p>

      </div>


      {/* ==========================
          Action Buttons
      ========================== */}

      <div className={styles.projectButtons}>

        {/* View Details Page */}

        <Link
          to={`/projects/${project.id}`}
          className={`${styles.button} ${styles.primaryButton}`}
        >

          View Details

        </Link>


        {/* Open GitHub Repository */}

        <a
          href={project.githubUrl}
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


export default ProjectCard;
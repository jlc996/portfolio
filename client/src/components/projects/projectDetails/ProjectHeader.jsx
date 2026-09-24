// ProjectHeader.jsx

// Import project topics component
import ProjectTopics from "../ProjectTopics";

// Import component styles
import styles from "../../../styles/projects/projectDetails/ProjectHeader.module.css";

// Format GitHub repository names
// Removes hyphens and underscores
// Capitalizes the first letter of each word
function formatProjectName(name) {

  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

}

// Project Header component
function ProjectHeader({ project }) {

  return (

    <header className={styles.projectDetailsHeader}>

      {/* ==========================
          Project Title
      ========================== */}

      <h1>

        {formatProjectName(project.name)}

      </h1>

      {/* ==========================
          Project Description
      ========================== */}

      <p className={styles.projectDescription}>

        {project.description ||
          "This repository does not currently include a project description."}

      </p>

      {/* ==========================
          Project Topics
      ========================== */}

      <ProjectTopics
        topics={project.topics}
      />

    </header>

  );

}

// Export component
export default ProjectHeader;
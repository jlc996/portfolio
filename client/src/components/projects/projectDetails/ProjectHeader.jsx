// ProjectHeader.jsx

import ProjectTopics from "../ProjectTopics";

import styles from "../../../styles/projects/projectDetails/ProjectHeader.module.css";


function formatProjectName(name) {

  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

}


function ProjectHeader({ project }) {

  return (

    <header className={styles.projectDetailsHeader}>

      <h1>
        {formatProjectName(project.name)}
      </h1>


      <p className={styles.projectDescription}>

        {project.description ||
          "No project description available."}

      </p>


      <ProjectTopics
        topics={project.technologies}
      />

    </header>

  );

}


export default ProjectHeader;
// ProjectInfoCard.jsx

import styles from "../../../styles/projects/projectDetails/ProjectInfoCard.module.css";


function ProjectInfoCard({ project }) {

  return (

    <div className={styles.detailsCard}>

      <p>

        <strong>
          Technologies:
        </strong>{" "}

        {project.technologies?.join(", ") ||
          "Not specified"}

      </p>


      <p>

        <strong>
          Created:
        </strong>{" "}

        {project.createdAt
          ? new Date(
              project.createdAt
            ).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric"
              }
            )
          : "Not specified"}

      </p>


      <p>

        <strong>
          Last Updated:
        </strong>{" "}

        {project.updatedAt
          ? new Date(
              project.updatedAt
            ).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric"
              }
            )
          : "Not specified"}

      </p>

    </div>

  );

}


export default ProjectInfoCard;
// ProjectInfoCard.jsx


// Import component styles
import styles from "../../../styles/projects/projectDetails/ProjectInfoCard.module.css";



// Project Information Card component
function ProjectInfoCard({ project }) {


  return (

    <div className={styles.detailsCard}>


      {/* ==========================
          Primary Language
      ========================== */}

      <p>

        <strong>
          Primary Language:
        </strong>{" "}

        {project.language ||
          "Not specified"}

      </p>



      {/* ==========================
          Stars
      ========================== */}

      <p>

        <strong>
          Stars:
        </strong>{" "}

        {project.stargazers_count}

      </p>



      {/* ==========================
          Forks
      ========================== */}

      <p>

        <strong>
          Forks:
        </strong>{" "}

        {project.forks_count}

      </p>



      {/* ==========================
          Open Issues
      ========================== */}

      <p>

        <strong>
          Open Issues:
        </strong>{" "}

        {project.open_issues_count}

      </p>



      {/* ==========================
          Visibility
      ========================== */}

      <p>

        <strong>
          Visibility:
        </strong>{" "}

        {project.visibility}

      </p>



      {/* ==========================
          Repository Size
      ========================== */}

      <p>

        <strong>
          Repository Size:
        </strong>{" "}

        {project.size} KB

      </p>



      {/* ==========================
          Default Branch
      ========================== */}

      <p>

        <strong>
          Default Branch:
        </strong>{" "}

        {project.default_branch}

      </p>



      {/* ==========================
          License
      ========================== */}

      <p>

        <strong>
          License:
        </strong>{" "}

        {project.license?.name ||
          "None"}

      </p>



      {/* ==========================
          Created Date
      ========================== */}

      <p>

        <strong>
          Created:
        </strong>{" "}

        {new Date(
          project.created_at
        ).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        )}

      </p>



      {/* ==========================
          Last Updated Date
      ========================== */}

      <p>

        <strong>
          Last Updated:
        </strong>{" "}

        {new Date(
          project.updated_at
        ).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        )}

      </p>


    </div>

  );

}


// Export component
export default ProjectInfoCard;
// ProjectDetails.jsx


// Import React Router components
import {
    Link,
    useParams
} from "react-router-dom";


// Import reusable fetch hook
import useFetch from "../hooks/useFetch";


// Import reusable components
import LoadingSpinner from "../components/projects/LoadingSpinner";
import ErrorMessage from "../components/projects/ErrorMessage";


// Import Project Details child components
import ProjectHeader from "../components/projects/projectDetails/ProjectHeader";
import ProjectInfoCard from "../components/projects/projectDetails/ProjectInfoCard";
import ProjectActions from "../components/projects/projectDetails/ProjectActions";


// Import page styles
import styles from "../styles/pages/ProjectDetails.module.css";



// =====================================================
// GitHub API Endpoint
// =====================================================

const API_URL =
    "https://api.github.com/users/jlc996/repos";



// =====================================================
// Projects Hidden From Portfolio
// =====================================================

const excludedProjects = [

    "Software-Design",
    "GitTest",
    "Module2 Div Soup",
    "NeXTStack",
    "Nextstack Module1 Bio"

];



// =====================================================
// Normalize Project Names
// =====================================================

const normalizeProjectName = (name) => {

    return name

        .toLowerCase()

        // Convert hyphens and underscores to spaces
        .replace(/[-_]/g, " ")

        // Remove extra spaces
        .replace(/\s+/g, " ")

        // Remove spaces from beginning/end
        .trim();

};



// =====================================================
// Project Details Page Component
// =====================================================

function ProjectDetails() {


    // ==========================
    // Get Repository Name From URL
    // ==========================

    const { id } = useParams();



    // ==========================
    // Fetch GitHub Repositories
    // ==========================

    const {
        data: projects,
        isLoading,
        error,
    } = useFetch(API_URL);



    // ==========================
    // Loading State
    // ==========================

    if (isLoading) {

        return (

            <section className={styles.projectDetails}>

                <LoadingSpinner />

            </section>

        );

    }



    // ==========================
    // Error State
    // ==========================

    if (error) {

        return (

            <section className={styles.projectDetails}>

                <ErrorMessage
                    message={error}
                />

            </section>

        );

    }



    // =====================================================
    // Filter Hidden Projects
    // =====================================================

    const projectList = (projects || [])

        .filter((project) => {

            const projectName =
                normalizeProjectName(project.name);

            return !excludedProjects.some(
                (excludedProject) =>
                    normalizeProjectName(excludedProject) ===
                    projectName
            );

        });



    // =====================================================
    // Find Selected Project
    // =====================================================

    const normalizedProjectId =
        normalizeProjectName(id || "");


    const project = projectList.find((repo) => {

        return (
            normalizeProjectName(repo.name) ===
            normalizedProjectId
        );

    });



    // =====================================================
    // Project Not Found
    // =====================================================

    if (!project) {

        return (

            <section className={styles.projectDetails}>


                <h2>
                    Project Not Found
                </h2>



                <p>
                    The requested project could not be found.
                </p>



                {/* ==========================
                    Back to Projects Button
                ========================== */}

                <div className={styles.detailsButtons}>

                    <Link
                        to="/projects"
                        className={`${styles.button} ${styles.secondaryButton}`}
                    >

                        Back to Projects

                    </Link>

                </div>


            </section>

        );

    }



    // =====================================================
    // Render Project Details Page
    // =====================================================

    return (

        <section className={styles.projectDetails}>


            {/* ==========================
                Project Header
            ========================== */}

            <ProjectHeader
                project={project}
            />



            {/* ==========================
                Project Information
            ========================== */}

            <ProjectInfoCard
                project={project}
            />



            {/* ==========================
                Action Buttons
            ========================== */}

            <ProjectActions
                project={project}
            />


        </section>

    );

}



// =====================================================
// Export Component
// =====================================================

export default ProjectDetails;
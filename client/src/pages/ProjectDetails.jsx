// ProjectDetails.jsx

import {
    Link,
    useParams
} from "react-router-dom";

import useFetch from "../hooks/useFetch";

import LoadingSpinner from "../components/projects/LoadingSpinner";
import ErrorMessage from "../components/projects/ErrorMessage";

import ProjectHeader from "../components/projects/projectDetails/ProjectHeader";
import ProjectInfoCard from "../components/projects/projectDetails/ProjectInfoCard";
import ProjectActions from "../components/projects/projectDetails/ProjectActions";

import styles from "../styles/pages/ProjectDetails.module.css";


// =====================================================
// Project Details Page Component
// =====================================================

function ProjectDetails() {

    // ==========================
    // Get Project ID From URL
    // ==========================

    const { id } = useParams();


    // =====================================================
    // Backend API Endpoint
    // =====================================================

    const API_URL =
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects/${id}`;


    // ==========================
    // Fetch Project
    // ==========================

    const {
        data,
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
    // Get Project From API Response
    // =====================================================

    const project = data?.data;


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

            <ProjectHeader
                project={project}
            />


            <ProjectInfoCard
                project={project}
            />


            <ProjectActions
                project={project}
            />

        </section>

    );

}


export default ProjectDetails;
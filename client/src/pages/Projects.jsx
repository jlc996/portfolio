
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import ProjectCard from "../components/projects/ProjectCard";
import SearchBar from "../components/projects/SearchBar";
import LoadingSpinner from "../components/projects/LoadingSpinner";
import ErrorMessage from "../components/projects/ErrorMessage";
import styles from "../styles/pages/Projects.module.css";

// API URL for retrieving projects from the backend
const API_URL = `${
    import.meta.env.VITE_API_URL || "http://localhost:5000"
}/api/projects`;

// Projects that should not appear in the portfolio
const excludedProjects = [
    "Software-Design",
    "GitTest",
    "Module2 Div Soup",
    "NeXTStack",
    "Nextstack Module1 Bio"
];

// Normalize project names for consistent comparisons
const normalizeProjectName = (name = "") => {
    return name
        .toLowerCase()
        .replace(/[-_]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
};

// Projects page component
function Projects() {
    // Store the search input
    const [searchTerm, setSearchTerm] = useState("");

    // Get the current user's authentication token
    const { token } = useAuth();

    // Fetch projects from the API, sending the token when available
    const { data, isLoading, error } = useFetch(API_URL, token);

    // The API returns projects inside a data property
    const projects = Array.isArray(data?.data) ? data.data : [];

    // Normalize the search term for filtering
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    // Filter out excluded projects and match the search term
    const filteredProjects = projects
        .filter((project) => {
            const projectName = normalizeProjectName(project.name);

            return !excludedProjects.some(
                (excludedProject) =>
                    normalizeProjectName(excludedProject) === projectName
            );
        })
        .filter((project) => {
            // Search project names, descriptions, and technologies
            const projectName = project.name?.toLowerCase() || "";
            const projectDescription =
                project.description?.toLowerCase() || "";
            const projectTechnologies =
                project.technologies?.join(" ").toLowerCase() || "";

            return (
                projectName.includes(normalizedSearchTerm) ||
                projectDescription.includes(normalizedSearchTerm) ||
                projectTechnologies.includes(normalizedSearchTerm)
            );
        });

    return (
        <section className={styles.projects}>
            {/* Page heading and introduction */}
            <header className={styles.projectsHeader}>
                <h1>My Projects</h1>
                <p>
                    Browse my GitHub repositories and explore the applications I've built using modern frontend technologies.
                </p>
            </header>

            {/* Search projects by name, description, or technology */}
            <SearchBar
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search projects by name, technology, or topic..."
            />

            {/* Display loading and error states */}
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}

            {/* Display filtered projects when loading is complete */}
            {!isLoading && !error && (
                <div className={styles.projectGrid}>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                            />
                        ))
                    ) : (
                        // Display a message when no projects match
                        <p className={styles.noProjects}>
                            No portfolio projects found.
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}

export default Projects;
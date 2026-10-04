
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/projects/ProjectCard.module.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// Reusable Project Card component
function ProjectCard({ project }) {
  const { token, isAuthenticated, logout } = useAuth();
  const [likes, setLikes] = useState(project.likes ?? 0);
  const [hasLiked, setHasLiked] = useState(
    project.likedByCurrentUser ?? false
  );
  const [isLiking, setIsLiking] = useState(false);
  const [message, setMessage] = useState("");

  const handleLike = async () => {
    if (!isAuthenticated) {
      setMessage("Please log in to like this project.");
      return;
    }

    if (isLiking) return;

    setIsLiking(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/projects/${project.id}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        logout();
        setMessage("Your session expired. Please log in again.");
        return;
      }

      if (response.status === 409) {
        setMessage("You've already liked this project.");
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to like this project."
        );
      }

      setLikes(result.data.likes);
      setHasLiked(true);
      setMessage("Project liked successfully.");
    } catch (error) {
      setMessage(error.message || "Unable to like this project.");
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <article className={styles.projectCard}>
      <h2>
        {(project.name || "Untitled Project")
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (letter) => letter.toUpperCase())}
      </h2>

      <p>{project.description || "No description available."}</p>

      <div className={styles.projectInfo}>
        <p>
          <strong>Technologies:</strong>{" "}
          {project.technologies?.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Created:</strong>{" "}
          {project.createdAt
            ? new Date(project.createdAt).toLocaleDateString()
            : "N/A"}
        </p>
        <p>
          <strong>Updated:</strong>{" "}
          {project.updatedAt
            ? new Date(project.updatedAt).toLocaleDateString()
            : "N/A"}
        </p>
        <p>
          <strong>Likes:</strong> {likes}
        </p>
      </div>

      <div className={styles.projectButtons}>
        <Link
          to={`/projects/${project.id}`}
          className={`${styles.button} ${styles.primaryButton}`}
        >
          View Details
        </Link>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.secondaryButton}`}
        >
          GitHub
        </a>

        <button
          type="button"
          className={`${styles.button} ${styles.primaryButton}`}
          onClick={handleLike}
          disabled={isLiking}
          aria-label={`${hasLiked ? "Liked" : "Like"} ${project.name || "this project"
            }`}
        >
          {isLiking
            ? "Liking..."
            : hasLiked
              ? "Liked"
              : "Like"}
        </button>
      </div>

      <p role="status" aria-live="polite">
        {message}
      </p>
    </article>
  );
}

export default ProjectCard;
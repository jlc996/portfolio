import { useEffect, useState } from "react";

import { apiFetch } from "../api";
import { useAuth } from "../context/AuthContext";

function AdminProjects() {
  const { user, isAuthenticated } = useAuth();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    technologies: "",
    image: "",
    githubUrl: "",
    liveUrl: ""
  });

  // Load projects
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await apiFetch("/api/projects");

        setProjects(response.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Handle form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  };

  // Create project
  const handleCreate = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    try {
      const response = await apiFetch(
        "/api/projects",
        {
          method: "POST",
          body: JSON.stringify({
            ...form,
            technologies: form.technologies
              .split(",")
              .map((technology) => technology.trim())
              .filter(Boolean)
          })
        }
      );

      setProjects((currentProjects) => [
        response.data,
        ...currentProjects
      ]);

      setForm({
        name: "",
        description: "",
        technologies: "",
        image: "",
        githubUrl: "",
        liveUrl: ""
      });

      setMessage("Project created successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  // Edit project
  const handleEdit = (project) => {
    setEditingId(project.id);

    setForm({
      name: project.name || "",
      description: project.description || "",
      technologies: project.technologies?.join(", ") || "",
      image: project.image || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || ""
    });

    setError("");
    setMessage("");
  };

  // Update project
  const handleUpdate = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    try {
      const response = await apiFetch(
        `/api/projects/${editingId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            ...form,
            technologies: form.technologies
              .split(",")
              .map((technology) => technology.trim())
              .filter(Boolean)
          })
        }
      );

      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project.id === editingId
            ? response.data
            : project
        )
      );

      setForm({
        name: "",
        description: "",
        technologies: "",
        image: "",
        githubUrl: "",
        liveUrl: ""
      });

      setEditingId(null);

      setMessage("Project updated successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete project
  const handleDelete = async (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");

    try {
      await apiFetch(`/api/projects/${projectId}`, {
        method: "DELETE"
      });

      setProjects((currentProjects) =>
        currentProjects.filter(
          (project) => project.id !== projectId
        )
      );

      setMessage("Project deleted successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  // Authentication check
  if (!isAuthenticated) {
    return (
      <section>
        <h1>Admin Projects</h1>

        <p>
          You must be logged in to access this page.
        </p>
      </section>
    );
  }

  // Admin authorization check
  if (user?.role !== "admin") {
    return (
      <section>
        <h1>Access Denied</h1>

        <p>
          You do not have permission to manage projects.
        </p>
      </section>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <section>
        <h1>Admin Projects</h1>

        <p>
          Loading projects...
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1>Admin Projects</h1>

      <p>
        Manage the projects displayed on your portfolio.
      </p>

      {/* ==========================
          Status Messages
      ========================== */}

      {message && (
        <p>
          {message}
        </p>
      )}

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      {/* ==========================
          Create Project
      ========================== */}

      <h2>
        {editingId
          ? "Edit Project"
          : "Create Project"}
      </h2>

      <form
        onSubmit={
          editingId
            ? handleUpdate
            : handleCreate
        }
      >

        <div>
          <label htmlFor="name">
            Project Name
          </label>

          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="technologies">
            Technologies
          </label>

          <input
            id="technologies"
            name="technologies"
            value={form.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            required
          />
        </div>

        <div>
          <label htmlFor="image">
            Image URL
          </label>

          <input
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="githubUrl">
            GitHub URL
          </label>

          <input
            id="githubUrl"
            name="githubUrl"
            type="url"
            value={form.githubUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="liveUrl">
            Live URL
          </label>

          <input
            id="liveUrl"
            name="liveUrl"
            type="url"
            value={form.liveUrl}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          {editingId
            ? "Update Project"
            : "Create Project"}
        </button>

      </form>

      {/* ==========================
          Existing Projects
      ========================== */}

      <h2>
        Existing Projects
      </h2>

      {projects.length === 0 ? (
        <p>
          No projects found.
        </p>
      ) : (
        projects.map((project) => (
          <article key={project.id}>

            <h3>
              {project.name}
            </h3>

            <p>
              {project.description}
            </p>

            <p>
              <strong>
                Technologies:
              </strong>{" "}
              {project.technologies?.join(", ")}
            </p>

            <button
              type="button"
              onClick={() =>
                handleEdit(project)
              }
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() =>
                handleDelete(project.id)
              }
            >
              Delete
            </button>

          </article>
        ))
      )}
    </section>
  );
}

export default AdminProjects;

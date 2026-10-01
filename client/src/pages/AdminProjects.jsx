import { useEffect, useState } from "react";

import styles from "../styles/pages/AdminProjects.module.css";
import { apiFetch } from "../api";
import { useAuth } from "../context/AuthContext";

const emptyForm = {
name: "",
description: "",
technologies: "",
image: "",
githubUrl: "",
liveUrl: ""
};

function AdminProjects() {
const { user, isAuthenticated } = useAuth();

const [projects, setProjects] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState("");
const [message, setMessage] = useState("");
const [editingId, setEditingId] = useState(null);
const [form, setForm] = useState(emptyForm);

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

const handleChange = (event) => {
const { name, value } = event.target;

setForm((currentForm) => ({
  ...currentForm,
  [name]: value
}));

};

const formatFormData = () => ({
...form,
technologies: form.technologies
.split(",")
.map((technology) => technology.trim())
.filter(Boolean)
});

const resetForm = () => {
setForm({ ...emptyForm });
setEditingId(null);
};

const handleCreate = async (event) => {
event.preventDefault();
setError("");
setMessage("");

try {
  const response = await apiFetch("/api/projects", {
    method: "POST",
    body: JSON.stringify(formatFormData())
  });

  setProjects((currentProjects) => [
    response.data,
    ...currentProjects
  ]);

  resetForm();
  setMessage("Project created successfully.");
} catch (error) {
  setError(error.message);
}

};

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

const handleUpdate = async (event) => {
event.preventDefault();
setError("");
setMessage("");

try {
  const response = await apiFetch(
    `/api/projects/${editingId}`,
    {
      method: "PATCH",
      body: JSON.stringify(formatFormData())
    }
  );

  setProjects((currentProjects) =>
    currentProjects.map((project) =>
      project.id === editingId ? response.data : project
    )
  );

  resetForm();
  setMessage("Project updated successfully.");
} catch (error) {
  setError(error.message);
}

};

const handleDelete = async (projectId) => {
const confirmed = window.confirm(
"Are you sure you want to delete this project?"
);

if (!confirmed) return;

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

  if (editingId === projectId) {
    resetForm();
  }

  setMessage("Project deleted successfully.");
} catch (error) {
  setError(error.message);
}

};

if (!isAuthenticated || user?.role !== "admin") {
return ( <section className={styles.admin}> <header className={styles.header}> <h1>
{isAuthenticated ? "Access Denied" : "Admin Projects"} </h1> <p className={styles.subtitle}>
{isAuthenticated
? "You do not have permission to manage projects."
: "You must be logged in to access this page."} </p> </header> </section>
);
}

if (isLoading) {
return ( <section className={styles.admin}> <h1>Admin Projects</h1> <p>Loading projects...</p> </section>
);
}

return ( <section className={styles.admin}> <header className={styles.header}> <h1>Admin Projects</h1> <p className={styles.subtitle}>
Manage the projects displayed on your portfolio. </p> </header>

  {message && (
    <p className={styles.success} role="status">
      {message}
    </p>
  )}

  {error && (
    <p className={styles.error} role="alert">
      {error}
    </p>
  )}

  <div className={styles.panel}>
    <h2>{editingId ? "Edit Project" : "Create Project"}</h2>

    <form
      className={styles.form}
      onSubmit={editingId ? handleUpdate : handleCreate}
    >
      <div className={styles.field}>
        <label htmlFor="name">Project Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={`${styles.field} ${styles.fullWidth}`}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="technologies">Technologies</label>
        <input
          id="technologies"
          name="technologies"
          value={form.technologies}
          onChange={handleChange}
          placeholder="React, Node.js, MongoDB"
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          type="url"
          value={form.image}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="githubUrl">GitHub URL</label>
        <input
          id="githubUrl"
          name="githubUrl"
          type="url"
          value={form.githubUrl}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="liveUrl">Live URL</label>
        <input
          id="liveUrl"
          name="liveUrl"
          type="url"
          value={form.liveUrl}
          onChange={handleChange}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.button} type="submit">
          {editingId ? "Update Project" : "Create Project"}
        </button>

        {editingId && (
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={resetForm}
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  </div>

  <div className={styles.header}>
    <h2>Existing Projects</h2>
    <p className={styles.subtitle}>
      {projects.length} {projects.length === 1 ? "project" : "projects"}
    </p>
  </div>

  {projects.length === 0 ? (
    <p>No projects found.</p>
  ) : (
    <div className={styles.projectList}>
      {projects.map((project) => (
        <article
          className={styles.projectCard}
          key={project.id}
        >
          <h3>{project.name}</h3>
          <p>{project.description}</p>

          <p className={styles.technologies}>
            <strong>Technologies:</strong>{" "}
            {project.technologies?.join(", ")}
          </p>

          <div className={styles.projectActions}>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() => handleEdit(project)}
            >
              Edit
            </button>

            <button
              className={styles.dangerButton}
              type="button"
              onClick={() => handleDelete(project.id)}
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  )}
</section>

);
}

export default AdminProjects;

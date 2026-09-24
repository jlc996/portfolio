// ContactForm.jsx

import { useState } from "react";

import styles from "../../styles/contact/ContactForm.module.css";


function ContactForm() {

  // Store form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });


  // Track validation errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");


  // Track successful form submission
  const [submitted, setSubmitted] = useState(false);


  // Track form submission loading state
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Track form submission errors
  const [error, setError] = useState("");


  // Validate name
  function validateName(name) {

    const trimmedName = name.trim();

    if (!trimmedName) {
      return "Name is required.";
    }

    if (trimmedName.length < 2) {
      return "Name must be at least 2 characters.";
    }

    return "";
  }


  // Validate email
  function validateEmail(email) {

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      return "Email address is required.";
    }

    if (!emailPattern.test(email.trim())) {
      return "Please enter a valid email address.";
    }

    return "";
  }


  // Validate message
  function validateMessage(message) {

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return "Message is required.";
    }

    if (trimmedMessage.length < 10) {
      return "Message must be at least 10 characters.";
    }

    return "";
  }


  // Update form fields
  function handleChange(event) {

    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Clear submission messages
    setSubmitted(false);
    setError("");


    // Validate name while typing
    if (name === "name") {
      setNameError(validateName(value));
    }


    // Validate email while typing
    if (name === "email") {
      setEmailError(validateEmail(value));
    }


    // Validate message while typing
    if (name === "message") {
      setMessageError(validateMessage(value));
    }
  }


  // Validate name when leaving field
  function handleNameBlur() {

    setNameError(
      validateName(formData.name)
    );
  }


  // Validate email when leaving field
  function handleEmailBlur() {

    setEmailError(
      validateEmail(formData.email)
    );
  }


  // Validate message when leaving field
  function handleMessageBlur() {

    setMessageError(
      validateMessage(formData.message)
    );
  }


  // Submit form
  async function handleSubmit(event) {

    event.preventDefault();


    // Validate all fields
    const nameValidationError =
      validateName(formData.name);

    const emailValidationError =
      validateEmail(formData.email);

    const messageValidationError =
      validateMessage(formData.message);


    // Update validation errors
    setNameError(nameValidationError);
    setEmailError(emailValidationError);
    setMessageError(messageValidationError);


    // Stop submission if validation fails
    if (
      nameValidationError ||
      emailValidationError ||
      messageValidationError
    ) {
      return;
    }


    // Start loading state
    setIsSubmitting(true);

    // Clear previous messages
    setSubmitted(false);
    setError("");


    try {

      // Send form data to Web3Forms
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({

            access_key:
              import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,

            name:
              formData.name,

            email:
              formData.email,

            message:
              formData.message,

            subject:
              `New Portfolio Contact Message from ${formData.name}`,
          }),
        }
      );


      // Convert response to JSON
      const result = await response.json();


      // Check if submission was successful
      if (result.success) {

        // Show success message
        setSubmitted(true);


        // Clear form
        setFormData({
          name: "",
          email: "",
          message: "",
        });


        // Clear validation messages
        setNameError("");
        setEmailError("");
        setMessageError("");

      } else {

        console.error(
          "Web3Forms error:",
          result
        );

        setError(
          result.message ||
          "Something went wrong. Please try again later."
        );
      }

    } catch (error) {

      console.error(
        "Form submission error:",
        error
      );

      setError(
        "Unable to send your message. Please try again later."
      );

    } finally {

      // Stop loading state
      setIsSubmitting(false);
    }
  }


  return (

    <section className={styles.contactFormSection}>

      <form
        className={styles.contactForm}
        onSubmit={handleSubmit}
        noValidate
      >

        {/* =====================================================
            Name Field
        ===================================================== */}

        <div className={styles.formGroup}>

          <label htmlFor="name">
            Name
          </label>


          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleNameBlur}
            placeholder="Your name"
            required
            aria-invalid={Boolean(nameError)}
            aria-describedby="name-feedback"
            className={
              nameError
                ? styles.inputError
                : formData.name
                  ? styles.inputValid
                  : ""
            }
          />


          {nameError && (

            <p
              id="name-feedback"
              className={styles.fieldError}
              role="alert"
            >
              {nameError}
            </p>

          )}


          {!nameError && formData.name && (

            <p
              id="name-feedback"
              className={styles.fieldSuccess}
              role="status"
            >
              ✓ Name looks good
            </p>

          )}

        </div>


        {/* =====================================================
            Email Field
        ===================================================== */}

        <div className={styles.formGroup}>

          <label htmlFor="email">
            Email
          </label>


          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleEmailBlur}
            placeholder="Your email"
            required
            aria-invalid={Boolean(emailError)}
            aria-describedby="email-feedback"
            className={
              emailError
                ? styles.inputError
                : formData.email
                  ? styles.inputValid
                  : ""
            }
          />


          {emailError && (

            <p
              id="email-feedback"
              className={styles.fieldError}
              role="alert"
            >
              {emailError}
            </p>

          )}


          {!emailError && formData.email && (

            <p
              id="email-feedback"
              className={styles.fieldSuccess}
              role="status"
            >
              ✓ Valid email address
            </p>

          )}

        </div>


        {/* =====================================================
            Message Field
        ===================================================== */}

        <div className={styles.formGroup}>

          <label htmlFor="message">
            Message
          </label>


          <textarea
            id="message"
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleMessageBlur}
            placeholder="Write your message..."
            required
            aria-invalid={Boolean(messageError)}
            aria-describedby="message-feedback"
            className={
              messageError
                ? styles.inputError
                : formData.message
                  ? styles.inputValid
                  : ""
            }
          />


          {messageError && (

            <p
              id="message-feedback"
              className={styles.fieldError}
              role="alert"
            >
              {messageError}
            </p>

          )}


          {!messageError && formData.message && (

            <p
              id="message-feedback"
              className={styles.fieldSuccess}
              role="status"
            >
              ✓ Message looks good
            </p>

          )}

        </div>


        {/* =====================================================
            Submit Button
        ===================================================== */}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={
            isSubmitting ||
            Boolean(nameError) ||
            Boolean(emailError) ||
            Boolean(messageError) ||
            !formData.name ||
            !formData.email ||
            !formData.message
          }
        >

          {isSubmitting
            ? "Sending..."
            : "Send Message"}

        </button>


        {/* =====================================================
            Success Message
        ===================================================== */}

        {submitted && (

          <p
            className={styles.successMessage}
            role="status"
          >
            Thank you! Your message has been sent successfully.
          </p>

        )}


        {/* =====================================================
            Error Message
        ===================================================== */}

        {error && (

          <p
            className={styles.errorMessage}
            role="alert"
          >
            {error}
          </p>

        )}

      </form>

    </section>
  );
}


export default ContactForm;
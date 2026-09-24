// Contact.jsx


// Contact form component
import ContactForm from "../components/contact/ContactForm";


// Page styles
import styles from "../styles/pages/Contact.module.css";



function Contact() {


    return (

        <section className={styles.contact}>


            <header className={styles.contactHeader}>


                <h1>
                    Contact Me
                </h1>


                <p>
                    Have a question or want to discuss a project?
                    I'd love to hear from you.
                </p>


            </header>



            <ContactForm />


        </section>

    );

}


export default Contact;
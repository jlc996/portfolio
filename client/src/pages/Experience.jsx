// Experience.jsx


// Page styles
import styles from "../styles/pages/Experience.module.css";


// Experience sections
import SkillsSection from "../components/experience/SkillsSection";
import CertificationSection from "../components/experience/CertificationSection";
import CompletionCertificateSection from "../components/experience/CompletionCertificateSection";
import Timeline from "../components/experience/Timeline";
import HighlightSection from "../components/experience/HighlightSection";



function Experience() {


    return (

        <section className={styles.experience}>


            <header className={styles.experienceHeader}>


                <h1>
                    Experience & Skills
                </h1>


                <p>
                    Throughout my journey at Mississippi Coding Academies,
                    I have developed a strong foundation in modern frontend
                    development by building responsive websites, interactive
                    JavaScript applications, and React Single Page Applications.
                </p>


            </header>



            <SkillsSection />


            <CertificationSection />


            <CompletionCertificateSection />


            <Timeline />


            <HighlightSection />


        </section>

    );

}


export default Experience;
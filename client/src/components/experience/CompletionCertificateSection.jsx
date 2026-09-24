// CompletionCertificateSection.jsx


// Import reusable component
import CompletionCertificateCard from "./CompletionCertificateCard";


// Import certificate data
import {
    completionCertificates
} from "../../data/experienceData";


// Import styles
import styles from "../../styles/experience/CompletionCertificateSection.module.css";



function CompletionCertificateSection() {


    return (

        <section className={styles.completionCertificates}>


            <h2>
                Completion Certificates
            </h2>



            <p>
                Official module completion certificates earned while completing
                the Full Stack Development program at Mississippi Coding Academies.
            </p>



            <div className={styles.certificateGrid}>


                {
                    completionCertificates.map((certificate) => (

                        <CompletionCertificateCard

                            key={certificate.id}

                            certificate={certificate}

                        />

                    ))
                }


            </div>


        </section>

    );

}


export default CompletionCertificateSection;
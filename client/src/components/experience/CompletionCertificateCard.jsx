// CompletionCertificateCard.jsx

import styles from "../../styles/experience/CompletionCertificateCard.module.css";

function CompletionCertificateCard({ certificate }) {

    return (

        <article className={styles.certificateCard}>

            {/* Certificate Image */}
            <img
                src={certificate.image}
                alt={certificate.title}
            />

            {/* Certificate Content */}
            <div className={styles.certificateContent}>

                <h3>
                    {certificate.title}
                </h3>

                <h4>
                    {certificate.issuer}
                </h4>

                <p>
                    {certificate.description}
                </p>

            </div>

        </article>

    );

}


export default CompletionCertificateCard;
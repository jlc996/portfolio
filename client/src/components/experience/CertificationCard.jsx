// CertificationCard.jsx

import styles from "../../styles/experience/CertificationCard.module.css";

function CertificationCard({ certificate }) {

    return (

        <div className={styles.certificateCard}>

            <img
                src={certificate.image}
                alt={certificate.title}
            />

            <h3>
                {certificate.title}
            </h3>

            <p>
                {certificate.description}
            </p>

        </div>

    );

}


export default CertificationCard;
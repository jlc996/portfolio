import CertificationCard from "./CertificationCard";

import styles from "../../styles/experience/CertificationSection.module.css";

import { certifications } from "../../data/experienceData";


function CertificationSection(){


return(

<section className={styles.certifications}>


<h2 className={styles.title}>
Certifications & Badges
</h2>


<div className={styles.certificationGrid}>


{certifications.map((certificate)=>(

<CertificationCard

key={certificate.id}

certificate={certificate}

/>

))}


</div>


</section>

);


}


export default CertificationSection;
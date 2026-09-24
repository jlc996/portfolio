// SkillCard.jsx

import styles from "../../styles/experience/SkillCard.module.css";


function SkillCard({ title, skills }) {


    return (

        <div className={styles.skillCard}>


            <h3>
                {title}
            </h3>


            <ul>

                {skills.map((skill, index) => (

                    <li key={index}>
                        {skill}
                    </li>

                ))}

            </ul>


        </div>

    );

}


export default SkillCard;
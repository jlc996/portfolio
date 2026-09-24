// HighlightCard.jsx


import styles from "../../styles/experience/HighlightCard.module.css";


function HighlightCard({ title, text }) {


    return (

        <div className={styles.highlightCard}>


            <h3>
                {title}
            </h3>


            <p>
                {text}
            </p>


        </div>

    );


}


export default HighlightCard;
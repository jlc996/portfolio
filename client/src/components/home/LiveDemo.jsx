// LiveDemo.jsx


// Component styles
import styles from "../../styles/home/LiveDemo.module.css";



function LiveDemo() {


    const demoUrl =
        "https://jlc996.github.io/Digital_Timekeeper/";



    return (

        <section className={styles.liveDemoSection}>


            <div className={styles.liveDemoContainer}>


                {/* Section Header */}

                <div className={styles.liveDemoHeader}>


                    <h2>
                        Live Demo
                    </h2>


                    <p>
                        Try my Digital Timekeeper project directly
                        from my portfolio.
                    </p>


                </div>



                {/* Live Demo Card */}

                <div className={styles.liveDemoCard}>


                    {/* Project Preview */}

                    <div className={styles.liveDemoPreview}>


                        <iframe
                            src={demoUrl}
                            title="Digital Timekeeper Live Demo"
                            loading="lazy"
                        />


                    </div>



                    {/* Project Information */}

                    <div className={styles.liveDemoContent}>


                        <span className={styles.projectLabel}>
                            Featured Project
                        </span>


                        <h3>
                            Digital Timekeeper
                        </h3>


                        <p>
                            A responsive digital timekeeping application
                            featuring a live clock, time format controls,
                            and a theme toggle.
                        </p>



                        {/* Action Buttons */}

                        <div className={styles.liveDemoActions}>


                            <a
                                href={demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.liveDemoButton}
                            >
                                Open Full Demo
                            </a>


                            <a
                                href="https://github.com/jlc996/Digital_Timekeeper"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.liveDemoButtonSecondary}
                            >
                                View Source
                            </a>


                        </div>


                    </div>


                </div>


            </div>


        </section>

    );

}


export default LiveDemo;
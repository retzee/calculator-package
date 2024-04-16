import React from "react";

import styles from './Output.module.css';

const Output = (props) => {
    return (
        <div className={styles.calculator__output_holder}>
                <div className={styles.calculator__output}>
                    <div className={styles.calculator__output__characters}>{props.outputString}</div>
                    <div className={styles.calculator__output__result}>{props.outputResult}</div>
                </div>
        </div>
    );
}

export default Output;
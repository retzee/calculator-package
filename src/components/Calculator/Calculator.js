import React from "react";

import styles from './Calculator.module.css';

const Calculator = (props) => {
    return (
        <div className={styles.calculator}>{props.children}</div>
    );
}

export default Calculator;
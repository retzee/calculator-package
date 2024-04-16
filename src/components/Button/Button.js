import React from "react";

const Button = (props) => {
    return (
        <button className={props.className} onClick={props.onClick} value={props.btnCategory}>{props.value}</button>
    );
}

export default Button;
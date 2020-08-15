import React from "react";

function TDC(props) {
    const styles = {
        "textDecoration": "line-through",
        "color": "#d9d3d2",
        "fontStyle": "italic"
    }
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={props.item.completed}
                onChange={() => props.handleChange(props.item.id)}
            />
            <p style={props.item.completed ? styles : null}>
                {props.item.text}
            </p>
        </div >
    );
}

export default TDC




//  Question.js – Display a Single Question


import React from "react";




export default function Question({ data, onAnswer, selected }) {
  return (
    <div>
      <h3>{data.question}</h3>
      {data.options.map((option, index) => {
        let style = {
          padding: "10px",
          margin: "8px",
          borderRadius: "5px",
          cursor: "pointer",
          border: "1px solid #aaa",
          transition: "all 0.3s ease",
        };

        if (selected !== null) {
          if (index === selected) {
            style.backgroundColor =
              index === data.correct ? "#c8f7c5" : "#f7c5c5";
            style.border =
              index === data.correct ? "2px solid green" : "2px solid red";
            style.transform = "scale(1.05)";
          } else if (index === data.correct) {
            style.backgroundColor = "#c8f7c5";
            style.border = "2px solid green";
          }
        }

        return (
          <div key={index} style={style} onClick={() => selected === null && onAnswer(index)}>
            {option}
          </div>
        );
      })}
    </div>
  );
}

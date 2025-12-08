import { useState, useRef, useEffect } from "react";
import "./App.css";
import { calculateExpression } from "./Calculator/calculate.js";
import MathQuiz from "./quiz/MathQuiz.jsx";

export default function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const historyRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (historyRef.current && !historyRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    }
    if (showHistory) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showHistory]);
  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };
  const clearAll = () => setInput("");
  const backspace = () => setInput((p) => p.slice(0, -1));
  const toggleSign = () => {
    if (!input) return;
    const match = input.match(/(-?\d+\.?\d*)$/);
    if (!match) return;
    const number = match[0];
    const before = input.slice(0, input.length - number.length);
    setInput(number.startsWith("-") ? before + number.slice(1) : before + "-" + number);
  };
  const calculate = () => {
    const result = calculateExpression(input);
    setHistory([{ expression: input, result }, ...history]);
    setInput(result.toString());
  };
  return (
    <div className="wrapper">
      <div className="calculator-box">
        <div className="top-bar">
          <div className="title"><h3>Calculator</h3></div>
          <div className="history-container">
            <button
              className="history-btn"
              onClick={() => setShowHistory(!showHistory)}>
              <img src="/src/assets/history-Icon.svg" alt="History" />
            </button>
            {showHistory && (
              <div className="history-panel" ref={historyRef}>
                <div className="history-header">
                  <span>History</span>
                  <button className="close-btn" onClick={() => setShowHistory(false)}>
                    <img src="/src/assets/cross-Icon.svg" alt="Close" />
                  </button>
                </div>
                {history.length === 0 ? (
                  <p className="empty">No history</p>
                ) : (
                  history.map((item, i) => (
                    <div key={i} className="history-item">
                      {item.expression} = <strong>{item.result}</strong>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <div className="display">{input || "0"}</div>
        <div className="buttons">
          <button className="btn special" onClick={clearAll}>AC</button>
          <button className="btn special icons" onClick={toggleSign}><img src="/src/assets/plus-minus.png" alt="Plus Minus" /></button>
          <button className="btn special" onClick={() => handleClick("%")}>%</button>
          <button className="btn operator" onClick={() => handleClick("/")}>÷</button>
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button className="btn operator" onClick={() => handleClick("*")}><img src="/src/assets/cross-Icon.svg" alt="Multiply" /></button>
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button className="btn operator" onClick={() => handleClick("-")}>-</button>
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button className="btn operator" onClick={() => handleClick("+")}>+</button>
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button className="btn special icons" onClick={backspace}><img src="/src/assets/backspace.png" alt="Backspace" /></button>
          <button className="btn equals" onClick={calculate}>=</button>
        </div>
      </div>
      <MathQuiz />
    </div>
  );
}

import { useState, useEffect } from "react";

export default function MathQuiz() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  const generateQuestion = () => {
    setNum1(Math.floor(Math.random() * 50) + 1);
    setNum2(Math.floor(Math.random() * 50) + 1);
    setAnswer("");
    setMessage("");
  };

  useEffect(() => {
  const createQuestion = () => {
    generateQuestion();
  }
  createQuestion();
}, []);

  const checkAnswer = () => {
    if (parseInt(answer) === num1 + num2) {
      setMessage("Correct! ");
      setScore(score + 1);

      setTimeout(generateQuestion, 800);
    } else {
      setMessage("Wrong, try again!");
    }
  };

  return (
    <div className="quiz-box">
      <h2>Math Quiz</h2>
      <p className="question">{num1} + {num2} = ?</p>

      <input 
        type="number"
        placeholder="Enter answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button className="quiz-btn" onClick={checkAnswer}>Submit</button>

      <p className="msg">{message}</p>
      <p className="score">Score: {score}</p>
    </div>
  );
}

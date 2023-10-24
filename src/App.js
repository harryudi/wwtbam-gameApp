import { useState } from "react";
import "./app.css";
import Trivia from "./components/Trivia";
import moneyPyramid from "./components/MoneyPyramid";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stopGame, setStopGame] = useState(false);
 
  return (
    <div className="app">
      <div className="main">
        <div className="top">
          <div className="timer">30</div>
        </div>
        <div className="bottom">
          <Trivia
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            setStopGame={setStopGame}
          />
        </div>
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m)=>(
            <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
            <span className="moneyListItemNumber">{m.id}</span>
            <span className="moneyListItemAmount">{m.amount}</span>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./app.css";
import Trivia from "./components/Trivia";
import moneyPyramid from "./components/MoneyPyramid";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const [userName, setUserName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stopGame, setStopGame] = useState(false);
  const [earnings, setEarnings]= useState("$0");
 

  useEffect(()=>{
    questionNumber>1 && setEarnings(moneyPyramid.find((m)=>m.id===questionNumber-1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
      {userName ? (
        <>
        <div className="main">
        {stopGame ? (
          <h1 className="endtext">You earned: {earnings}</h1>
        ) : (
          <>  
          <div className="top">
            <div className="timer"><Timer setStopGame={setStopGame} questionNumber={questionNumber}/>
            </div>
          </div>
          <div className="bottom">
          <Trivia
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            setStopGame={setStopGame}
          />
          </div>
          </>
        )}
        
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
        </>
      ) : <Start setUserName={setUserName} />}
      
    </div>
  );
}

export default App;

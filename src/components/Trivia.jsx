import { useEffect, useState } from "react"
import questions from "./QuestionFile";

export default function Trivia({
    
    setGameStop, 
    questionNumber, 
    setQuestionNumber,
}) {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");

    useEffect(() => {
      setCurrentQuestion(questions[questionNumber - 1]);
  }, [questions, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(()=> {
        callback();
    }, duration);
  }

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, ()=> setClassName(a.correct ? "answer correct" : "answer wrong"))
    

    delay(6000, ()=>{
        if (a.correct) {
            setQuestionNumber((prev)=>prev + 1);
            setSelectedAnswer(null);
        } else {
            setGameStop(true);
        }
    });
  };

  return (
    <div className="trivia">
        <div className="question">{currentQuestion?.question}</div>
        <div className="answers">
            {currentQuestion?.options.map((a, index)=>(
                <div  
                className={selectedAnswer === a ? className: "answer"}
                key={index} onClick={()=>handleClick(a)}
                >
                    {a.text}</div>
            ))}
        </div>
    </div>
  );
}

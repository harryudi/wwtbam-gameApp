import { useEffect, useState } from "react"
import questions from "./QuestionFile";
import useSound from "use-sound";
import start from "../assets/play.mp3";
import win from '../assets/win.mp3';
import lose from '../assets/lose.mp3';

export default function Trivia({
    
    setStopGame, 
    questionNumber, 
    setQuestionNumber,
}) {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [startSound]=useSound(start);
    const [winSound]=useSound(win);
    const [loseSound]= useSound(lose);
   

    useEffect(()=>{
        startSound();
    }, [questionNumber]);
    

    useEffect(() => {
      setCurrentQuestion(questions[questionNumber - 1]);
  }, [questions, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(()=> {
        callback();
    }, duration);
  }
//////////////////////to check for correct answer/////////////////////////////

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(1000, ()=> setClassName(a.correct ? "answer correct" : "answer wrong"))
    

    delay(4000, ()=>{
        if (a.correct) {
          winSound()
          delay(1000,()=>{
            setQuestionNumber((prev)=>prev + 1);
          setSelectedAnswer(null);
          });
        } else {
          loseSound()
          delay(1000,()=>{
            setStopGame(true);
          });
            
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

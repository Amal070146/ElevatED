import { useState } from "react";
import styles from "../Quiz.module.css";
import quizSecMainImg from "../quizImage/quizSecMainImg.png";

type Props = {
  item: CourseDisplayType;
};

function QuizPage({ item }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false); // State to toggle result display
  const [score, setScore] = useState(0); // State to store score

  const handleOptionChange = (optionId: number) => {
    setSelectedOptions([optionId]); // Only allow selecting one option
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < item.modules[0].mcq.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let newScore = 0;
    item.modules[0].mcq.forEach((question, index) => {
      if (question.correctAnswer === question.options[selectedOptions[index]]) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowResult(true); // Show result section
  };

  const isNextButtonDisabled = selectedOptions.length === 0;
  const isLastQuestion =
    currentQuestionIndex === item.modules[0].mcq.length - 1;

  return (
    <div className={styles.WrapQuizWrapper}>
      {!showResult && (
        <div className={styles.QuizWrapper}>
          <div className={styles.QuizQuestionsWrapper}>
            <h2 className={styles.QuizHeading}>
              {item.modules[0].mcq[currentQuestionIndex].question}
            </h2>
            {item.modules[0].mcq[currentQuestionIndex].options.map(
              (option, index) => (
                <div className={styles.QuizOptionsWrapper} key={option}>
                  <input
                    type="radio" // Change to radio button to allow selecting only one option
                    checked={selectedOptions[0] === index}
                    onChange={() => handleOptionChange(index)}
                  />{" "}
                  {option}
                </div>
              )
            )}
          </div>
          <div className={styles.buttonss}>
            <button
              style={{ backgroundColor: "#E0E4E4", color: "black" }}
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            {isLastQuestion ? (
              <button onClick={handleSubmit} disabled={isNextButtonDisabled}>
                Submit
              </button>
            ) : (
              <button
                onClick={goToNextQuestion}
                disabled={isNextButtonDisabled}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
      {showResult && (
        <div className={styles.ResultWrapper}>
          <h2>Quiz Result</h2>
          <p>
            Score: {score} / {item.modules[0].mcq.length}
          </p>
          <h3>Answers:</h3>
          {item.modules[0].mcq.map((question, index) => (
            <ul>
              <li key={index}>
                <p>{question.question}</p>
                <p>
                  {" "}
                  <b> Correct Answer:</b> {question.correctAnswer}
                </p>
                {/* <p>Your Answer: {question.options[selectedOptions[index]]}</p> */}
              </li>
            </ul>
          ))}
        </div>
      )}
      <img className={styles.quizSecMainImg} src={quizSecMainImg} alt="" />
    </div>
  );
}

export default QuizPage;

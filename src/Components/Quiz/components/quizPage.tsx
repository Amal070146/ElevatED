import { useState } from "react";
import styles from "../Quiz.module.css";
import quizSecMainImg from "../quizImage/quizSecMainImg.png";

type Props = {
  item: CourseDisplayType;
};

function QuizPage({ item }: Props) {

  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const handleOptionChange = (optionId: number) => {
    setSelectedOptions((_prevSelectedOptions) => {
      const newSelectedOptions = [optionId];
      return newSelectedOptions;
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < item.modules[0].mcq.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
    }
  };

  // New function to handle submission
  const handleSubmit = () => {
    console.log("Quiz submitted");
  };

  const isNextButtonDisabled = selectedOptions.length === 0;

  // Check if it's the last question
  const isLastQuestion = currentQuestionIndex === item.modules[0].mcq.length - 1;
  return (
    <div className={styles.WrapQuizWrapper}>
      <div className={styles.QuizWrapper}>
        {/* Quiz content and other buttons */}
        <div className={styles.QuizQuestionsWrapper}>
          <h2 className={styles.QuizHeading}>
            {item.modules[0].mcq[currentQuestionIndex].question}
          </h2>
          {item.modules[0].mcq[currentQuestionIndex].options.map((option, index) => (
            <div className={styles.QuizOptionsWrapper} key={option}>
              <input
                type="checkbox"
                checked={selectedOptions.includes(index)}
                onChange={() => handleOptionChange(index)}
              />{" "}
              {option}
            </div>
          ))}
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
            <button onClick={goToNextQuestion} disabled={isNextButtonDisabled}>
              Next
            </button>
          )}
        </div>
      </div>
      <img className={styles.quizSecMainImg} src={quizSecMainImg} alt="" />
    </div>
  );
}

export default QuizPage;

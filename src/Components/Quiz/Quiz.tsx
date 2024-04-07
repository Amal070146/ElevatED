import { useState } from "react";
import styles from "./Quiz.module.css";
import quizSecMainImg from "./quizImage/quizSecMainImg.png";

type Props = {};

type Question = {
  id: number;
  questionText: string;
  options: Option[];
};

type Option = {
  id: number;
  text: string;
};

export const Quiz = (_props: Props) => {
  const initialQuestions: Question[] = [
    {
      id: 1,
      questionText: "Q. Whaeqvct is the full form of DBMS?",
      options: [
        { id: 1, text: "DataBase Management System" },
        { id: 2, text: "Data Base Manipulation System" },
        { id: 3, text: "DataBank Management System" },
        { id: 4, text: "Document Base Management System" },
      ],
    },
    {
      id: 2,
      questionText: "Q. What is the full form of DBMS?",
      options: [
        { id: 1, text: "Management System" },
        { id: 2, text: "Data Base System" },
        { id: 3, text: "DataBank Management System" },
        { id: 4, text: "Document Base Management System" },
      ],
    },
    {
      id: 3,
      questionText: "Q. What is the full form of DBeqvMS?",
      options: [
        { id: 1, text: "DataBase Management System" },
        { id: 2, text: "Data Base Manipulation System" },
        { id: 3, text: "DataBank Management System" },
        { id: 4, text: "Document Bawvese Maneveagement System" },
      ],
    },
    {
      id: 4,
      questionText: "Q. What is the full form of DBMSqevqqw?",
      options: [
        { id: 1, text: "Management System" },
        { id: 2, text: "Data Base System" },
        { id: 3, text: "DatsvwaBank Management System" },
        { id: 4, text: "Document Base Management System" },
      ],
    },
    // Add more questions with their options here
  ];

  const [questions] = useState(initialQuestions);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const handleOptionChange = (optionId: number) => {
    setSelectedOptions((_prevSelectedOptions) => {
      const newSelectedOptions = [optionId];
      return newSelectedOptions;
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
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
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className={styles.quizSecWrapper}>
      <h3>QUIZ</h3>
      <div className={styles.WrapQuizWrapper}>
        <div className={styles.QuizWrapper}>
          {/* Quiz content and other buttons */}
          <div className={styles.QuizQuestionsWrapper}>
            <h2 className={styles.QuizHeading}>
              {questions[currentQuestionIndex].questionText}
            </h2>
            {questions[currentQuestionIndex].options.map((option) => (
              <div className={styles.QuizOptionsWrapper} key={option.id}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => handleOptionChange(option.id)}
                />{" "}
                {option.text}
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
              <button
                onClick={goToNextQuestion}
                disabled={isNextButtonDisabled}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <img className={styles.quizSecMainImg} src={quizSecMainImg} alt="" />
      </div>
    </div>
  );
};

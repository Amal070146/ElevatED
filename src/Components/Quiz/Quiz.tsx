import { useState } from "react";
import styles from "./Quiz.module.css";

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
      questionText: "Q. What is the full form of DBMS?",
      options: [
        { id: 1, text: "DataBase Management System" },
        { id: 2, text: "Data Base Manipulation System" },
        { id: 3, text: "DataBank Management System" },
        { id: 4, text: "Document Base Management System" },
      ],
    },
    {
      id: 1,
      questionText: "Q. What is the full form of DBMS?",
      options: [
        { id: 1, text: "Management System" },
        { id: 2, text: "Data Base System" },
        { id: 3, text: "DataBank Management System" },
        { id: 4, text: "Document Base Management System" },
      ],
    },
    {
      id: 1,
      questionText: "Q. What is the full form of DBMS?",
      options: [
        { id: 1, text: "DataBase Management System" },
        { id: 2, text: "Data Base Manipulation System" },
        { id: 3, text: "DataBank Management System" },
        { id: 4, text: "Document Base Management System" },
      ],
    },
    {
      id: 1,
      questionText: "Q. What is the full form of DBMS?",
      options: [
        { id: 1, text: "Management System" },
        { id: 2, text: "Data Base System" },
        { id: 3, text: "DataBank Management System" },
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

  const isNextButtonDisabled = selectedOptions.length === 0;

  return (
    <div className={styles.QuizWrapper}>
      {/* Quiz content and other buttons */}

      <div>
        <h2>{questions[currentQuestionIndex].questionText}</h2>
        {questions[currentQuestionIndex].options.map((option) => (
          <div key={option.id}>
            <input
              type="checkbox"
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleOptionChange(option.id)}
            />{" "}
            {option.text}
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button onClick={goToNextQuestion} disabled={isNextButtonDisabled}>
          Next
        </button>
      </div>
    </div>
  );
};

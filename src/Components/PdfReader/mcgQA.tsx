import { useState } from "react";

type MCQQAProps = {
  text?: string;
};

type QAPair = {
  question: string;
  options: string[];
  correctAnswer: string; // Assume you're adding this to know which is right
};

export const MCQQA = ({ text }: MCQQAProps) => {
  const [qaPairs, setQAPairs] = useState<QAPair[]>([]);
  const noqs = "2"; // Define the number of questions you want to generate

  const handleAskQuestionClick = async () => {
    if (!text) {
      console.error("No text available to send");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/quest/mcq/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context: text, noq: noqs }),
      });
      const data = await response.json(); // Handle response data within async/await

      if (data && data.set) {
        const pairs = data.set.map((item: any) => ({
          question: item.question,
          options: item.options,
          correctAnswer: item.correct_answer,
        }));
        setQAPairs(pairs); // Update state with new data
      } else {
        console.log("No data found");
        setQAPairs([]); // Clear previous data if no new data found
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <button onClick={handleAskQuestionClick}>Ask MCQ Questions</button>
      {qaPairs.length > 0 && (
        <ul>
          {qaPairs.map((pair, index) => (
            <li key={index}>
              <strong>Question:</strong> {pair.question}
              <form style={{ display: "flex", flexDirection: "column" }}>
                {pair.options.map((option, optionIndex) => (
                  <label key={optionIndex}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                    />{" "}
                    {option}
                  </label>
                ))}
              </form>
              <p style={{display:"flex"}}>
                correctAnswer:{" "}
                <p style={{ color: "green" }}>{pair.correctAnswer}</p>
              </p>
              <br></br>
            </li>
          ))}
        </ul>
      )}
      {qaPairs.length === 0 && <p>No questions and answers to display.</p>}
    </div>
  );
};

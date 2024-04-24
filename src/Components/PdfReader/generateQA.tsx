import { useState } from "react";
import styles from "./styles .module.css";

type GenerateQAProps = {
  text?: string;
};

type QAPair = {
  question: string;
  answer: string;
};


export const GenerateQA = ({ text }: GenerateQAProps) => {
  const [qaPairs, setQAPairs] = useState<QAPair[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const noqs = "2"; // Define the number of questions you want to generate

  const handleAskQuestionClick = async () => {
    if (!text) {
      console.error("No text available to send");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/quest/longanswergenerate/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ context: text, noq: noqs }),
        }
      );
      const data = await response.json(); // Handle response data

      if (data && data.set) {
        const pairs = data.set.map((item: QAPair) => ({
          question: item.question,
          answer: item.answer,
        }));
        setQAPairs(pairs); // Update state with new data
      } else {
        console.log("No data found");
        setQAPairs([]); // Clear previous data if no new data found
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false); // End loading
  };

  return (
    <div className={styles.pdfSec}>
      <button onClick={handleAskQuestionClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Ask Long Questions and Answers"}
      </button>
      {isLoading && <div>Loading...</div>}
      {qaPairs.length > 0 && (
        <ul>
          {qaPairs.map((pair, index) => (
            <li key={index}>
              <strong>Question:</strong> {pair.question}
              <br />
              <strong>Answer:</strong> {pair.answer}
            </li>
          ))}
        </ul>
      )}
      {qaPairs.length === 0 && !isLoading && (
        <p>No questions and answers to display.</p>
      )}
    </div>
  );
};

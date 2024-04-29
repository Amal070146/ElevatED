import { useEffect, useState } from "react";
import { useModuleStore } from "../../Sections/Faculties/Pages/Courses/components/IndividualSubjects";
import { supabase } from "../../utils/supabase";
import toast from "react-hot-toast";

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
  const modules = useModuleStore.getState().modules;
  const courseID = useModuleStore.getState().courseID;
  const setModules = useModuleStore((state) => state.setModules);
  const [refresh, setRefresh] = useState(false);
  const moduleID = useModuleStore.getState().moduleID;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    let { data: courses, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseID)
      .single();
    if (error) {
      throw error.message;
    } else if (courses) {
      setModules(courses.modules);
      return courses;
    }
  };

  const handleAskQuestionClick = async () => {
    setRefresh(!refresh);
    if (!text) {
      console.error("No text available to send");
      return;
    }
    setIsLoading(true); // Start loading
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
        savetoDB(pairs);
      } else {
        console.log("No data found");
        setQAPairs([]); // Clear previous data if no new data found
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false); // End loading
  };

  const savetoDB = async (pairs: any[]) => {
    const module = modules.filter((mod) => mod.id === moduleID);
    const updatedModule = { ...module[0], mcq: pairs };
    const filteredModules = modules.filter(
      (mod) => mod.id !== updatedModule.id
    );
    const updatedModules = [...filteredModules, updatedModule];
    const { data: updatedData, error } = await supabase
      .from("courses")
      .update({ modules: updatedModules })
      .eq("id", courseID)
      .select();
    if (error) {
      toast.error(error.message);
    } else if (updatedData) {
      toast.success("MCQ added to Module");
    }
  };

  return (
    <div>
      {/* <button onClick={handleAskQuestionClick}>Ask MCQ Questions</button> */}
      <button onClick={handleAskQuestionClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Ask MCQ Questions"}
      </button>
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
              <p style={{ display: "flex" }}>
                correctAnswer:{" "}
                <p style={{ color: "green" }}>{pair.correctAnswer}</p>
              </p>
              <br></br>
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

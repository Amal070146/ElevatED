type GenerateQAProps = {
  text?: string;
};

export const GenerateQA = ({ text }: GenerateQAProps) => {
  let data;
  const handleAskQuestionClick = async () => {
    if (!text) {
      console.error("No text available to send");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/quest/mcq/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include other necessary headers as required, like authorization headers.
          },
          body: JSON.stringify({
            context: text, // the context text from which answers are generated
            noq: "1", 
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      let data = await response.json();
      console.log("Success:", data);
      // Process the response data as needed
    } catch (error) {
      console.error("Failed to send text to backend:", error);
    }
  };

  return (
    <div>
      {/* {text && <p>{text}</p>} */}
      <button onClick={handleAskQuestionClick}>Ask question</button>
      {data && <p>{data}</p>}
    </div>
  );
};

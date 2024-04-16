type GenerateQAProps = {
  text?: string;
};

export const GenerateQA = ({ text }: GenerateQAProps) => {
  const handleAskQuestionClick = async () => {
    if (!text) {
      console.error("No text available to send");
      return;
    }

    try {
      const response = await fetch("http://0.0.0.0:8001/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include other headers as required, like authorization headers
        },
        body: JSON.stringify({ text: text }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      // Process the response data as needed
    } catch (error) {
      console.error("Failed to send text to backend:", error);
    }
  };

  return (
    <div>
      {text && <p>{text}</p>}
      <button onClick={handleAskQuestionClick}>Ask question</button>
    </div>
  );
};

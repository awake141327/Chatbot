import { useState, useRef } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import "./App.css";

marked.use({
  gfm: true,
});

function App() {
  const [serverData, setServerData] = useState("");
  const [prompt, setPrompt] = useState();

  const inputRef = useRef();

  const handleAnswer = async () => {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });
    const data = await response.json();
    const html = DOMPurify.sanitize(marked(data));
    setServerData({ ...data, html });
  };

  // const handleKeyDown = (e) => {
  //   e.preventDefault();
  // };

  return (
    <main className="app">
      <h1 className="heading">My Prompter</h1>
      <div className="container">
        <div className="article-container">
          <article
            className="article"
            dangerouslySetInnerHTML={{ __html: serverData.html }}
          />
        </div>
      </div>
      <div className="answer-container">
        <textarea
          value={prompt}
          // onKeyDown={handleKeyDown}
          ref={inputRef}
          onChange={(e) => setPrompt(e.target.value)}
          className="text-area"
          placeholder="Type in a prompt..."
        />
        <button className="button" onClick={handleAnswer}>
          Get Answer
        </button>
      </div>
    </main>
  );
}

export default App;

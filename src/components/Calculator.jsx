import { useState, useEffect } from "react";
import "./Calculator.css";
import Header from "./Header";
import History from "./History";
import Footer from "./Footer";
import toast from "react-hot-toast";

function Calculator({ darkMode, setDarkMode }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  // Load History
  useEffect(() => {
    const savedHistory = localStorage.getItem("history");

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save History
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // Add Value
  const handleClick = (value) => {
    if (input === "Error") {
      setInput(value);
      return;
    }

    setInput((prev) => prev + value);
  };

  // Clear Display
  const clearDisplay = () => {
    setInput("");
  };

  // Delete Last Character
  const deleteLast = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  // Clear History
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("history");
  };

  // Copy Result
  const copyResult = async () => {
  if (!input) {
    toast.error("Nothing to copy");
    return;
  }

  try {
    await navigator.clipboard.writeText(input);
    toast.success("Result copied successfully!");
  } catch {
    toast.error("Copy failed");
  }
};

  // Calculate
  const calculate = () => {
    if (!input) return;

    try {
      const expression = input.replace(/%/g, "/100");
      const result = eval(expression);

      const finalResult = result.toString();

      setHistory((prev) => [
        `${input} = ${finalResult}`,
        ...prev.slice(0, 9),
      ]);

      setInput(finalResult);
    } catch {
      setInput("Error");
    }
  };
    // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      if (/^[0-9]$/.test(key)) {
        handleClick(key);
      } else if (["+", "-", "*", "/", ".", "%"].includes(key)) {
        handleClick(key);
      } else if (key === "Enter") {
        e.preventDefault();
        calculate();
      } else if (key === "Backspace") {
        deleteLast();
      } else if (key === "Escape") {
        clearDisplay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  // Calculator Buttons
  const buttons = [
    "AC",
    "⌫",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  const handleButtonClick = (btn) => {
    switch (btn) {
      case "AC":
        clearDisplay();
        break;

      case "⌫":
        deleteLast();
        break;

      case "=":
        calculate();
        break;

      default:
        handleClick(btn);
    }
  };

  return (
    <div className="calculator">

      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <input
        type="text"
        className="display"
        value={input}
        placeholder="0"
        readOnly
      />

      <div className="buttons">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            className={
              btn === "="
                ? "equal"
                : btn === "AC"
                ? "clear"
                : btn === "⌫"
                ? "delete"
                : ["+", "-", "*", "/", "%"].includes(btn)
                ? "operator"
                : "number"
            }
          >
            {btn}
          </button>
        ))}
      </div>

      <History
        history={history}
        clearHistory={clearHistory}
      />

      <Footer
        copyResult={copyResult}
      />

    </div>
  );
}

export default Calculator;
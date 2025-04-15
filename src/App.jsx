import { useState, useEffect, useContext, createContext } from "react";
import Output from "./components/Output.jsx";
import Keyboard from "./components/Keyboard.jsx";
import Warning from "./components/Warning.jsx";
import "./App.css";

const keysArr = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "⌫"],
  ["⇥", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
  ["Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "↵"],
  ["⇧", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "⇧"],
  ["Space"],
];

const capsLockKeysArr = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "⌫"],
  ["⇥", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "↵"],
  ["⇧", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "⇧"],
  ["Space"],
];

const shiftKeysArr = [
  ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "⌫"],
  ["⇥", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|"],
  ["Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "↵"],
  ["⇧", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "⇧"],
  ["Space"],
];

export const keyboardContext = createContext();

function App() {
  const [text, setText] = useState("");
  const [keys, setKeys] = useState(keysArr);
  const [shift, setShift] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [winWidth, setWinWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWinResize = () => {
      setWinWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWinResize);

    return () => {
      window.removeEventListener("resize", handleWinResize);
    };
  }, []);

  useEffect(() => {
    if (shift) {
      setKeys(shiftKeysArr);

      if (capsLock) {
        setCapsLock(false);
      }
    } else {
      setKeys(keysArr);
    }
  }, [shift]);

  const specialKeyHandlers = {
    "⌫": () => {
      setText((prevText) => prevText.slice(0, -1));
    },
    "⇥": () => {
      setText((prevText) => prevText + "    ");
    },
    "Caps Lock": () => {
      if (shift) {
        return;
      }

      if (!capsLock) {
        setKeys(capsLockKeysArr);
        setCapsLock(true);
      } else {
        setKeys(keysArr);
        setCapsLock(false);
      }
    },
    "↵": () => {
      setText((prevText) => prevText + "\n");
    },
    "⇧": () => {
      if (!shift) {
        setShift(true);
      } else {
        setShift(false);
      }
    },
    Space: () => {
      setText((prevText) => prevText + " ");
    },
  };

  const handleKeyClick = (e) => {
    let keyValue = e.target.textContent;
    const specialKeyHandler = specialKeyHandlers[keyValue];

    if (specialKeyHandler) {
      specialKeyHandler();
      return;
    }

    setText((prevText) => prevText + keyValue);
    if (shift) {
      setShift(false);
    }
  };

  return (
    <>
      {winWidth < 900 ? (
        <Warning />
      ) : (
        <>
          <section className="w-full p-4 mb-8 text-center text-2xl font-semibold border-b border-b-blue-200 bg-[var(--header-clr)]">
            <h1>Virtual Keyboard</h1>
          </section>

          <keyboardContext.Provider
            value={{ text, keys, handleKeyClick, capsLock, shift }}
          >
            {/* Textarea */}
            <Output />

            {/* Keyboard component */}
            <Keyboard />
          </keyboardContext.Provider>
        </>
      )}
    </>
  );
}

export default App;

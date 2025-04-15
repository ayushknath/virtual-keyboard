import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { keyboardContext } from "../App.jsx";
import Key from "./Key.jsx";

function Keyboard() {
  const { keys } = useContext(keyboardContext);

  return (
    <main className="w-full flex items-center justify-center">
      <div className="chassis">
        {keys.map((row) => (
          <ul key={uuidv4()} className="key-row">
            {row.map((key) => {
              const isDoubleSpan = key === "↵" || key === "⇧";
              const isSpace = key === "Space";

              const liClasses = `${
                isDoubleSpan ? "col-span-2" : isSpace ? "col-span-full" : ""
              }`;

              return (
                <li key={uuidv4()} className={liClasses}>
                  <Key value={key} />
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </main>
  );
}

export default Keyboard;

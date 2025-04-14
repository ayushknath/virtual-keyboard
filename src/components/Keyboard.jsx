import Key from "./Key.jsx";

function Keyboard({ keys, keyClick, capsLock, shift }) {
  return (
    <main className="w-full flex items-center justify-center">
      <div className="chassis">
        {keys.map((row) => (
          <ul className="key-row">
            {row.map((key) => {
              const isDoubleSpan = key === "↵" || key === "⇧";
              const isSpace = key === "Space";

              const liClasses = `${
                isDoubleSpan ? "col-span-2" : isSpace ? "col-span-full" : ""
              }`;

              return (
                <li className={liClasses}>
                  <Key
                    value={key}
                    keyClick={keyClick}
                    capsLock={capsLock}
                    shift={shift}
                  />
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

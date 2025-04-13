import Key from "./Key.jsx";

function Keyboard({ keys, keyClick, capsLock, shift }) {
  return (
    <main className="w-full flex items-center justify-center">
      <div className="chassis">
        {keys.map((row) => (
          <ul className="key-row">
            {row.map((key) => (
              <Key
                value={key}
                keyClick={keyClick}
                capsLock={capsLock}
                shift={shift}
              />
            ))}
          </ul>
        ))}
      </div>
    </main>
  );
}

export default Keyboard;

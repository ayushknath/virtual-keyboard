import { useContext } from "react";
import { keyboardContext } from "../App.jsx";

function Key({ value }) {
  const {
    handleKeyClick: keyClick,
    capsLock,
    shift,
  } = useContext(keyboardContext);

  const isCapsLockOn = capsLock && value === "Caps Lock";
  const isShiftActive = shift && value === "⇧";

  const buttonClass = `${
    isCapsLockOn || isShiftActive ? "bg-[var(--btn-on-clr)]! " : ""
  }w-full h-full p-2 text-xl rounded-xs bg-[var(--keycap-clr)] transition-transform hover:bg-[var(--keycap-hover-clr)] active:scale-[0.975]`;

  return (
    <button className={buttonClass} onClick={keyClick}>
      {value}
    </button>
  );
}

export default Key;

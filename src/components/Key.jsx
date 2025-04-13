function Key({ value, keyClick, capsLock, shift }) {
  const isDoubleSpan = value === "↵" || value === "⇧";
  const isSpace = value === "Space";
  const isCapsLockOn = capsLock && value === "Caps Lock";
  const isShiftActive = shift && value === "⇧";

  const buttonClass = `
    ${isDoubleSpan ? "col-span-2" : isSpace ? "col-span-full" : ""}
    ${isCapsLockOn || isShiftActive ? "bg-[var(--btn-on-clr)]!" : ""} 
    p-2 text-xl rounded-xs bg-[var(--keycap-clr)] transition-transform hover:bg-[var(--keycap-hover-clr)] active:scale-[0.975]
  `;

  return (
    <button className={buttonClass} onClick={keyClick}>
      {value}
    </button>
  );
}

export default Key;

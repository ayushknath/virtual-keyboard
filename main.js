if (window.innerWidth < 900) {
  document.body.innerHTML = `<p class="text-center text-red-500">This webpage can only be viewed on desktop</p>`;
  throw new Error("Abort script execution");
}

const charsToRender = Array.from(document.querySelectorAll("[data-innerText]"));
const alphabets = Array.from(document.querySelectorAll("[data-alphabet]"));
const shiftables = Array.from(document.querySelectorAll("[data-shiftable]"));
const backspace = document.querySelector("[data-backspace]");
const tab = document.querySelector("[data-tab]");
const capsLock = document.querySelector("[data-capsLock]");
const enter = document.querySelector("[data-enter]");
const shifts = Array.from(document.querySelectorAll("[data-shift]"));
const space = document.querySelector("[data-space]");
const output = document.querySelector("[data-output]");
const buttons = Array.from(document.querySelectorAll("button"));

const shiftChars = '~!@#$%^&*()_+{}|:"<>?'.split("");
const nonShiftChars = "`1234567890-=[]\\;',./".split("");
let isCapsActive = false;
let isShiftActive = false;

// Render characters to output field
charsToRender.forEach((char) => {
  char.addEventListener("click", (e) => {
    output.textContent += e.target.innerText;
  });
});

// Disable shift key
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isShiftActive && !("shift" in button.dataset)) {
      shiftables.forEach((shiftable, index) => {
        shiftable.textContent = nonShiftChars[index];
      });
      alphabets.forEach((alphabet) => {
        alphabet.textContent = alphabet.innerText.toLowerCase();
      });

      shifts.forEach((shift) => {
        shift.classList.remove("bg-sky-400");
        shift.setAttribute("data-shift", "false");
      });
      isShiftActive = false;
    }
  });
});

// Backspace
backspace.addEventListener("click", () => {
  if (output.innerText === "") return;
  output.textContent = output.textContent.slice(
    0,
    output.textContent.length - 1
  );
});

// Caps Lock
const toggleCapsLock = () => {
  if (!isCapsActive) {
    alphabets.forEach((alphabet) => {
      alphabet.textContent = alphabet.innerText.toUpperCase();
    });
    capsLock.classList.add("bg-sky-400");
    isCapsActive = true;
  } else {
    alphabets.forEach((alphabet) => {
      alphabet.textContent = alphabet.innerText.toLowerCase();
    });
    capsLock.classList.remove("bg-sky-400");
    isCapsActive = false;
  }
};

capsLock.addEventListener("click", toggleCapsLock);

// Enter
enter.addEventListener("click", () => {
  output.textContent += "\n";
});

// Spacebar
space.addEventListener("click", () => {
  output.textContent += " ";
});

// Shift
shifts.forEach((shift) => {
  shift.addEventListener("click", () => {
    if (!isShiftActive) {
      shiftables.forEach((shiftable, index) => {
        shiftable.textContent = shiftChars[index];
      });

      !isCapsActive
        ? alphabets.forEach((alphabet) => {
            alphabet.textContent = alphabet.innerText.toUpperCase();
          })
        : alphabets.forEach((alphabet) => {
            alphabet.textContent = alphabet.innerText.toLowerCase();
          });

      shift.classList.add("bg-sky-400");
      isShiftActive = true;
    }
  });
});

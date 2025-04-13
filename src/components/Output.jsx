function Output({ text }) {
  return (
    <section className="w-full flex items-center justify-center">
      <textarea
        className={`${
          !text ? "text-center font-normal" : ""
        } w-[var(--textarea-width)] h-[var(--textarea-height)] px-4 py-3 mb-10 font-medium text-lg text-black bg-[var(--textarea-clr)] rounded-lg resize-none`}
        name="output"
        id="output"
        value={text ? text + "|" : ""}
        placeholder="Text will appear here"
        readOnly
      ></textarea>
    </section>
  );
}

export default Output;

export const handleKeyDown = (
  e: any,
  postContent: string,
  setPostContent: React.Dispatch<React.SetStateAction<string>>
) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === "b" || e.key === "i")) {
    e.preventDefault();

    const { selectionStart, selectionEnd } = e.target;
    const selectedText = postContent.slice(selectionStart, selectionEnd);
    const wrapChar = e.key === "b" ? "**" : "*";

    if (selectedText) {
      const before = postContent.slice(0, selectionStart);
      const after = postContent.slice(selectionEnd);
      setPostContent(`${before}${wrapChar}${selectedText}${wrapChar}${after}`);

      setTimeout(() => {
        e.target.setSelectionRange(
          selectionStart + wrapChar.length,
          selectionEnd + wrapChar.length
        );
      }, 0);
    } else {
      const cursorPos = selectionStart;
      const before = postContent.slice(0, cursorPos);
      const after = postContent.slice(cursorPos);
      setPostContent(`${before}${wrapChar}${wrapChar}${after}`);

      setTimeout(() => {
        e.target.setSelectionRange(
          cursorPos + wrapChar.length,
          cursorPos + wrapChar.length
        );
      }, 0);
    }
  }
};

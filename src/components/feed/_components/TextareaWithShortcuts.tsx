import React from "react";
import styles from "../feed.module.sass";

const TextareaWithShortcuts = React.forwardRef<
  HTMLTextAreaElement,
  {
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement>;
    error: string;
  }
>(({ value, onChange, onKeyDown, error }, ref) => (
  <div className={styles.textareaContainer}>
    <textarea
      ref={ref}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="✍️ Write something here..."
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
));

TextareaWithShortcuts.displayName = "TextareaWithShortcuts";

export default TextareaWithShortcuts;

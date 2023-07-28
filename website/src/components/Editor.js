import React, { useState, useEffect } from "react";
import { $getRoot, $getSelection } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import styles from "./styles/editor.module.sass";

function onChange(editorState) {
  editorState.read(() => {
    const root = $getRoot();
    const selection = $getSelection();
    console.log(root, selection);
  });
}

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.focus();
  }, [editor]);
  return null;
}

function onError(errors) {
  console.log(errors);
}

const theme = {};

function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={styles["editor-container"]}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className={styles["editor-input"]} />
          }
          placeholder={
            <div className={styles["placeholder"]}>Enter Some Text ...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
      </div>
    </LexicalComposer>
  );
}

export default Editor;

import React, { FC, useRef } from 'react';
import Editor from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

import type { editor } from 'monaco-editor';
import { useThemeContext } from '../../../context/theme-context';

import { CODE_EDITOR_LANGUAGE } from '../../../utils/contants';

interface CodeEditorProps {
  defaultValue: string | undefined;
  onChange(value: string | undefined): void;
}

const CodeEditor: FC<CodeEditorProps> = ({ defaultValue, onChange }) => {
  const { state: theme } = useThemeContext();
  const codeEditorRef = useRef<editor.IStandaloneCodeEditor>();

  const onMountHandler = (codeEditor: editor.IStandaloneCodeEditor) => {
    codeEditorRef.current = codeEditor;
  };

  const onChangeHandler = (code: string | undefined) => {
    onChange(code);
  };

  const onClick = () => {
    const unformattedCode = codeEditorRef.current?.getValue();

    if (typeof unformattedCode == 'string') {
      const formattedCode = prettier.format(unformattedCode, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true
      });

      codeEditorRef.current?.setValue(formattedCode);
    }
  };

  return (
    <div>
      <button onClick={onClick}>Format Code!</button>
      <Editor
        height={500}
        width="100%"
        defaultValue={defaultValue}
        language={CODE_EDITOR_LANGUAGE}
        theme={theme == 'light' ? 'light' : 'vs-dark'}
        onMount={onMountHandler}
        onChange={onChangeHandler}
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2
        }}
      />
    </div>
  );
};

export default CodeEditor;

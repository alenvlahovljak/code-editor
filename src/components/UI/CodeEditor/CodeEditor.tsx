import React, { useRef, FC } from 'react';
import { useTranslation } from 'react-i18next';
import Editor from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import type { editor } from 'monaco-editor';
import { PrimaryButton } from '../../UI';
import { Loader } from '../../animations';
import { useThemeContext } from '../../../context/theme-context';

import { CODE_EDITOR_LANGUAGE } from '../../../utils/contants';
import { useDebounce } from 'hooks';

interface CodeEditorProps {
  defaultValue: string | undefined;
  isBuilding?: boolean;
  onChange(value: string | undefined): void;
}

const CodeEditor: FC<CodeEditorProps> = ({ defaultValue, isBuilding, onChange }) => {
  const { state: theme } = useThemeContext();
  const { t } = useTranslation();

  const codeEditorRef = useRef<editor.IStandaloneCodeEditor>();
  const [debouncedFormat, format, setFormat] = useDebounce<boolean>(false, 100);

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
    <div
      style={{ position: 'relative' }}
      onMouseOver={() => setFormat(!format)}
      onMouseOut={() => setFormat(!format)}>
      {debouncedFormat && (
        <PrimaryButton
          onClick={onClick}
          style={{ position: 'absolute', zIndex: 2, right: '1%', top: '1%' }}>
          {t('format')}
        </PrimaryButton>
      )}
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
      {isBuilding && <Loader size="1rem" left="1%" bottom="2%" />}
    </div>
  );
};

export default CodeEditor;

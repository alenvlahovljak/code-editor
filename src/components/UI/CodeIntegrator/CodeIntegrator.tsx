import React, { useState, useEffect, useRef, FC, ChangeEvent } from 'react';
import * as esbuild from 'esbuild-wasm';
import { useTranslation } from 'react-i18next';
import { Grid, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CodeEditor } from 'UI';

import { autoPathPlugin } from '../../../plugins/auto-path-plugin';
import { htmlDocument } from '../../../utils/helpers';

import { WASM_URL, DEFAULT_INPUT } from '../../../utils/contants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  })
);

const CodeIntegrator: FC = () => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const wasmRef = useRef<esbuild.Service | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [input, setInput] = useState<string | undefined>(DEFAULT_INPUT);

  const startService = async () => {
    wasmRef.current = await esbuild.startService({
      wasmURL: WASM_URL
    });
  };

  useEffect(() => {
    startService().then(() => console.log("WASM's service has started!", wasmRef.current));
  }, []);

  const onClick = async () => {
    if (!wasmRef.current || !iframeRef.current?.srcdoc || !iframeRef.current?.contentWindow) {
      return;
    }

    // it's srcdoc not srcDoc
    iframeRef.current.srcdoc = htmlDocument(i18n.language);

    const result = await wasmRef.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [autoPathPlugin(input)],
      define: {
        'process.env.NODE_ENV': `"production"`,
        global: 'window'
      }
    });
    console.log('Build:', result);

    // emit message
    iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <CodeEditor
            defaultValue={input}
            onChange={(code: string | undefined) => setInput(code)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <iframe
            ref={iframeRef}
            title="Code Preview"
            sandbox="allow-scripts"
            srcDoc={htmlDocument(i18n.language)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Button variant="contained" color="primary" onClick={onClick}>
            {t('button')}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CodeIntegrator;

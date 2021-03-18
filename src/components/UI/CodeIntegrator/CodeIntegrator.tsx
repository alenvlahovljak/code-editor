import React, { useState, useEffect, useRef, FC, ChangeEvent } from 'react';
import * as esbuild from 'esbuild-wasm';
import { useTranslation } from 'react-i18next';
import { Grid, TextareaAutosize, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { autoPathPlugin } from '../../../plugins/auto-path-plugin';

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
  const { t } = useTranslation();
  const classes = useStyles();
  const wasmRef = useRef<any>();
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [output, setOutput] = useState('');

  const startService = async () => {
    wasmRef.current = await esbuild.startService({
      wasmURL: WASM_URL
    });
  };

  useEffect(() => {
    startService().then(() => console.log("WASM's service has started!", wasmRef.current));
  }, []);

  const onClick = async () => {
    if (!wasmRef.current) {
      return;
    }

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

    setOutput(result.outputFiles[0].text);
    console.log('Build:', result);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <TextareaAutosize
            rowsMin={9}
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextareaAutosize readOnly rowsMin={9} value={output} />
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

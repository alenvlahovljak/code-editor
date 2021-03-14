import React, { useState, FC, ChangeEvent } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Translate as TranslateIcon } from '@material-ui/icons';

import type { ILangPicker } from 'types/components/UI/types';
import { WHITELIST_LANGUAGES } from '../../../utils/contants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'block',
      marginTop: theme.spacing(2)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    value: {
      color: 'white'
    }
  })
);

const LanguagePicker: FC = () => {
  const { i18n, t } = useTranslation();
  const classes = useStyles();
  const [lang, setLang] = useState<string>('en');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          native={false}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={lang}
          onChange={(e: ChangeEvent<ILangPicker>) =>
            i18n
              .changeLanguage(e.target.value as string)
              .then(() => setLang(e.target.value as string))
          }
          renderValue={(language) => (
            <div className={classes.item}>
              <TranslateIcon style={{ fill: 'white' }} />
              <span className={classes.value}>{t(`navigation.languages.${language}.name`)}</span>
            </div>
          )}>
          {WHITELIST_LANGUAGES.map((language) => (
            <MenuItem key={language} value={language}>
              {t(`navigation.languages.${language}.name`)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default LanguagePicker;

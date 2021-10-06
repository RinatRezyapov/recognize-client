import * as React from 'react';
import { IconButton } from '@mui/material';
import Ru from '../../assets/icons/ru';
import En from '../../assets/icons/en';
import { useI18n } from '../../hooks/useI18n';

interface IProps {

}

const LanguageSelector: React.FunctionComponent<IProps> = () => {

  const { language, changeLanguage } = useI18n();

  const onEngLanguageChange = () => {
    changeLanguage(language === 'en' ? 'ru' : 'en');
  }

  return (
    <IconButton onClick={onEngLanguageChange}>
      {
        language === 'ru' ?
          <Ru /> :
          <En />
      }
    </IconButton>
  )
}

export default LanguageSelector;

import * as React from 'react';
import { useState, useEffect } from 'react';
import { isNone, Option } from 'fp-ts/lib/Option';
import { History } from 'history';
import styled from '@emotion/styled'

import TextField from '@material-ui/core/TextField';
import { green, red, teal } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import { Course, ME, Id } from '../../api/entities';

import CourseViewerDrawer from '../CourseViewerDrawer';

import { getRandomInt } from '../../utils/random';

import './CourseViewer.scss';

const drawerWidth = 300;

const StyledDiv = styled.div<{ background: string }>`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 0 0 0;
    background-color: ${props => props.background};
    transition: background-color 0.25s linear;
    color: palevioletred;
    font-size: 1.5em;
    text-align: center;
  `;

const StyledSpan = styled.div`
    color: white;
    font-size: 2em;
    text-align: center;
    padding: 15px;
    min-height: 100px;
  `;

interface IProps {
  course: Option<ME<Course>>;
  match: any;
  history: History;
  changeAppHeaderVisibility: (visible: boolean) => void;
  changeFabButtonVisibility: (visible: boolean) => void;
  fetchCourse: (courseId: Id<Course>) => void;
}

const CourseViewer: React.FunctionComponent<IProps> = ({
  course,
  match,
  changeAppHeaderVisibility,
  changeFabButtonVisibility,
  fetchCourse,
  history,
}) => {
  console.log(match)
  useEffect(() => {
    if (isNone(course)) {
      fetchCourse(match.params.courseId);
    }
  }, []);

  const data = course
    .chain(v => v.entity.data)
    .getOrElse('')
    .replace(/[^\w\s]|_/g, '')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .split(' ')

  const [pause, setPause] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [userInput, setUserInput] = useState('');
  const [intervalMs, setIntervalMs] = useState(1000);
  const [wordsCount, setWordsCount] = useState(2);
  const [background, setBackground] = useState<string>(teal[100]);
  const [phraseVisibility, setPhraseVisibility] = useState(true);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  useEffect(() => {
    changeAppHeaderVisibility(false);
    changeFabButtonVisibility(false);

    return () => {
      changeAppHeaderVisibility(true);
      changeFabButtonVisibility(true);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isNone(course)) {
        return
      }
      if (pause) {
        return
      }
      setBackground(teal[100]);
      const pharse = [...Array(wordsCount)].map(e => data[getRandomInt(0, data.length)]).join(' ');
      setCurrentPhrase(pharse);
      setPhraseVisibility(true);
      setTimeout(() => setPhraseVisibility(false), intervalMs);
      setPause(true);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [pause, course]);

  const onUserInputSubmit = (e: any) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      if (userInput === currentPhrase) {
        setBackground(green[300]);
        setUserInput('');
        setPause(false);
      } else {
        setBackground(red[300]);
        setUserInput('');
        setPause(false);
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onUserInputSubmit);

    return () => document.removeEventListener('keydown', onUserInputSubmit);
  }, [userInput, currentPhrase]);

  const handleDrawerOpen = () => setDrawerOpen(true);

  const handleDrawerClose = () => setDrawerOpen(false);

  const onUserInputChange = (e: any) => setUserInput(e.target.value);

  const onIntervalMsChange = (value: number) => setIntervalMs(value);

  const onWordsCountChange = (value: number) => setWordsCount(value);

  const onClose = () => history.push(`/profile`);

  return (
    <div className='CourseViewer__container'>
      <StyledDiv background={background}>
        <div className='CourseViewer__clear-iconbutton'>
          <IconButton onClick={onClose}>
            <ClearIcon className='CourseViewer__clear-icon' />
          </IconButton>
        </div>
        <div className='CourseViewer__expand-iconbutton'>
          <IconButton onClick={handleDrawerOpen}>
            <KeyboardArrowLeftIcon className='CourseViewer__expand-icon' />
          </IconButton>
        </div>
        <StyledSpan>
          {phraseVisibility && currentPhrase}
        </StyledSpan>
        <TextField
          variant='outlined'
          value={userInput}
          onChange={onUserInputChange}
        />
      </StyledDiv>
      <CourseViewerDrawer
        drawerOpen={drawerOpen}
        intervalMs={intervalMs}
        wordsCount={wordsCount}
        handleDrawerClose={handleDrawerClose}
        onIntervalMsChange={onIntervalMsChange}
        onWordsCountChange={onWordsCountChange}
      />
    </div>
  );
}

export default CourseViewer;

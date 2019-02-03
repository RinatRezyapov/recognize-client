import * as React from 'react';
import { useState, useEffect } from 'react';
import { fromNullable, isNone } from 'fp-ts/lib/Option';

import { Course, ME, Id } from '../api/entities';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { green, red, teal } from '@material-ui/core/colors';
import styled from '../typings/styledComponents';
import { getRandomInt } from '../utils/random';

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
  userCourses: Array<ME<Course>>;
  match: any;
  hideAppHeader: () => void;
  hideFabButton: () => void;
  fetchCourse: (courseId: Id<Course>) => void;
}

const CourseViewer = ({
  userCourses,
  match,
  hideAppHeader,
  hideFabButton,
  fetchCourse,
}: IProps) => {

  const course = fromNullable(userCourses.filter(v => v.id.value === match.params.courseId)[0]);

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
  const [background, setBackground] = useState(teal[100]);
  const [phraseVisibility, setPhraseVisibility] = useState(true);

  useEffect(() => {
    hideAppHeader();
    hideFabButton();
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
      const pharse = data[getRandomInt(0, data.length)] + ' ' + data[getRandomInt(0, data.length)];
      setCurrentPhrase(pharse);
      setPhraseVisibility(true);
      setTimeout(() => setPhraseVisibility(false), 500);
      setPause(true);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [pause, course]);

  useEffect(() => {
    document.addEventListener('keydown', onUserInputSubmit);

    return () => document.removeEventListener('keydown', onUserInputSubmit);
  }, [userInput, currentPhrase]);

  const onUserInputChange = (e: any) => {
    setUserInput(e.target.value)
  }

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

  return (

    <Grid
      container={true}
      justify='center'
      alignItems='center'
      direction='column'
      style={{ flex: 1 }}
    >
      <StyledDiv
        background={background}
      >
        <StyledSpan>{phraseVisibility && currentPhrase}</StyledSpan>
        <TextField
          variant='outlined'
          value={userInput}
          onChange={onUserInputChange}
        />
      </StyledDiv>
    </Grid>
  );
}

export default CourseViewer;

import * as React from 'react';
import { useEffect } from 'react';
import { Option, none, fromNullable } from 'fp-ts/lib/Option';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography';

import { Course, ME, User, Id } from '../api/entities';
import CourseCard from './CourseCard';
import { useI18n } from '../hooks/useI18n';
import AvatarComponent from './AvatarComponent';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Dropzone from 'react-dropzone';
import { uploadFile } from '../thunks/files';
import update from 'immutability-helper';
import PlaceholderCourseCard from './PlaceholderCourseCard';

interface IProps {
  history: any;
  userIdOpt: Option<Id<User>>;
  userNameOpt: Option<string>;
  userAvatarOpt: Option<Id<File>>;
  courses: Array<ME<Course>>;
  userCourses: Array<Id<Course>>;
  fetchCoursesByUserId(userId: Id<User>): void;
  fetchCoursesByIds(courseIds: Array<Id<Course>>): void;
  createCourse(course: Course): void;
  deleteCourse(userId: Id<User>, courseId: Id<Course>): void;
  updateCourse(courseId: Id<Course>, data: { [key: string]: any }): void;
  updateUser(userId: Id<User>, data: { [key: string]: any }): void;
  uploadCourseFile(courseId: Id<Course>, file: ArrayBuffer): void;
}

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'transparent',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'transparent',
});

const Profile: React.FunctionComponent<IProps> = ({
  history,
  userIdOpt,
  userNameOpt,
  userAvatarOpt,
  userCourses,
  courses,
  fetchCoursesByUserId,
  fetchCoursesByIds,
  createCourse,
  deleteCourse,
  updateCourse,
  updateUser,
  uploadCourseFile,
}: IProps) => {

  const { t } = useI18n();

  useEffect(() => {
    fetchCoursesByIds(userCourses)
  }, []);

  const onCourseDelete = (courseId: Id<Course>) => {
    userIdOpt.map((v: Id<User>) => deleteCourse(v, courseId));
  }

  const onAvatarFileDrop = (files: any) => {
    if (files.length === 0) {
      return
    }
    const file = files[files.length - 1];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
      fromNullable(reader.result)
        .map(result => {
          uploadFile(result as any)
            .then(response => {
              userIdOpt.map(userId => updateUser(userId, { avatar: fromNullable(response) }))
            })
        })
    }
  }

  const userName = userNameOpt.getOrElse('Username is undefined');

  const onDragEnd = (result: DropResult) => {
    fromNullable(result.destination).map(resultDestination => {
      const source = userCourses[result.source.index];

      const removedSource = update(userCourses, {
        $splice: [[result.source.index, 1]]
      })

      const newCourses = update(removedSource, {
        $splice: [[resultDestination.index, 0, source]]
      })

      userIdOpt.map(userId => updateUser(userId, { courses: newCourses }))
    })

  }

  const getCourseById = (courseId: Id<Course>) => {
    return fromNullable(courses.filter(course => courseId.value === course.id.value)[0])
  }

  return (
    <Grid container={true} justify='center' style={{ padding: '15px 0 0 0' }}>
      <Grid item={true} style={{ margin: '15px 0' }}>
        <Paper style={{ padding: '15px' }}>
          <Typography
            variant='h6'
            gutterBottom={true}
            style={{
              width: 200,
              overflow: 'hidden',
              textAlign: 'center',
              textOverflow: 'ellipsis',
            }}
          >
            {userName}
          </Typography>
          <Dropzone
            onDrop={onAvatarFileDrop}
            accept='image/*'
            style={{ border: 'none' }}
          >
            {(props) => <Tooltip title={t('Upload')} placement='bottom'>
              <AvatarComponent
                userAvatar={userAvatarOpt}
                userName={userNameOpt}
                size={'large'}
                tooltipTitle={none}
                onClick={() => { return }}
              />
            </Tooltip>}
          </Dropzone>
        </Paper>
      </Grid>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided, snapshot) => (
            <div 
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <div style={{ margin: '15px 15px' }} >
                {userCourses.map((courseId, idx) =>
                    getCourseById(courseId).map(course =>
                      <Draggable key={course.id.value} draggableId={course.id.value} index={idx}>
                        {(draggableProvided, draggableSnapshot) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            style={getItemStyle(
                              draggableSnapshot.isDragging,
                              draggableProvided.draggableProps.style
                            )}
                          >
                            <CourseCard
                              key={course.id.value}
                              course={course}
                              currentUserIdOpt={userIdOpt}
                              courseOwnerNameOpt={userNameOpt}
                              courseOwnerAvatarOpt={userAvatarOpt}
                              history={history}
                              onCourseDelete={onCourseDelete}
                              updateCourse={updateCourse}
                              uploadCourseFile={uploadCourseFile}
                            />
                          </div>
                        )}
                      </Draggable>
                    ).getOrElse(<></>)
                )}
                {userCourses.length === 0 &&
                  <PlaceholderCourseCard
                    userIdOpt={userIdOpt}
                    createCourse={createCourse}
                  />
                }
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Grid>
  );
}

export default Profile;

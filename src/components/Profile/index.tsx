import * as React from 'react';
import { useEffect } from 'react';
import update from 'immutability-helper';
import { Option, fromNullable, some } from 'fp-ts/lib/Option';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { History } from 'history';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Course, ME, User, Id } from '../../api/entities';

import AvatarComponent from '../AvatarComponent';
import PlaceholderCourseCard from '../PlaceholderCourseCard';
import ImageCropper from '../ImageCropper/ImageCropper';
import DropzoneRenderer from '../DropzoneRenderer';
import CourseCard from '../CourseCard';

import { useI18n } from '../../hooks/useI18n';
import { useMaterialDialog } from '../../hooks/useMaterialDialog';

import { uploadFile } from '../../thunks/files';

import { getListStyle, getItemStyle } from '../../utils/dnd';
import { UNDEFINED_MESSAGE } from '../../utils/constants';

import './Profile.scss';
import { headOption } from '../../utils/fp-ts';

interface IProps {
  history: History;
  userIdOpt: Option<Id<User>>;
  userNameOpt: Option<string>;
  userAvatarOpt: Option<Id<File>>;
  courses: Array<ME<Course>>;
  userCourses: Array<Id<Course>>;
  fetchCoursesByIds(courseIds: Array<Id<Course>>): void;
  createCourse(course: Course): void;
  deleteCourse(userId: Id<User>, courseId: Id<Course>): void;
  updateCourse(courseId: Id<Course>, data: { [key: string]: any }): void;
  updateUser(data: { [key: string]: any }): void;
}

const Profile: React.FunctionComponent<IProps> = ({
  history,
  userIdOpt,
  userNameOpt,
  userAvatarOpt,
  userCourses,
  courses,
  fetchCoursesByIds,
  createCourse,
  deleteCourse,
  updateCourse,
  updateUser,
}) => {

  const { t } = useI18n();

  useEffect(() => {
    fetchCoursesByIds(userCourses);
  }, []);

  const { openDialog, closeDialog, renderDialog } = useMaterialDialog();

  const onCourseDelete = (courseId: Id<Course>) =>
    userIdOpt.map((v: Id<User>) => deleteCourse(v, courseId));

  const uploadCropResult = (result: any) =>
    uploadFile(result).then(response =>
      updateUser({ avatar: fromNullable(response) })
    );

  const onAvatarFileDrop = (resultOpt: Option<string>) =>
    resultOpt.map(resultVal => {
      const dialogId = openDialog(
        t('Crop image'),
        (
          <div className='Profile__image-cropper-container'>
            <ImageCropper
              src={resultVal}
              minCropBoxWidth={some(300)}
              minCropBoxHeight={some(300)}
              aspectRatio={1}
              cropBoxMovable={true}
              cropBoxResizable={false}
              cropperWidth={300}
              cropperHeight={300}
              onCropResult={uploadCropResult}
              closeDialog={() => closeDialog(dialogId)}
            />
          </div>
        ),
        [],
      )
    })

  const userName = userNameOpt.getOrElse(t(UNDEFINED_MESSAGE));

  const onDragEnd = (result: DropResult) => fromNullable(result.destination).map(rD => {
      const source = userCourses[result.source.index];

      const removedSource = update(userCourses, {
        $splice: [[result.source.index, 1]]
      })

      const newCourses = update(removedSource, {
        $splice: [[rD.index, 0, source]]
      })

      updateUser({ courses: newCourses });
    })

  const getCourseById = (courseId: Id<Course>) => headOption(courses.filter(course =>
    courseId.value === course.id.value
  ))

  const renderLeftPanel = () =>
    (
      <Paper className='Profile__leftPanelPaper' variant='outlined' elevation={0}>
        <Typography
          variant='h6'
          gutterBottom={true}
          className='Profile__userNameTypography'
        >
          {userName}
        </Typography>
        <DropzoneRenderer
          accept='image/*'
          onDropResult={onAvatarFileDrop}
        >
          <AvatarComponent
            userAvatar={userAvatarOpt}
            userName={userNameOpt}
            size='large'
            title={some(t('Upload photo'))}
            onClick={() => { return }}
          />
        </DropzoneRenderer>
      </Paper>
    )

  const renderRightPanel = () =>
    (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
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
                        />
                      </div>
                    )}
                  </Draggable>
                ).getOrElse(<div />)
              )}
              {userCourses.length === 0 &&
                <PlaceholderCourseCard
                  userIdOpt={userIdOpt}
                  createCourse={createCourse}
                />
              }
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )

  return (
    <div className='Profile__container'>
      <div className='Profile__leftPanelContainer'>
        {renderLeftPanel()}
      </div>
      <div className='Profile__rightPanelContainer'>
        {renderRightPanel()}
      </div>
      {renderDialog()}
    </div>
  );
}

export default Profile;

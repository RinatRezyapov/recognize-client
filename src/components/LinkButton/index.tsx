
import * as React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { PropTypes } from '@material-ui/core';

import './LinkButton.scss';

interface IProps {
  path: string;
  children: React.ReactNode;
  color?: PropTypes.Color;
  variant: 'text' | 'flat' | 'outlined' | 'contained' | 'raised' | 'fab' | 'extendedFab';
}

const LinkButton: React.FunctionComponent<IProps> = ({
  path,
  children,
  color,
  variant,
}) => {

  return (
    <Link
      className='LinkButton__link'
      to={path}
    >
      <Button
        color={color}
        style={{ color: 'white' }}
        variant={variant}
      >
        {children}
      </Button>
    </Link>
  )
}

export default LinkButton

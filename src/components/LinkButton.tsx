
import * as React from 'react';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { PropTypes } from '@material-ui/core';

interface IProps {
  path: string;
  children: any;
  color: PropTypes.Color;
  variant: 'text' | 'flat' | 'outlined' | 'contained' | 'raised' | 'fab' | 'extendedFab';
}

const LinkButton = ({
  path,
  children,
  color,
  variant,
}: IProps) => {

  return (
    <Link
      to={path}
      style={{ textDecoration: 'none' }}
    >
      <Button
        color={color}
        variant={variant}
      >
        {children}
      </Button>
    </Link>
  )
}

export default LinkButton

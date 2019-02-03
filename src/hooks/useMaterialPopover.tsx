import * as React from 'react';
import { useState } from 'react';

import Popover, { PopoverOrigin } from '@material-ui/core/Popover';
import { Option, none } from 'fp-ts/lib/Option';

export const useMaterialPopover = () => {

  interface IState {
    open: boolean;
    anchorEl: Option<HTMLElement>;
    body: Option<React.ReactElement<any>>;
    anchorOrigin: Option<PopoverOrigin>;
    transformOrigin: Option<PopoverOrigin>;
  }

  const initialState: IState = {
    open: false,
    anchorEl: none,
    body: none,
    anchorOrigin: none,
    transformOrigin: none,
  }

  const [attr, setAttr] = useState(initialState);

  const openPopover = (
    anchorEl: Option<HTMLElement>,
    body: Option<React.ReactElement<any>>,
    anchorOrigin: Option<PopoverOrigin>,
    transformOrigin: Option<PopoverOrigin>,
  ) => {
    setAttr({ open: true, anchorEl, body, anchorOrigin, transformOrigin });
  }

  const closePopover = () => {
    setAttr({ open: false, anchorEl: none, body: none, anchorOrigin: none, transformOrigin: none });
  }

  const renderPopover = () =>
    attr.anchorEl.map(anchorEl =>
      attr.body.map(body =>
        (
          <Popover
            open={attr.open}
            anchorEl={anchorEl}
            anchorOrigin={attr.anchorOrigin.getOrElse({ horizontal: 'left', vertical: 'bottom' })}
            transformOrigin={attr.transformOrigin.getOrElse({ horizontal: 'left', vertical: 'top' })}
            onClose={closePopover}
          >
            {body}
          </Popover>
        ),
      )
      .getOrElse(<></>),
    )
    .getOrElse(<></>)

  return ({ openPopover, closePopover, renderPopover });
}

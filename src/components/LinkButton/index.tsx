import styled from "@emotion/styled";
import { PropTypes } from "@mui/material";
import Button, { ButtonPropsColorOverrides } from "@mui/material/Button";
import * as React from "react";
import { Link } from "react-router-dom";
interface IProps {
  to: string;
  children: React.ReactNode;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  type?: "light" | "dark";
  disabled?: boolean;
  variant: any; // TODO
}

const LinkButton: React.FunctionComponent<IProps> = ({
  to,
  children,
  color,
  type = "dark",
  disabled,
  variant,
}) => {
  const RenderedButton = type === "light" ? LightButton : Button;

  return (
    <StyledLink to={to}>
      <RenderedButton disabled={disabled} color={color} variant={variant}>
        {children}
      </RenderedButton>
    </StyledLink>
  );
};

export default LinkButton;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const LightButton = styled(Button)`
  border-color: rgb(255, 255, 255, 0.3);
  color: rgb(255, 255, 255, 0.7);
  &:hover {
    border-color: rgb(255, 255, 255, 1);
    color: rgb(255, 255, 255, 1);
  }
`;

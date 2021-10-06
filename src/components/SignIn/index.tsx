import styled from "@emotion/styled";
import { Divider, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { isSome, Option } from "fp-ts/lib/Option";
import * as React from "react";
import { Redirect } from "react-router-dom";
import SignInForm from "../../forms/SignInForm";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./SignIn.scss";
interface IProps {
  token: Option<string>;
  userSignIn: (login: string, password: string) => void;
}

const SignIn: React.FunctionComponent<IProps> = ({ token, userSignIn }) => {
  const handleOnClick = (values: any) => {
    return userSignIn(values.login, values.password);
  };

  if (isSome(token)) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="SignIn__container">
      <TheEye />
      <Container variant='outlined' elevation={0}>
        <SignInForm onSubmit={handleOnClick} />
        <VerticalDivider orientation="vertical" flexItem />
        <Typography variant="body2">
          This is a digital tachistoscope inspired by Samuel's Renshaw
          tachistoscopic training. He believed that most people used only
          one-fifth of their available mind-power to process information. By
          using methods of flashing pages he produced students who could read
          upwards of 1,200 to 1,400 words per minute.
        </Typography>
      </Container>
    </div>
  );
};

export default SignIn;

const Container = styled(Paper)`
  display: flex;
  flex-direction: row;
  max-width: 500px;
  padding: 2rem;
  background-color: white;
`;

const VerticalDivider = styled(Divider)`
  margin: 0 2rem 0 2rem;
`;

const TheEye = styled(VisibilityOutlinedIcon)`
  position: absolute;
  color: white;
  font-size: 100rem;
  top: -600px;
  left: -400px;
  opacity: 0.2;
`;

import styled from "@emotion/styled";
import { Button, Paper } from "@material-ui/core";
import { isSome, Option } from "fp-ts/lib/Option";
import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import SignUpForm from "../../forms/SignUpForm";
import { useI18n } from "../../hooks/useI18n";
import LinkButton from "../LinkButton";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import "./SignUp.scss";

interface IProps {
  token: Option<string>;
  userSignUp: (login: string, password: string, name: string) => void;
}

const SignUp: React.FunctionComponent<IProps> = ({ token, userSignUp }) => {
  const { t } = useI18n();

  const handleOnClick = (values: any) => {
    userSignUp(values.login, values.password, values.name);
  };

  if (isSome(token)) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="SignUp__container">
      <TheEye />
      <Paper className="SignUp__paper">
        <SignUpForm onSubmit={handleOnClick} />
      </Paper>
      <LinkButtonContainer>
        <LinkButton to="/" color="secondary" type="light" variant="outlined">
          {t("Back")}
        </LinkButton>
      </LinkButtonContainer>
    </div>
  );
};

export default SignUp;

const LinkButtonContainer = styled.div`
  margin-top: 1rem;
`;

const TheEye = styled(VisibilityOutlinedIcon)`
  position: absolute;
  color: white;
  font-size: 100rem;
  top: -600px;
  left: -400px;
  opacity: 0.2;
`;
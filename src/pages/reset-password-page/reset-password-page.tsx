import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ResetPasswordForm } from "../../components/forms";
import LoginLayoutContainer from "../../layouts/login-layout-container/login-layout-container";
import MainAllLayouts from "../../layouts/main-all-layouts/main-all-layouts";
import { ILocationState } from "../../models/routes";
import { FORGOT_PASSWORD_PATH } from "../../routes/constants-path";


export default function ResetPasswordPage() {
  const location = useLocation<ILocationState>();
  const history = useHistory();

  if (
    !(
      location.state &&
      location.state.prevPath &&
      location.state.prevPath === FORGOT_PASSWORD_PATH
    )
  ) {
    history.push(FORGOT_PASSWORD_PATH);
  }

  return (
    <MainAllLayouts>
      <LoginLayoutContainer>
        <ResetPasswordForm />
      </LoginLayoutContainer>
    </MainAllLayouts>
  );
}

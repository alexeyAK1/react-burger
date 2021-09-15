import React from "react";

import MainAllLayouts from "../../layouts/main-all-layouts/main-all-layouts";
import LoginLayoutContainer from "../../layouts/login-layout-container/login-layout-container";
import { ForgotPasswordForm } from "../../components/forms";

export default function ForgotPasswordPage() {
  return (
    <MainAllLayouts>
      <LoginLayoutContainer>
        <ForgotPasswordForm/>
      </LoginLayoutContainer>
    </MainAllLayouts>
  );
}

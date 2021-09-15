import React from "react";

import MainAllLayouts from "../../layouts/main-all-layouts/main-all-layouts";
import LoginLayoutContainer from "../../layouts/login-layout-container/login-layout-container";
import { ResetPasswordForm } from "../../components/forms";

export default function ResetPasswordPage() {
  return (
    <MainAllLayouts>
      <LoginLayoutContainer>
        <ResetPasswordForm />
      </LoginLayoutContainer>
    </MainAllLayouts>
  );
}

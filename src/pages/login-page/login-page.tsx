import React from "react";

import MainAllLayouts from "../../layouts/main-all-layouts/main-all-layouts";
import LoginLayoutContainer from "../../layouts/login-layout-container/login-layout-container";
import { LoginForm } from "../../components/forms";

export default function LoginPage() {
  return (
    <MainAllLayouts>
      <LoginLayoutContainer>
        <LoginForm/>
      </LoginLayoutContainer>
    </MainAllLayouts>
  );
}

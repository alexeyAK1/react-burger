import React from "react";

import MainAllLayouts from "../../layouts/main-all-layouts/main-all-layouts";
import LoginLayoutContainer from "../../layouts/login-layout-container/login-layout-container";
import { RegisterForm } from "../../components/forms";

export default function RegisterPage() {
  return (
    <MainAllLayouts>
      <LoginLayoutContainer>
        <RegisterForm/>
      </LoginLayoutContainer>
    </MainAllLayouts>
  );
}

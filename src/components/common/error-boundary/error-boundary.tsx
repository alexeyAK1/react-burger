import React, { Component, ErrorInfo } from 'react';

interface Props {}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log('getDerivedStateFromError', error);

    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Возникла ошибка!', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section>
          <h1>Что-то пошло не так :(</h1>
          <p>
            В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
          </p>
        </section>
      );
    }

    return this.props.children;
  }
}

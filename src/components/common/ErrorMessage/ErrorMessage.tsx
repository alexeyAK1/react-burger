import React from 'react';

interface IProps {
  error: Error;
}

export default function ErrorMessage({ error }: IProps) {
  return (
    <section>
      <h2>{error.name}</h2>
      <p>{error.message}</p>
    </section>
  );
}

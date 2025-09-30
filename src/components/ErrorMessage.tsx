import React from 'react';

interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return <p className="text-red-500">{message}</p>;
}

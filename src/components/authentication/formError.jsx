import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full my-2">
    {message}
  </div>
);

export default ErrorMessage;

import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-4">
      <h2 className="font-bold text-2xl">Page not found!</h2>
      <p className="text-lg">Could not find requested product!</p>
      <a
        href="/"
        className="border-2 border-gray-500 p-1 rounded-md hover:border-gray-700"
      >
        Go back
      </a>
    </div>
  );
};

export default NotFound;

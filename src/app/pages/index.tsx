import React from "react";

import SignIn from "./auth/signin";

const index = () => {
  return (
    <div>
      <button
        onClick={() => {
          SignIn();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default index;

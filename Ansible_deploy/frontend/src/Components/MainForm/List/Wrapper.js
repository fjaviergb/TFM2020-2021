import React, { Children } from "react";

function Wrapper({ children }) {
  const countArray = Children.toArray(children).length;
  return (
    <section>
        <h2>RESULTS ({countArray})</h2>
      {children}
    </section>
  );
}

export default Wrapper;
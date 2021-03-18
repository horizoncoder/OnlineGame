/* eslint-disable import/prefer-default-export */
export const thunk = () => {
  return (dispath) => {
    setTimeout(() => {
      console.log("i got osdo");
      dispath({ type: "THUNK", playload: [] });
    }, 2000);
  };
};

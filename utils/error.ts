export const error = (msg: string) => {
  return {
    error: msg,
    time: new Date().getTime(),
  };
};

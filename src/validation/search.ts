export const validateSearch = (url: string) => {
  const pattern =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(pattern);

  if (match) {
    return "";
  }

  return "올바른 url을 입력해주세요.";
};

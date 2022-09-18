export const isNumeric = (str: string) => !Number.isNaN(Number(str));

export const getIdFromUrl = (url: string) => {
  const urlParts = url.split("/");
  return Number(urlParts[urlParts.length - 1]);
};

export const fileToBase64 = async (file) =>
  new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onloadend = () => res(fr.result);
    fr.onerror = () => rej(fr.error);
    fr.readAsDataURL(file);
  });

export const defaultUploadFn = (file) => {
  const formData = new FormData();
  formData.append("files", file);
  return file
    .makePostRequest("/upload", formData)
    .then((res) => (Array.isArray(res) ? res[0].url : res.url))
    .catch(console.error);
};

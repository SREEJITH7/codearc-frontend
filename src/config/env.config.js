
const getENV = (key) => {
  const value = import.meta.env[key];
  console.log("value", value);
  return value;
};

export const envConfig = {
  apiUrl: getENV("VITE_API_URL"),
  cloudinaryBaseUrl: getENV("VITE_CLOUDINARY_BASE_URL"),
};

console.log("envconfig", envConfig);
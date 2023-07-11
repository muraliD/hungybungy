export const getHeaderConfig = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'hungybingy',
    },
  };
  return config;
};

export const getformDataHeaderConfig = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'hungybingy',
      'Content-Transfer-Encoding': 'multipart/form-data',
    },
  };
  return config;
};

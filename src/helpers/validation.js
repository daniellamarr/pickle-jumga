export const validateEmail = (email) => {
  const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return re.test(String(email).toLowerCase());
};

export const validateFields = (fields) => {
  let message = '',
    status = true,
    errorField = '';
  fields = fields.reverse();
  fields.map((field) => {
    if (!field.value) {
      errorField = field.name;
      message = `${field.name} is required`;
      status = false;
    }
  });
  return {
    errorField,
    message,
    status,
  };
};

import * as yup from 'yup';

export default yup.object().shape({
  name: yup
    .string()
    .trim()
    .required()
    .min(3)
    .max(20),
});

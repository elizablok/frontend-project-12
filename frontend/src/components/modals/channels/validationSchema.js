import * as yup from 'yup';

const mapErrorByAction = (action) => (key) => `modals.channels.${action}.form.errors.${key}`;

export default (action, channelsList) => {
  const getErrorCode = mapErrorByAction(action);
  return yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(getErrorCode('required'))
      .min(3, getErrorCode('min'))
      .max(20, getErrorCode('max'))
      .notOneOf(channelsList, getErrorCode('notOneOf')),
  });
};

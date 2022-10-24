import { toast } from 'react-toastify';

export const getCodedNotificationMessage = (entity, action, type) => {
  const key = entity ? `.${entity}.` : '.';
  return `notifications${key}${action}.${type}`;
};

export default (type, message) => toast[type](message);

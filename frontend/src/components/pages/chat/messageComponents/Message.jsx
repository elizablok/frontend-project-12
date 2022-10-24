import React from 'react';

const Message = ({ body, username }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    :
    {' '}
    {body}
  </div>
);

export default Message;

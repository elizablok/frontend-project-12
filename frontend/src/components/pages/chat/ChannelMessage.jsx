const ChannelMessage = ({ body, username }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    : {body}
  </div>
);

export default ChannelMessage;
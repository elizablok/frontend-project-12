import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Channel = ({
  channel, isCurrent, handleChoose, handleRename, handleRemove,
}) => {
  const { t } = useTranslation();

  const variant = isCurrent ? 'secondary' : 'light';
  const basicClassName = 'w-100 rounded-0 text-start';
  const className = !channel.removable ? basicClassName : `${basicClassName} text-truncate`;

  const channelButton = (
    <Button variant={variant} className={className} onClick={handleChoose(channel.id)}>
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );

  return (
    !channel.removable ? channelButton : (
      <Dropdown as={ButtonGroup} className="d-flex">
        {channelButton}
        <Dropdown.Toggle variant={variant} split id="dropdown-split-basic">
          <span className="visually-hidden">{t('channels.managing.title')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleRename(channel.id)}>{t('channels.managing.rename')}</Dropdown.Item>
          <Dropdown.Item onClick={handleRemove(channel.id)}>{t('channels.managing.remove')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  );
};

export default Channel;

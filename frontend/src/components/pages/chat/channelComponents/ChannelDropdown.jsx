import React from 'react';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChannelDropdown = ({
  channelButton, variant, removeHandler, renameHandler,
}) => {
  const { t } = useTranslation();
  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      {channelButton}
      <Dropdown.Toggle variant={variant} split id="dropdown-split-basic">
        <span className="visually-hidden">{t('channels.managing.title')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={renameHandler}>{t('channels.managing.rename')}</Dropdown.Item>
        <Dropdown.Item onClick={removeHandler}>{t('channels.managing.remove')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelDropdown;

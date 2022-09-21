import { useTranslation } from 'react-i18next';

const ChannelHeader = ({ name, messagesNumber }) => {
  const { t } = useTranslation();
  return (
    <div className='bg-light mb-4 p-3 shadow-sm small'>
      <p className='m-0'>
        <b># {name}</b>
        <span className='text-muted'>{messagesNumber} {t('messages')}</span>
      </p>
    </div>
  );
};

export default ChannelHeader;
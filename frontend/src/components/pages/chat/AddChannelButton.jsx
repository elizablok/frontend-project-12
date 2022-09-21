import { useTranslation } from 'react-i18next';
import { BsPlusSquare } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

const AddChannelButton = () => {
  const { t } = useTranslation();
  return (
    <div className='d-flex justify-content-between mb-2 ps-4 pe-2'>
      <span>{t('channels')}</span>
      <Button className='p-0 text-primary btn-group-vertical'>
        <BsPlusSquare />
        <span className="visually-hidden">+</span>
      </Button>
    </div>
  );
}

export default AddChannelButton;
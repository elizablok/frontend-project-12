import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../../contexts/ApiProvider';

const RemoveChannelModal = ({ isShown, entityId, closeHandler }) => {
  const { t } = useTranslation();
  const { removeChannel } = useApi();

  const handleRemove = () => {
    removeChannel({ id: entityId });
    closeHandler();
  };

  return (
    <Modal show={isShown} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title className="h4">{t('modals.channels.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.channels.remove.body')}</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={closeHandler}>{t('modals.cancel')}</Button>
          <Button variant="danger" onClick={handleRemove}>{t('modals.submit')}</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;

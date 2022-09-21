import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useRef } from 'react';
import { ArrowRightSquare } from 'react-bootstrap-icons';

const ChannelForm = () => {
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current.focus();
  }, []);

  return (
    <div className='mt-auto px-5 py-3'>
      <Formik
        initialValues={{ body: '' }}
        onSubmit={() => null}
      >
        {(values, handleSubmit, handleChange, isSubmitting) => (
          <Form noValidate className='py-1 border rounded-2' onSubmit={handleSubmit}>
            <Form.Group className='has-validation'>
              <Form.Control
                ref={messageRef}
                className='border-0 p-0 ps-2'
                name='body'
                value={values.body}
                aria-label='Новое сообщение'
                placeholder='Введите сообщение...'
                onChange={handleChange}
              />
              <Button type='submit' variant="group-vertical" disabled={ isSubmitting || values.body.length === 0}>
                <ArrowRightSquare size={20} />
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>  
    </div>
  );
}

export default ChannelForm;
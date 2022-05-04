import type { FC } from 'react';
import { useCallback } from 'react';
import React from 'react';
import { Formik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import { ModalOverlay } from '../Components';
import useConnect from './connect';
import {
  Container,
  Modal,
  Title,
  Button,
  ButtonView,
  ButtonSpacer,
  Cancel,
  InputText,
  Subtitle,
  TextError,
} from './styles';
import type { Props } from './types';

const CallModal: FC<Props> = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const {
    handleGoBack,
    destinatarioNombre,
    readValue,
    setFrom,
    setMessage,
    setState,
    message,
  } = useConnect();
  readValue();

  const handleCompleteCall = useCallback(
    (values) => {
      setFrom(values.desde);
      setMessage(values.descripcion);
      setState('Pendiente');
    },
    [setFrom, setMessage, setState],
  );

  return (
    <Container>
      <ModalOverlay />
      <Modal safeTop={safeTop}>
        <Title>Call to {destinatarioNombre}</Title>
        {message === '' ? (
          <Subtitle>
            Before calling {destinatarioNombre} you need to complete this form
          </Subtitle>
        ) : (
          <Subtitle>
            Your call to {destinatarioNombre} has been done succesfully
          </Subtitle>
        )}
        <Formik
          validateOnMount={true}
          initialValues={{
            desde: '',
            descripcion: '',
          }}
          onSubmit={handleCompleteCall}
          validationSchema={yup.object().shape({
            desde: yup
              .string()
              .max(20, 'From must be lower than 20 characters'),
            descripcion: yup
              .string()
              .max(64, 'Message must be lower than 64 characters')
              .required('Message is required'),
          })}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <>
              {message === '' && (
                <InputText
                  placeholder="Calling from"
                  onChangeText={handleChange('desde')}
                  onBlur={handleBlur('desde')}
                  value={values.desde}
                  keyboardType="default"
                />
              )}

              {errors.desde && touched.desde && (
                <TextError>{errors.desde}</TextError>
              )}

              {message === '' && (
                <InputText
                  placeholder="Message"
                  onChangeText={handleChange('descripcion')}
                  onBlur={handleBlur('descripcion')}
                  value={values.descripcion}
                  keyboardType="default"
                />
              )}

              {errors.descripcion && touched.descripcion && (
                <TextError>{errors.descripcion}</TextError>
              )}

              <ButtonView>
                <Cancel text="Close" handlePress={handleGoBack} />
                {message === '' && (
                  <>
                    <ButtonSpacer />
                    <Button text="Confirm" handlePress={handleSubmit} />
                  </>
                )}
              </ButtonView>
            </>
          )}
        </Formik>
      </Modal>
    </Container>
  );
};

export default CallModal;

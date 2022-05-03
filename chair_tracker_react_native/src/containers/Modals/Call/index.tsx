import type { FC } from 'react';
import { useCallback } from 'react';
import React from 'react';
import { Formik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
} from './styles';
import type { Props } from './types';

const CallModal: FC<Props> = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const {
    handleGoBack,
    destinatarioHashMac,
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
        <Title>Call to {destinatarioHashMac}</Title>
        <Subtitle>
          Before calling {destinatarioHashMac} you need to complete this form
        </Subtitle>
        <Formik
          validateOnMount={true}
          // validationSchema={loginValidationSchema}
          initialValues={{
            desde: '',
            descripcion: '',
          }}
          onSubmit={handleCompleteCall}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            // errors,
            // touched,
            // isValid,
          }) => (
            <>
              <InputText
                placeholder="Calling from"
                onChangeText={handleChange('desde')}
                onBlur={handleBlur('desde')}
                value={values.desde}
                keyboardType="default"
              />

              {/* {errors.nombresyapellidos && touched.nombresyapellidos && (
              <Text style={styles.errorText}>{errors.nombresyapellidos}</Text>
            )} */}

              <InputText
                placeholder="Message"
                onChangeText={handleChange('descripcion')}
                onBlur={handleBlur('descripcion')}
                value={values.descripcion}
                keyboardType="default"
              />

              {/* {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )} */}
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

import type { FC } from 'react';
import { useCallback } from 'react';
import { Formik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import DetailHeader from 'components/Header/DetailHeader';
import MainButton from 'components/MainButton';
import useConnect from './connect';
import {
  Buttons,
  Container,
  Content,
  InputText,
  Subtitle,
  TextError,
  Title,
} from './styles';
import type { Props } from './types';

const Login: FC<Props> = () => {
  const { handleGoBack, setNif, setPassword } = useConnect();
  const { top: safeTop } = useSafeAreaInsets();

  const handleLogIn = useCallback(
    (values) => {
      setNif(values.nif);
      setPassword(values.contrasena);
    },
    [setNif, setPassword],
  );

  return (
    <Container safeTop={safeTop}>
      <DetailHeader onPressBack={handleGoBack} />
      <Content>
        <Title>Welcome back!</Title>
        <Subtitle>Please, sign in to continue</Subtitle>
      </Content>
      <Formik
        validateOnMount={true}
        initialValues={{
          nif: '',
          contrasena: '',
        }}
        onSubmit={handleLogIn}
        validationSchema={yup.object().shape({
          nif: yup
            .string()
            .matches(/[0-9]{8}[A-Z]{1}/, 'NIF must have 00000000A format')
            .required('NIF is required'),
          contrasena: yup.string().required('Password is required'),
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
            <InputText
              placeholder="NIF"
              onChangeText={handleChange('nif')}
              onBlur={handleBlur('nif')}
              value={values.nif}
              keyboardType="default"
            />

            {errors.nif && touched.nif && <TextError>{errors.nif}</TextError>}

            <InputText
              placeholder="Password"
              onChangeText={handleChange('contrasena')}
              onBlur={handleBlur('contrasena')}
              value={values.contrasena}
              keyboardType="default"
              secureTextEntry
            />

            {errors.contrasena && touched.contrasena && (
              <TextError>{errors.contrasena}</TextError>
            )}

            <Buttons>
              <MainButton text={'Sign in'} handlePress={handleSubmit} />
            </Buttons>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default Login;

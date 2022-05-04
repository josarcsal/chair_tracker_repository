import type { FC } from 'react';
import { useState } from 'react';
import { Formik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import DetailHeader from 'components/Header/DetailHeader';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import useConnect from './connect';
import {
  Buttons,
  Container,
  Content,
  InputText,
  Picker,
  TextError,
  Title,
} from './styles';
import type { Props } from './types';

const SignUp: FC<Props> = () => {
  const { handleGoBack, setNewUser, newUser } = useConnect();
  const { top: safeTop } = useSafeAreaInsets();
  const [rol, setRol] = useState('');

  return (
    <Container safeTop={safeTop}>
      <DetailHeader onPressBack={handleGoBack} />
      <Content>
        <Title>Welcome!</Title>
      </Content>
      <Formik
        validateOnMount={true}
        initialValues={{
          hashMac: '',
          nif: '',
          contrasena: '',
          nombre: '',
          apellidos: '',
          nif_jefe: '',
        }}
        onSubmit={(values) => {
          setNewUser({
            apellidos: values.apellidos,
            contrasena: values.contrasena,
            hash_mac: values.hashMac,
            last_login: null,
            nif: values.nif,
            nif_jefe: values.nif_jefe,
            nombre: values.nombre,
            rol: rol,
          });
        }}
        validationSchema={yup.object().shape({
          hashMac: yup
            .string()
            .min(10, 'HashMac must be of 10 characters or numbers')
            .max(10, 'HashMac must be of 10 characters or numbers')
            .required('HashMac is required'),
          nif: yup
            .string()
            .matches(/[0-9]{8}[A-Z]{1}/, 'NIF must have 00000000A format')
            .required('NIF is required'),
          contrasena: yup
            .string()
            .max(64, 'Password length must be lower than 64 characters')
            .required('Password is required'),
          nombre: yup
            .string()
            .max(20, 'Name length must be lower than 20 characters')
            .required('Name is required'),
          apellidos: yup
            .string()
            .max(64, 'Password length must be lower than 64 characters'),
          nif_jefe: yup
            .string()
            .matches(/[0-9]{8}[A-Z]{1}/, 'NIF must have 00000000A format'),
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
              placeholder="HashMac"
              onChangeText={handleChange('hashMac')}
              onBlur={handleBlur('hashMac')}
              value={values.hashMac}
              keyboardType="default"
            />

            {errors.hashMac && touched.hashMac && (
              <TextError>{errors.hashMac}</TextError>
            )}

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

            <InputText
              placeholder="Name"
              onChangeText={handleChange('nombre')}
              onBlur={handleBlur('nombre')}
              value={values.nombre}
              keyboardType="default"
            />

            {errors.nombre && touched.nombre && (
              <TextError>{errors.nombre}</TextError>
            )}

            <InputText
              placeholder="Surnames"
              onChangeText={handleChange('apellidos')}
              onBlur={handleBlur('apellidos')}
              value={values.apellidos}
              keyboardType="default"
            />

            {errors.apellidos && touched.apellidos && (
              <TextError>{errors.apellidos}</TextError>
            )}

            <Picker
              selectedValue={rol}
              onValueChange={(itemValue) => setRol(itemValue)}
            >
              <Picker.Item label="Boss" value="J" />
              <Picker.Item label="Worker" value="E" />
            </Picker>

            {rol === 'E' && (
              <InputText
                placeholder="NIF of your boss"
                onChangeText={handleChange('nif_jefe')}
                onBlur={handleBlur('nif_jefe')}
                value={values.nif_jefe}
                keyboardType="default"
              />
            )}

            {errors.nif_jefe && touched.nif_jefe && (
              <TextError>{errors.nif_jefe}</TextError>
            )}

            <Buttons>
              {newUser?.hash_mac === undefined ? (
                <MainButton text={'Register'} handlePress={handleSubmit} />
              ) : (
                <MainButton text={'Close'} handlePress={handleGoBack} />
              )}
              <SecondaryButton
                text={'By creating an account, you agree to our Terms'}
              />
            </Buttons>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default SignUp;

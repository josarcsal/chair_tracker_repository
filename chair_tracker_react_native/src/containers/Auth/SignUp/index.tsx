import type { FC } from 'react';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import { Formik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DetailHeader from 'components/Header/DetailHeader';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import useConnect from './connect';
import { Buttons, Container, Content, InputText, Title } from './styles';
import type { Props } from './types';

const SignUp: FC<Props> = () => {
  const { handleGoBack } = useConnect();
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
        // validationSchema={loginValidationSchema}
        initialValues={{
          nif: '',
          contrasena: '',
          nombre: '',
          apellidos: '',
          nif_jefe: '',
        }}
        onSubmit={(values) => {
          console.log(values);
          // console.log(rol);
        }}
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
              placeholder="NIF"
              onChangeText={handleChange('nif')}
              onBlur={handleBlur('nif')}
              value={values.nif}
              keyboardType="default"
            />

            {/* {errors.nombresyapellidos && touched.nombresyapellidos && (
              <Text style={styles.errorText}>{errors.nombresyapellidos}</Text>
            )} */}

            <InputText
              placeholder="Password"
              onChangeText={handleChange('contrasena')}
              onBlur={handleBlur('contrasena')}
              value={values.contrasena}
              keyboardType="default"
              secureTextEntry
            />

            {/* {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )} */}

            <InputText
              placeholder="Name"
              onChangeText={handleChange('nombre')}
              onBlur={handleBlur('nombre')}
              value={values.nombre}
              keyboardType="default"
            />

            {/* {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )} */}

            <InputText
              placeholder="Surnames"
              onChangeText={handleChange('apellidos')}
              onBlur={handleBlur('apellidos')}
              value={values.apellidos}
              keyboardType="default"
            />

            {/* {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )} */}
            <Picker
              style={{
                width: '99%',
                alignSelf: 'center',
                marginTop: -40,
                marginBottom: -60,
              }}
              mode="dropdown"
              selectedValue={rol}
              onValueChange={(itemValue) => setRol(itemValue)}
            >
              <Picker.Item label="Boss" value="J" />
              <Picker.Item label="Worker" value="E" />
            </Picker>

            {/* {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )} */}

            {rol === 'E' && (
              <InputText
                placeholder="NIF of your boss"
                onChangeText={handleChange('nif_jefe')}
                onBlur={handleBlur('nif_jefe')}
                value={values.nif_jefe}
                keyboardType="default"
              />
            )}

            {/* {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )} */}
            <Buttons>
              <MainButton
                text={'Create your account'}
                handlePress={handleSubmit}
              />
            </Buttons>
          </>
        )}
      </Formik>
      <SecondaryButton
        text={'By creating an account, you agree to our Terms'}
      />
    </Container>
  );
};

export default SignUp;

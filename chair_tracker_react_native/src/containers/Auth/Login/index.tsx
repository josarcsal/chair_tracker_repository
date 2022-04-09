import type { FC } from 'react';
import { Formik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DetailHeader from 'components/Header/DetailHeader';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import useConnect from './connect';
import { Container, Content, InputText, Subtitle, Title } from './styles';
import type { Props } from './types';

const Login: FC<Props> = () => {
  const { handleGoBack } = useConnect();
  const { top: safeTop } = useSafeAreaInsets();

  return (
    <Container safeTop={safeTop}>
      <DetailHeader onPressBack={handleGoBack} />
      <Content>
        <Title>Welcome back!</Title>
        <Subtitle>Please, sign in to continue</Subtitle>
      </Content>
      <Formik
        validateOnMount={true}
        // validationSchema={loginValidationSchema}
        initialValues={{
          nif: '',
          contrasena: '',
        }}
        onSubmit={(values) => console.log(values)}
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

            <MainButton text={'Sign in'} handlePress={handleSubmit} />
          </>
        )}
      </Formik>
      <SecondaryButton text={'Forgot pasword?'} />
    </Container>
  );
};

export default Login;

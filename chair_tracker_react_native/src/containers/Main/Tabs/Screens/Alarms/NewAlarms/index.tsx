import type { FC } from 'react';
import { useState } from 'react';
import { Formik } from 'formik';
import DatePicker from 'react-native-date-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DetailHeader from 'components/Header/DetailHeader';
import MainHeader from 'components/Header/MainHeader';
import MainButton from 'components/MainButton';
import useConnect from './connect';
import {
  ButtonView,
  Container,
  HourView,
  InputHour,
  OpenButton,
  OpenText,
  Text,
} from './styles';
import type { Props } from './types';

const NewAlarms: FC<Props> = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const { handleGoBack } = useConnect();

  const [date1, setDate1] = useState(new Date());
  const [open1, setOpen1] = useState(false);

  const [date2, setDate2] = useState(new Date());
  const [open2, setOpen2] = useState(false);

  return (
    <Container safeTop={safeTop}>
      <DetailHeader onPressBack={handleGoBack} />
      <MainHeader title="New alarm" subtitle="Set your new alarm" />
      <Formik
        validateOnMount={true}
        // validationSchema={loginValidationSchema}
        initialValues={{
          days: '',
          t_trabajo: '',
          t_descanso: '',
        }}
        onSubmit={(values) => {
          console.log(values);
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
            <HourView>
              <Text>Start time:</Text>
              <OpenButton onPress={() => setOpen1(true)}>
                <OpenText>OPEN</OpenText>
              </OpenButton>
              <DatePicker
                modal
                mode="time"
                open={open1}
                date={date1}
                onConfirm={(date) => {
                  setOpen1(false);
                  setDate1(date);
                }}
                onCancel={() => {
                  setOpen1(false);
                }}
              />
            </HourView>

            {/* {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )} */}

            <HourView>
              <Text>Finish time:</Text>
              <OpenButton onPress={() => setOpen1(true)}>
                <OpenText>OPEN</OpenText>
              </OpenButton>
              <DatePicker
                modal
                mode="time"
                open={open2}
                date={date2}
                onConfirm={(date) => {
                  setOpen2(false);
                  setDate2(date);
                }}
                onCancel={() => {
                  setOpen2(false);
                }}
              />
            </HourView>
            {/* {errors.telefono && touched.telefono && (
              <Text style={styles.errorText}>{errors.telefono}</Text>
            )} */}
            <HourView>
              <Text>Working time:</Text>
              <InputHour
                placeholder="In mins"
                onChangeText={handleChange('t_trabajo')}
                onBlur={handleBlur('t_trabajo')}
                value={values.t_trabajo}
                keyboardType="default"
              />
            </HourView>

            {/* {errors.telefono && touched.telefono && (
              <Text style={styles.errorText}>{errors.telefono}</Text>
            )} */}

            <HourView>
              <Text>Break time:</Text>
              <InputHour
                placeholder="In mins"
                onChangeText={handleChange('t_descanso')}
                onBlur={handleBlur('t_descanso')}
                value={values.t_descanso}
                keyboardType="default"
              />
            </HourView>
            {/* {errors.mensaje && touched.mensaje && (
              <Text style={styles.errorText}>{errors.mensaje}</Text>
            )} */}

            <HourView>
              <Text>Days:</Text>
              <InputHour
                placeholder="LMXJV"
                onChangeText={handleChange('days')}
                onBlur={handleBlur('days')}
                value={values.days}
                keyboardType="default"
              />
            </HourView>
            {/* {errors.mensaje && touched.mensaje && (
              <Text style={styles.errorText}>{errors.mensaje}</Text>
            )} */}
            <ButtonView>
              <MainButton text={'Set alarm'} handlePress={handleSubmit} />
            </ButtonView>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default NewAlarms;

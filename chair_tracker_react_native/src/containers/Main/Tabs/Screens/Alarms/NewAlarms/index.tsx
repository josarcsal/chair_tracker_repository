import type { FC } from 'react';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import WeekdayPicker from 'react-native-weekday-picker';
import DetailHeader from 'components/Header/DetailHeader';
import MainHeader from 'components/Header/MainHeader';
import MainButton from 'components/MainButton';
import useConnect from './connect';
import { Container, HourView, InputHour, Text } from './styles';
import type { Props } from './types';

const NewAlarms: FC<Props> = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const { handleGoBack } = useConnect();
  // const [weekDays, setWeekDays] = useState([]);
  const [tInicio, setTInicio] = useState(new Date(1598051730000));
  const [tFin, setTFin] = useState(new Date(1598051730000));

  const onChangeInicio = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setTInicio(currentDate);
  };
  const onChangeFin = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setTFin(currentDate);
  };
  // const onChangeDays = (event: any, selectedDate: any) => {
  //   const currentDate = selectedDate;
  //   setWeekDays(currentDate);
  // };
  // const days = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 0, 0: 0 };

  return (
    <Container safeTop={safeTop}>
      <DetailHeader onPressBack={handleGoBack} />
      <MainHeader title="New alarm" subtitle="Set your new alarm" />
      <Formik
        validateOnMount={true}
        // validationSchema={loginValidationSchema}
        initialValues={{
          week_days: [''],
          t_trabajo: '',
          t_descanso: '',
        }}
        onSubmit={(values) => {
          console.log(values);
          console.log(tInicio);
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
            <Text>MultiSelect Demo</Text>
            {/* <WeekdayPicker days={days} onChange={onChangeDays} /> */}
            <HourView>
              <Text>Start time:</Text>
              <DateTimePicker
                testID="t_inicio"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: 100,
                  alignSelf: 'center',
                }}
                value={tInicio}
                mode={'time'}
                is24Hour={true}
                onChange={onChangeInicio}
              />
            </HourView>

            {/* {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )} */}

            <HourView>
              <Text>Finish time:</Text>
              <DateTimePicker
                testID="t_inicio"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: 100,
                  alignSelf: 'center',
                }}
                value={tFin}
                mode={'time'}
                is24Hour={true}
                onChange={onChangeFin}
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
            <MainButton text={'Set alarm'} handlePress={handleSubmit} />
          </>
        )}
      </Formik>
    </Container>
  );
};

export default NewAlarms;

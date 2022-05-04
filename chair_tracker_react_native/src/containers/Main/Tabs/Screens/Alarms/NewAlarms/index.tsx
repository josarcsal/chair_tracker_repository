import type { FC } from 'react';
import { useState } from 'react';
import { Formik } from 'formik';
import DatePicker from 'react-native-date-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
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
  TextError,
} from './styles';
import type { Props } from './types';

const NewAlarms: FC<Props> = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const { handleGoBack, setNewAlarm, normalizedHour, newAlarm, hashMac } =
    useConnect();
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
        initialValues={{
          days: '',
          t_trabajo: 0,
          t_descanso: 0,
        }}
        onSubmit={(values) => {
          setNewAlarm({
            oid_alarma: 0,
            dias: values.days,
            t_inicio: normalizedHour(date1.toTimeString()),
            t_fin: normalizedHour(date2.toTimeString()),
            t_trabajo: values.t_trabajo,
            t_descanso: values.t_descanso,
            ciclo_trabajo: 0,
            ciclo_descanso: 0,
            hash_mac_fk: hashMac || '',
          });
        }}
        validationSchema={yup.object().shape({
          days: yup
            .string()
            .uppercase()
            .oneOf([
              'L',
              'LM',
              'LMX',
              'LMXJ',
              'LMXJV',
              'LMXV',
              'LMJ',
              'LMJV',
              'LMV',
              'LX',
              'LXJ',
              'LXJV',
              'LXV',
              'LJ',
              'LJV',
              'LV',
              'M',
              'MX',
              'MXJ',
              'MXJV',
              'MXV',
              'MJ',
              'MJV',
              'MV',
              'X',
              'XJ',
              'XJV',
              'XV',
              'J',
              'JV',
              'V',
            ])
            .min(1, 'You have to choose at least one day of the week')
            .max(5, 'You can not choose more than five days')
            .required('Days are required'),
          t_trabajo: yup
            .number()
            .integer()
            .moreThan(0, 'Working time must be more than 0 mins')
            .lessThan(1440, 'Working time can not be more than 24 hours')
            .required('Working time is required'),
          t_descanso: yup
            .number()
            .integer()
            .moreThan(0, 'Break time must be more than 0 mins')
            .lessThan(1440, 'Break time can not be more than 24 hours')
            .required('Break time is required'),
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

            <HourView>
              <Text>Finish time:</Text>
              <OpenButton onPress={() => setOpen2(true)}>
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

            <HourView>
              <Text>Working time:</Text>
              <InputHour
                placeholder="In mins"
                onChangeText={handleChange('t_trabajo')}
                onBlur={handleBlur('t_trabajo')}
                value={values.t_trabajo.toString()}
                keyboardType="default"
              />
            </HourView>

            {errors.t_trabajo && touched.t_trabajo && (
              <TextError>{errors.t_trabajo}</TextError>
            )}

            <HourView>
              <Text>Break time:</Text>
              <InputHour
                placeholder="In mins"
                onChangeText={handleChange('t_descanso')}
                onBlur={handleBlur('t_descanso')}
                value={values.t_descanso.toString()}
                keyboardType="default"
              />
            </HourView>

            {errors.t_descanso && touched.t_descanso && (
              <TextError>{errors.t_descanso}</TextError>
            )}

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

            {errors.days && touched.days && (
              <TextError>{errors.days}</TextError>
            )}

            <ButtonView>
              {newAlarm?.hash_mac_fk === undefined ? (
                <MainButton text={'Set alarm'} handlePress={handleSubmit} />
              ) : (
                <MainButton text={'Close'} handlePress={handleGoBack} />
              )}
            </ButtonView>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default NewAlarms;

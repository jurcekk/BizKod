import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  Layout,
  Text,
  Button,
  useTheme,
  themeColor,
} from 'react-native-rapi-ui';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseInit';
import { ref, set } from 'firebase/database';
import Toast from 'react-native-toast-message';
import { useForm } from 'react-hook-form';
import InputField from '../../components/InputField';
import * as ERROR_MESSAGES from './customErrorMessage';

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'jurcekdavid@gmail.com',
      password: 'David01%',
    },
  });

  const errorMessage = (errorCode) => {
    let message = '';

    switch (errorCode) {
      case 'auth/user-not-found':
        message = ERROR_MESSAGES.USER_NOT_FOUND;
        break;
      case 'auth/email-already-in-use':
        message = ERROR_MESSAGES.EMAIL_ALREADY_IN_USE;
        break;
      case 'auth/email-already-exists':
        message = ERROR_MESSAGES.EMAIL_ALREADY_EXIST;
        break;
      case 'auth/internal-error':
        message = ERROR_MESSAGES.INTERNAL_ERROR;
        break;
      case 'auth/invalid-credential':
        message = ERROR_MESSAGES.INVALID_CREDENTIAL;
        break;
      case 'auth/invalid-email':
        message = ERROR_MESSAGES.INVALID_EMAIL_FORMAT;
        break;
      case 'auth/invalid-password':
        message = ERROR_MESSAGES.INVALID_PASSWORD_FORMAT;
        break;
      default:
        message = ERROR_MESSAGES.DEFAULT_MESSAGE;
        break;
    }

    return message;
  };

  async function register(data) {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        set(ref(db, 'users/' + user?.uid), {
          uid: user.uid,
          email: data.email,
        }).then(() => {
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Account has been created',
          });
        });
      })
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorText = errorMessage(errorCode);
        console.log(error);
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Greška',
          text2: errorText,
        });
      });
  }
  return (
    <KeyboardAvoidingView behavior='height' enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isDarkmode ? '#17171E' : themeColor.white100,
            }}
          >
            <Image
              resizeMode='contain'
              style={{
                height: 220,
                width: 220,
              }}
              source={require('../../../assets/images/register.png')}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight='bold'
              size='h2'
              style={{
                alignSelf: 'center',
                padding: 40,
              }}
            >
              Register
            </Text>
            <Text
              style={{
                marginBottom: 5,
              }}
            >
              Username
            </Text>
            <InputField
              control={control}
              errors={errors}
              label='Username'
              name='username'
              defaultValue=''
              rules={{
                required: 'Username je obavezan',
              }}
            />
            <Text
              style={{
                marginBottom: 5,
                marginTop: 15,
              }}
            >
              Email
            </Text>
            <InputField
              control={control}
              errors={errors}
              label='Email'
              name='email'
              type='email-address'
              defaultValue=''
              rules={{
                required: 'Email je obavezan',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Ne ispravna email adresa',
                },
              }}
            />

            <Text style={{ marginTop: 15, marginBottom: 5 }}>Password</Text>
            <InputField
              control={control}
              errors={errors}
              label='Password'
              name='password'
              defaultValue=''
              rules={{
                required: 'Šifra je obavezna',
              }}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <Button
              text={loading ? 'Loading' : 'Create an account'}
              onPress={handleSubmit(register)}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                justifyContent: 'center',
                marginTop: 'auto',
              }}
            >
              <Text size='md'>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}
              >
                <Text
                  size='md'
                  fontWeight='bold'
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}

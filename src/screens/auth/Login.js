import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  Layout,
  Text,
  Button,
  useTheme,
  themeColor,
} from 'react-native-rapi-ui';
import { FIREBASE_APP, FIREBASE_AUTH } from '../../FirebaseInit';
import { useForm } from 'react-hook-form';
import InputField from '../../components/InputField';
import Toast from 'react-native-toast-message';

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = FIREBASE_AUTH;
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

  async function login(data) {
    setLoading(true);
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        setLoading(false);
        Toast.show({
          type: 'success',
          position: 'top',
          topOffset: 60,
          text1: 'Uspešna prijava',
          text2: 'Uspešno ste se prijavili na svoj nalog.',
        });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        setLoading(false);
        alert(errorMessage);
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
              source={require('../../../assets/images/login.png')}
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
              style={{
                alignSelf: 'center',
                padding: 30,
              }}
              size='h3'
            >
              Login
            </Text>
            <Text
              style={{
                marginBottom: 5,
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
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
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
                required: 'Password is required',
              }}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            <Button
              text={loading ? 'Loading' : 'Continue'}
              onPress={handleSubmit(login)}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                justifyContent: 'flex-end',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ForgetPassword');
                }}
              >
                <Text size='md' fontWeight='bold'>
                  Forget password?
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                justifyContent: 'center',
                marginTop: 'auto',
              }}
            >
              <Text size='md'>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register');
                }}
              >
                <Text
                  size='md'
                  fontWeight='bold'
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Register here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}

import React, { useState, useContext } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {
  Layout,
  Text,
  Button,
  useTheme,
  themeColor,
} from 'react-native-rapi-ui';
import { useForm } from 'react-hook-form';
import InputField from '../../components/InputField';
import Toast from 'react-native-toast-message';
import { login } from '../../data/auth';
import { AuthContext } from '../../provider/AuthProvider';

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const { setUser, setUserData } = useContext(AuthContext);

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

  const loginUser = async (data) => {
    setLoading(true);
    try {
      const response = await login(data);
      if (response.status === 200) {
        setUser(true);
        setUserData(response);
        // Toast.show({
        //   type: 'success',
        //   position: 'top',
        //   text1: 'Uspešno ste se prijavili!',
        //   visibilityTime: 2000,
        //   autoHide: true,
        // });
        console.log('response', response);
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Došlo je do greške!',
          text2: 'Pokušajte ponovo!',
          visibilityTime: 2000,
          autoHide: true,
        });
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

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
              onPress={handleSubmit(loginUser)}
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

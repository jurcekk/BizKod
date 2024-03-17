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
import Toast from 'react-native-toast-message';
import { useForm } from 'react-hook-form';
import InputField from '../../components/InputField';
import { register } from '../../data/auth';
import { AuthContext } from '../../provider/AuthProvider';

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const { setUser, setUserData } = useContext(AuthContext);
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

  const registerUser = async (data) => {
    setLoading(true);

    try {
      const response = await register(data);
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Uspešno ste se registrovali!',
          visibilityTime: 2000,
          autoHide: true,
        });
        console.log('response', response);
        setUser(true);
        setUserData(response.data);
        navigation.navigate("First")
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Došlo je do greške!',
          text2: response.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.log('error', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Došlo je do greške!',
        text2: 'Pokušajte ponovo!',
        visibilityTime: 4000,
        autoHide: true,
      });
    }
    setLoading(false);
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
              onPress={handleSubmit(registerUser)}
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

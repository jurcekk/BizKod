import React, { useState } from 'react';
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
  TextInput,
  Button,
  useTheme,
  themeColor,
} from 'react-native-rapi-ui';
import { useForm } from 'react-hook-form';
import InputField from '../../components/InputField';
import Toast from 'react-native-toast-message';

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = FIREBASE_AUTH;
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'jurcekdavid@gmail.com',
    },
  });

  
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
              source={require('../../../assets/images/forget.png')}
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
              size='h3'
              fontWeight='bold'
              style={{
                alignSelf: 'center',
                padding: 30,
              }}
            >
              Forget Password
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
            <Button
              text={loading ? 'Loading' : 'Send email'}
              onPress={() => console.log('Send email')}
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

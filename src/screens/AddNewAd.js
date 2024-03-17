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
import InputField from '../components/InputField';
import Toast from 'react-native-toast-message';
import { login } from '../data/auth';
import { AuthContext } from '../provider/AuthProvider';

const AddNewAd = () => {

    const { isDarkmode, setTheme } = useTheme();
    const [loading, setLoading] = useState(false);
    const { setUser, setUserData, userData } = useContext(AuthContext);
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          title: '',
          description: '',
          price: '',
          location: '',
          dateOfCreation: new Date().toLocaleDateString('en-GB'),
        },
      });

      const onSubmit = async (data) => {
      }
    return(
        <Layout >
            <KeyboardAvoidingView behavior='height' enabled style={{ flex: 1 }}>
                <ScrollView
                    style={{
                        flex: 1,
                        padding: 20,
                    }}
                >
                    <Text fontWeight='bold' size='h3' style={{ marginVertical: 15 }}>
                        Dodajte novi oglas
                    </Text>

                    <Text  style={{ marginVertical: 15 }}>
                        Naslov
                    </Text>
                    <InputField
                        name='title'
                        control={control}
                        rules={{
                            required: { value: true, message: 'Polje je obavezno' },
                        }}
                        label='Naslov'
                        errors={errors}
                    />
                    <Text  style={{ marginVertical: 15 }}>
                        Opis
                    </Text>
                    <InputField
                        name='description'
                        control={control}
                        rules={{
                            required: { value: true, message: 'Polje je obavezno' },
                        }}
                        label='Opis'
                        errors={errors}
                    />
                    <Text  style={{ marginVertical: 15 }}>
                        Cena
                    </Text>
                    <InputField
                        name='price'
                        control={control}
                        rules={{
                            required: { value: true, message: 'Polje je obavezno' },
                        }}
                        label='Cena'
                        errors={errors}
                    />
                    <Text  style={{ marginVertical: 15 }}>
                        Lokacija
                    </Text>
                    <InputField
                        name='location'
                        value={userData?.location}
                        control={control}
                        rules={{
                            required: { value: true, message: 'Polje je obavezno' },
                        }}
                        label='Lokacija'
                        errors={errors}
                    />

                    <Text  style={{ marginVertical: 15 }}>
                        Slike
                    </Text>

                    <ScrollView
                        style={{
                            flexDirection: 'row',
                            marginTop: 10,
                        }}
                        contentContainerStyle={{
                            alignItems: 'center',
                        }}
                        horizontal={true}
                    >
                        <TouchableOpacity   
                            style={{
                                alignItems: 'center',
                                marginRight: 10,
                                padding: 5,
                                borderRadius: 5,
                                backgroundColor: '#d6d6d6',
                                width: 100,
                                height:100,
                                borderRadius: 50,
                                justifyContent: 'center',
                            }}
                        >
                            <Text>
                                Dodaj
                            </Text>
                            </TouchableOpacity>


                        <Image source={require('../../assets/images/forget.png')} style={{ width: 100, height: 100, marginRight: 10 }} />
                        <Image source={require('../../assets/images/forget.png')} style={{ width: 100, height: 100, marginRight: 10 }} />

                        <Image source={require('../../assets/images/forget.png')} style={{ width: 100, height: 100, marginRight: 10 }} />

                        <Image source={require('../../assets/images/forget.png')} style={{ width: 100, height: 100, marginRight: 10 }} />

                    </ScrollView>
                    <Button
                        text='Dodaj oglas'
                        style={{ marginTop: 10 }}
                        onPress={handleSubmit(onSubmit)}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </Layout>

    );
    }

export default AddNewAd;

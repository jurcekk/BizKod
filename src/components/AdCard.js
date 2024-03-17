import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, useTheme, themeColor } from 'react-native-rapi-ui';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

const AdCard = ({item}) => {
    const navigation = useNavigation();
  const { isDarkmode } = useTheme();
  console.log(item._id)
  return (
    <TouchableOpacity
      style={{
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 10,
      }}
      onPress={() => {
        navigation.navigate('AdScreen', {
            item
        });
      }}
    >
      <Image
        source={require('../../assets/images/forget.png')}
        style={{
          borderRadius: 10,
          aspectRatio: 135 / 76,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 10,
          bottom: 10,
          left: 0,
          marginHorizontal: '5%',
          width: '90%',
          borderWidth: 1,
          borderColor: '#f2f2fa',
        }}
      >
        <View>
          <Text
            fontWeight='bold'
            style={{
              fontSize: 20,
              color: themeColor.dark,
            }}
          >
            {item?.user?.firstName} {item?.user?.lastName}  
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: 'grey',
              }}
            >
              {item?.details?.rooms} sobe
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: 'grey',
              }}
            >
              {item?.details?.floor} sprat
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <Text
            fontWeight='bold'
            style={{
              fontSize: 20,
              color: themeColor.dark,
            }}
          >
            ${item?.price}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: 'grey',
            }}
          >
            mesečno
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AdCard;

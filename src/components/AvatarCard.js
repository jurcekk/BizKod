import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Touchable } from 'react-native';
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
  Avatar,
} from 'react-native-rapi-ui';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';


const AvatarCard = ({ user }) => {
    const navigation = useNavigation();
  const { isDarkmode, setTheme } = useTheme();
  return (
    <View
      style={{
        marginTop: 'auto',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
      }}
    >
        <TouchableOpacity 
        onPress={() => {
            navigation.navigate('Profile')
        }}
        >
            
      <Avatar
        source={{
          uri: 'https://i.pravatar.cc/100',
        }}
        size='lg'
        shape='round'
       
      />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'column',
          marginLeft: 10,
        }}
      >
        <Text fontWeight='bold' style={{ marginTop: 10 }}>
            {user?.firstName} {user?.lastName}
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}
        >
          Kompatibilnost
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          // Open mobile with phone number

          console.log('Contact');
        }}
        style={{
          marginLeft: 'auto',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            marginTop: 10,
            marginLeft: 'auto',
            backgroundColor: themeColor.primary,
            padding: 10,
            borderRadius: 20,
            color: themeColor.white,
          }}
        >
          Kontaktiraj
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarCard;

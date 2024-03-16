import React, { useContext } from 'react';
import { View, Linking } from 'react-native';
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../provider/AuthProvider';

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const { setUser } = useContext(AuthContext);

  return (
    <Layout>
      <TopNav
        middleContent='Home'
        rightContent={
          <Ionicons
            name={isDarkmode ? 'sunny' : 'moon'}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme('light');
          } else {
            setTheme('dark');
          }
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Section style={{ marginTop: 20 }}>
          <SectionContent>
            <Button
              text='Go to second screen'
              onPress={() => {
                navigation.navigate('SecondScreen');
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              status='danger'
              text='Logout'
              onPress={() => {
                setUser(false);
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              text='Go to second screen'
              onPress={() => {
                navigation.navigate('AdScreen');
              }}
              style={{
                marginTop: 10,
              }}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}

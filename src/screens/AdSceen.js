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

const AdScreen = () => {
  return (
    <Layout>
      <TopNav middleContent='Ad' />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Section style={{ marginTop: 20 }}>
          <SectionContent>
            <Text fontWeight='bold' style={{ marginVertical: 15, padding: 20 }}>
              Ovo je reklama
            </Text>
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
};

export default AdScreen;

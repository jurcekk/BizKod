import React, {useContext} from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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
import { Image } from 'expo-image';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import { AuthContext } from '../provider/AuthProvider';


const Profile = ({ navigation }) => {
  const { isDarkmode, setTheme } = useTheme();
  const {userData} = useContext(AuthContext);
  console.log("USER", JSON.stringify(userData._doc.firstName, null, 2));
  return (
    <Layout>
    <ScrollView style={styles.container}>
      <TopNav
        middleContent='Profil'
        leftContent={
          <Ionicons
            name='arrow-back'
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => {
          navigation.goBack();
        }}
        rightContent={
          <Ionicons
            name='menu'
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {}}
      />

      <View style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={require('../../assets/images/forget.png')} // Replace with your local image
        />
        <Text style={styles.name}>{userData?._doc.firstName} {userData?._doc.lastName}</Text>
        

        <Text style={styles.email}>{userData._doc.email}</Text>
        <Text style={styles.phone}>{userData._doc.phoneNumber}</Text>
        <View style={styles.course}>
          <Text style={[styles.courseText, {color: isDarkmode ? "white" : "white"}]}>{userData._doc.profession}</Text>
          <Text style={[styles.courseText, {color: isDarkmode ? "white" : "white"}]}>{userData._doc.area}</Text>
        </View>
      </View>
        
    </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: 'white',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 18,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  detail: {
    fontSize: 16,
  },
  email: {
    fontSize: 16,
  },
  phone: {
    fontSize: 16,
    marginBottom: 10,
  },
  course: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
  },
  courseText: {
    fontSize: 16,
    marginRight: 5,
  },
  button: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;

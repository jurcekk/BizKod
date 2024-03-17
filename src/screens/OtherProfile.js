import React from 'react';
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

const OtherProfile = ({ navigation }) => {
  const { isDarkmode, setTheme } = useTheme();
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
        <Text style={styles.name}>Username</Text>
        <View style={styles.rating}>
          <FontAwesome name='star' size={20} color='orange' />
          <Text style={styles.ratingText}>4,5/5</Text>
        </View>

        <Text style={styles.email}>email@email.com</Text>
        <Text style={styles.phone}>+3817223626</Text>
        <View style={styles.course}>
          <Text style={[styles.courseText, {color: isDarkmode ? "white" : "white"}]}>Oblast poslovanja</Text>
          <Text style={[styles.courseText, {color: isDarkmode ? "white" : "white"}]}>Informacione Tehnologije</Text>
        </View>
      </View>


      <Button text='Kontaktiraj'
          style={{ marginTop: 10, marginHorizontal: 20, borderRadius: 20 }}
          onPress={() => {}} />
        
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

export default OtherProfile;
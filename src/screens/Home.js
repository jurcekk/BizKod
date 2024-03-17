import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Linking,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
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
import { Image } from 'expo-image';
import AdCard from '../components/AdCard';
import FloatingButton from '../components/FloatingButton';

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [activeList, setActiveList] = useState('first');
  const [selectedCategory, setSelectedCategory] = useState('Sve');
  const [ads, setAds] = useState([]);

  const { setUser } = useContext(AuthContext);

  const getAds = async () => {
    console.log('usao');
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL + '/getAllAdvertisment'
    );

    const data = await response.json();
    console.log(data.items);
    setAds(data.items);
  };

  useEffect(() => {
    getAds();
  }, []);

  const categories = ['Sve', 'Muški', 'Ženski', "Cena Rastucam", "Cena Opadajuce", 'Najnoviji', 'Najstariji'];

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
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 10,
          backgroundColor: 'white',
          borderRadius: 50,
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => setActiveList('first')}
          style={{
            flex: 1,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopStartRadius: 50,
            borderBottomStartRadius: 50,
            borderRightWidth: 2,
            padding: 20,
            backgroundColor:
              activeList === 'first' ? themeColor.primary : 'white',
          }}
        >
          <Text
            style={{
              color: activeList !== 'first' ? themeColor.black500 : 'white',
            }}
          >
            Peronalizovani
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveList('second')}
          style={{
            flex: 1,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopEndRadius: 50,
            borderBottomEndRadius: 50,
            padding: 20,
            backgroundColor:
              activeList === 'second' ? themeColor.primary : 'white',
          }}
        >
          <Text
            style={{
              color: activeList !== 'second' ? themeColor.black500 : 'white',
            }}
          >
            Svi oglasi
          </Text>
        </TouchableOpacity>
      </View>

      <Section
        style={{
          marginTop: 20,
          padding: 5,
          borderRadius: 20,
        }}
      >
        <SectionContent>
          <ScrollView style={styles.buttonContainer} contentContainerStyle={{
            alignItems: 'center',
          }} horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.button,
                  selectedCategory === category && styles.selectedButton,
                  {
                    backgroundColor:
                      selectedCategory === category
                        ? themeColor.primary
                        : 'white',
                    borderColor:
                      selectedCategory === category
                        ? themeColor.primary
                        : 'black',
                  },
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: selectedCategory === category ? 'white' : 'black',
                  }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {ads.length > 0 ? (
          <FlatList
            data={ads}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            style={{
              marginTop: 20,
            }}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 200,
            }}
            renderItem={({ item }) => {
              console.log(item)
              return <AdCard  item={item} />;
            }}
          />
          ) : 
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 50
            }}
            size='h3'
          >
            Nema pronađenih oglasa
          </Text>
          }

        </SectionContent>
      </Section>
      <FloatingButton />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginRight: 5,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  selectedButton: {
    borderColor: 'blue',
  },
  buttonText: {
    fontSize: 16,
  },
  selectedButtonText: {
    color: 'white',
  },
});

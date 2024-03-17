import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Layout, Text } from "react-native-rapi-ui";
import { Image } from "expo-image";
import AvatarCard from "../components/AvatarCard";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const AdScreen = (props) => {
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const item = props.route.params.item;
  console.log("item", item);
  return (
    <Layout>
      <View
        style={{
          width: Dimensions.get("window").width,
          height: 300,
        }}
      >
        <Image
          source={{
            uri:
              item?._id === "65f678673de236b96a6a126c"
                ? "https://mojnovistan.com/wp-content/uploads/2020/07/2321316_16091-1592059923-1.jpg"
                : item?._id === "65f678bf3de236b96a6a126d"
                ? "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : "https://images.unsplash.com/photo-1630699144641-72fa7a6b8aa1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={{ width: Dimensions.get("window").width, height: 300 }}
        />

        <TouchableOpacity
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            borderRadius: 50,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            borderRadius: 50,
          }}
          onPress={async () => {
            // TODO: Add to favourites
            setIsFavourite(!isFavourite);
            await AsyncStorage.setItem("favourites", "true");
          }}
        >
          <Ionicons
            name="heart"
            size={40}
            color={isFavourite ? "red" : "white"}
          />
        </TouchableOpacity>

        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: Dimensions.get("window").width,
            padding: 20,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Text
            fontWeight="bold"
            size="h2"
            style={{
              color: "white",
            }}
          >
            {item?.description.split(" ").slice(0, 3).join(" ")}...
          </Text>
          <Text
            fontWeight="light"
            size="h6"
            style={{
              color: "white",
            }}
          >
            100m2
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View
          style={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flex: 1,
            width: Dimensions.get("window").width,
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 24,
            }}
          >
            <Text
              fontWeight="bold"
              size="h3"
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              €{item?.price}
              <Text fontWeight="light" size="h3">
                /mesec
              </Text>
            </Text>
            <Text fontWeight="bold" size="h3">
              Subotica, Srbija
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  marginRight: 10,
                  padding: 5,
                  borderRadius: 5,
                  backgroundColor: "#f2f2f2",
                  width: 80,
                }}
              >
                <Ionicons name="business-outline" size={20} color="gray" />
                <Text
                  fontWeight="bold"
                  style={{
                    color: "gray",
                  }}
                >
                  {item?.details?.floor} sprat
                </Text>
              </View>

              <View
                style={{
                  alignItems: "center",
                  marginRight: 10,
                  padding: 5,
                  borderRadius: 5,
                  backgroundColor: "#f2f2f2",
                  width: 80,
                }}
              >
                <Ionicons name="bed" size={20} color="gray" />
                <Text
                  fontWeight="bold"
                  style={{
                    color: "gray",
                  }}
                >
                  {item?.details?.rooms} sobe
                </Text>
              </View>

              <View
                style={{
                  alignItems: "center",
                  marginRight: 10,
                  padding: 5,
                  borderRadius: 5,
                  backgroundColor: "#f2f2f2",
                  width: 80,
                }}
              >
                <MaterialCommunityIcons
                  name={item?.details?.pets ? "paw" : "paw-off"}
                  size={20}
                  color="gray"
                />
                <Text
                  fontWeight="bold"
                  style={{
                    color: "gray",
                  }}
                >
                  Životinje
                </Text>
              </View>
            </View>

            <Text
              fontWeight="bold"
              size="h2"
              style={{
                marginTop: 20,
              }}
            >
              Fotografije
            </Text>

            <ScrollView
              style={{
                flexDirection: "row",
              }}
              horizontal={true}
              contentContainerStyle={{
                justifyContent: "space-between",
              }}
              showsHorizontalScrollIndicator={false}
            >
              <Image
                source={{
                  uri: "https://mojnovistan.com/wp-content/uploads/2020/07/2321316_16091-1592059923-1.jpg",
                }}
                style={{
                  width: Dimensions.get("screen").width / 3,
                  height: 100,
                  margin: 5,
                }}
              />
              <Image
                source={{
                  uri: "https://mojnovistan.com/wp-content/uploads/2020/07/2321316_16091-1592059923-1.jpg",
                }}
                style={{
                  width: Dimensions.get("screen").width / 3,
                  height: 100,
                  margin: 5,
                }}
              />
              <Image
                source={{
                  uri: "https://mojnovistan.com/wp-content/uploads/2020/07/2321316_16091-1592059923-1.jpg",
                }}
                style={{
                  width: Dimensions.get("screen").width / 3,
                  height: 100,
                  margin: 5,
                }}
              />
              <Image
                source={{
                  uri: "https://mojnovistan.com/wp-content/uploads/2020/07/2321316_16091-1592059923-1.jpg",
                }}
                style={{
                  width: Dimensions.get("screen").width / 3,
                  height: 100,
                  margin: 5,
                }}
              />
              <Image
                source={{
                  uri: "https://mojnovistan.com/wp-content/uploads/2020/07/2321316_16091-1592059923-1.jpg",
                }}
                style={{ width: 100, height: 100, margin: 5 }}
              />
            </ScrollView>
            <Text
              style={{
                marginTop: 20,
                marginBottom: 10,
              }}
              fontWeight="bold"
              size="h3"
            >
              Opis
            </Text>
            <Text
              style={{
                color: "gray",
              }}
            >
              {item?.description}
            </Text>
          </View>
        </View>
      </ScrollView>
      <AvatarCard user={item?.user} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default AdScreen;

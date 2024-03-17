import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, useTheme, themeColor } from "react-native-rapi-ui";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

const AdCard = ({ item, index }) => {
  const navigation = useNavigation();
  const { isDarkmode } = useTheme();
  return (
    <TouchableOpacity
      style={{
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 10,
      }}
      onPress={() => {
        navigation.navigate("AdScreen", {
          item,
        });
      }}
    >
      <Image
        source={{
          uri:
            index === 0
              ? "https://images.unsplash.com/photo-1628592102751-ba83b0314276?q=80&w=1997&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              : index === 1
              ? "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              : "https://images.unsplash.com/photo-1630699144641-72fa7a6b8aa1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={{
          borderRadius: 10,
          aspectRatio: 135 / 76,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
          bottom: 10,
          left: 0,
          marginHorizontal: "5%",
          width: "90%",
          borderWidth: 1,
          borderColor: "#f2f2fa",
        }}
      >
        <View>
          <Text
            fontWeight="bold"
            style={{
              fontSize: 20,
              color: themeColor.dark,
            }}
          >
            {item?.user?.firstName} {item?.user?.lastName}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "grey",
              }}
            >
              {item?.details?.rooms} sobe
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "grey",
              }}
            >
              {item?.details?.floor} sprat
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Text
            fontWeight="bold"
            style={{
              fontSize: 20,
              color: themeColor.dark,
            }}
          >
            €{item?.price}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "grey",
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

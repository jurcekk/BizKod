import React, { useState, useContext, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import {
  Layout,
  Button,
  Text,
  TopNav,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { FontAwesome5 } from "@expo/vector-icons";
import { interesovanja } from "../../data/interesovanja";
import { updateUser } from "../../data/izmenaPodatakaKorisnik";
import { useNavigation } from "@react-navigation/native";

const Second = (props) => {
  const [interests, setInterests] = useState([]);
  const { userData } = useContext(AuthContext);
  const navigation = useNavigation();
  const updateUserFunction = async () => {
    let id = userData?._id;
    const obj = {
      ...props.route.params,
      interests,
      id,
    };
    const response = await updateUser(obj);
    if (response.message === "User info are updated!") {
      navigation.navigate("MainTabs");
    }
  };
  return (
    <Layout>
      <TopNav
        middleContent="Interesovanja"
        leftContent={
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <FontAwesome5
              name="chevron-left"
              size={24}
              color={useTheme().text}
            />
          </TouchableOpacity>
        }
      />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        <Text fontWeight="bold" style={{ marginVertical: 15, padding: 20 }}>
          Odaberite minimum 5 oblasti koje vas interesuju
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {interesovanja.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (interests.includes(item)) {
                    setInterests(interests.filter((i) => i !== item));
                  } else {
                    setInterests([...interests, item]);
                  }
                }}
                style={{
                  backgroundColor: interests.includes(item)
                    ? themeColor.primary
                    : themeColor.white,
                  padding: 10,
                  margin: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: interests.includes(item)
                      ? themeColor.white
                      : themeColor.dark,
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Button
          text="Nastavi"
          onPress={() => {
            updateUserFunction();
          }}
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            martinTop: "auto",
          }}
          disabled={interests.length < 5}
        />
      </View>
    </Layout>
  );
};

export default Second;

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
  Section,
  SectionContent,
  useTheme,
  themeColor,
  Picker,
  RadioButton,
} from "react-native-rapi-ui";
import InputField from "../../components/InputField";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getAllAreas } from "../../data/getAllAreas";
const First = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      number: "",
      gender: "male",
      location: "",
      dateOfBirth: "",
      job: "nezaposlen",
      jobRole: "",
      studentField: "",
    },
  });
  const [location, setLocation] = useState(null);
  const [area, setAreas] = useState(null);
  const [gender, setGender] = useState("male");
  const [job, setJob] = useState("nezaposlen");
  const [jobRole, setJobRole] = useState(null);
  const [studentField, setStudentField] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const { isDarkmode, setTheme } = useTheme();
  RadioButton;
  useEffect(() => {
    getLocation();
    getAreas();
  }, []);

  const showMode = () => {
    setShowDate(true);
  };
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    let regionName = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    setLocation(regionName[0].city);
    setValue("location", regionName[0].city);
  };
  const getAreas = async () => {
    const response = await getAllAreas();
    let array = [];
    response?.items.forEach((el) => {
      array.push({ label: el?.name, value: el?.name });
    });
    setAreas(array);
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <TopNav middleContent="Dodatni podaci o korisniku" />
        <View
          style={{
            flex: 1,
          }}
        >
          <SectionContent>
            <Text style={{ marginTop: 15, marginBottom: 5 }}>Ime</Text>
            <InputField
              control={control}
              errors={errors}
              label="Ime"
              name="firstName"
              defaultValue=""
              rules={{
                required: "Lokacija je required",
              }}
            />

            <Text style={{ marginTop: 15, marginBottom: 5 }}>Prezime</Text>
            <InputField
              control={control}
              errors={errors}
              label="Prezime"
              name="lastName"
              defaultValue=""
              rules={{
                required: "Lokacija je required",
              }}
            />
            <Text style={{ marginTop: 15, marginBottom: 5 }}>
              Broj telefona
            </Text>
            <InputField
              control={control}
              errors={errors}
              label="Broj telefona"
              name="number"
              defaultValue=""
              rules={{
                required: "Lokacija je required",
              }}
              type="numeric"
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 25,
                gap: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton
                  value={gender === "male" ? true : false}
                  onValueChange={(val) => {
                    if (val) {
                      setGender("male");
                      setValue("gender", "male");
                    }
                  }}
                  checkedColor={themeColor.primary}
                />
                <Text size="md" style={{ marginLeft: 10, color: "gray" }}>
                  Muško
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton
                  value={gender === "female" ? true : false}
                  onValueChange={(val) => {
                    if (val) {
                      setGender("female");
                      setValue("gender", "female");
                    }
                  }}
                  checkedColor={themeColor.primary}
                />
                <Text size="md" style={{ marginLeft: 10, color: "gray" }}>
                  Žensko
                </Text>
              </View>
            </View>

            <SectionContent
              style={{
                marginTop: 10,
                marginBottom: 5,
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexShrink: 1,
                flexDirection: "row",
              }}
              padding={0}
            >
              <View
                style={{
                  flex: 1,
                  marginRight: 10,
                }}
              >
                <Text style={{ marginTop: 15, marginBottom: 5 }}>Lokacija</Text>

                <InputField
                  control={control}
                  errors={errors}
                  label="Lokacija"
                  name="location"
                  defaultValue=""
                  rules={{
                    required: "Lokacija je required",
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  getLocation();
                }}
                style={{
                  backgroundColor: themeColor.primary,
                  padding: 10,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  name="location-arrow"
                  size={20}
                  color={themeColor.white100}
                />
              </TouchableOpacity>
            </SectionContent>
            <Text style={{ marginTop: 15, marginBottom: 5 }}>
              Datum rođenja
            </Text>

            <TouchableOpacity
              onPress={showMode}
              style={{
                zIndex: 1000,
              }}
            >
              <InputField
                control={control}
                errors={errors}
                label="Datum rođenja"
                name="dateOfBirth"
                defaultValue=""
                rules={{
                  required: "Datum rođenja je obavezan",
                }}
                editable={false}
                onPressIn={showMode}
              />
            </TouchableOpacity>
            {showDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                onChange={(event, selectedDate) => {
                  setShowDate(false);
                  setValue(
                    "dateOfBirth",
                    selectedDate.toLocaleDateString("en-GB")
                  );
                  setDate(selectedDate);
                }}
                themeVariant={
                  isDarkmode && Platform.OS === "ios" ? "dark" : "light"
                }
              />
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                gap: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton
                  value={job === "zaposlen" ? true : false}
                  onValueChange={(val) => {
                    if (val) {
                      setJob("zaposlen");
                      setValue("job", "zaposlen");
                    }
                  }}
                  checkedColor={themeColor.primary}
                />
                <Text size="md" style={{ marginLeft: 10, color: "gray" }}>
                  Zaposlen
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton
                  value={job === "student" ? true : false}
                  onValueChange={(val) => {
                    if (val) {
                      setJob("student");
                      setValue("job", "student");
                    }
                  }}
                  checkedColor={themeColor.primary}
                />
                <Text size="md" style={{ marginLeft: 10, color: "gray" }}>
                  Student
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton
                  value={job === "nezaposlen" ? true : false}
                  onValueChange={(val) => {
                    if (val) {
                      setJob("nezaposlen");
                      setValue("job", "nezaposlen");
                    }
                  }}
                  checkedColor={themeColor.primary}
                />
                <Text size="md" style={{ marginLeft: 10, color: "gray" }}>
                  Nezaposlen
                </Text>
              </View>
            </View>

            {job === "zaposlen" && (
              <View
                style={{
                  marginTop: 15,
                }}
              >
                <Text style={{ marginBottom: 10 }}>Oblast poslovanja</Text>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      borderRadius: 10,
                      height: 50,
                      shadowColor: "black",
                      shadowOpacity: 0.3,
                      shadowRadius: 2,
                      shadowOffset: {
                        height: 1,
                        width: 0,
                      },
                      elevation: 2,
                      backgroundColor: "#F2F2F2",
                      paddingLeft: 0,
                    },
                    isDarkmode ? styles.dark : styles.light,
                  ]}
                >
                  <Picker
                    items={area}
                    value={jobRole}
                    placeholder="Izaberite oblast poslovanja"
                    onValueChange={(val) => {
                      setValue("jobRole", val);
                      clearErrors("jobRole");
                      setJobRole(val);
                    }}
                    borderWidth={0}
                    backgroundColor={isDarkmode ? "#282D33" : "#fafafa"}
                  />
                </View>
              </View>
            )}
            {errors.jobRole && (
              <Text
                style={{
                  color: "red",
                  fontSize: 12,
                  alignSelf: "flex-start",
                }}
              >
                {errors.jobRole.message}
              </Text>
            )}

            {job === "student" && (
              <View
                style={{
                  marginTop: 15,
                }}
              >
                <Text style={{ marginBottom: 10 }}>Oblast studija</Text>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      borderRadius: 10,
                      height: 50,
                      shadowColor: "black",
                      shadowOpacity: 0.3,
                      shadowRadius: 2,
                      shadowOffset: {
                        height: 1,
                        width: 0,
                      },
                      elevation: 2,
                      backgroundColor: "#F2F2F2",
                      paddingLeft: 0,
                    },
                    isDarkmode ? styles.dark : styles.light,
                  ]}
                >
                  <Picker
                    items={area}
                    value={studentField}
                    placeholder="Izaberite oblast studija"
                    onValueChange={(val) => {
                      setValue("studentField", val);
                      clearErrors("studentField");
                      setStudentField(val);
                    }}
                    borderWidth={0}
                    backgroundColor={isDarkmode ? "#282D33" : "#fafafa"}
                  />
                </View>
              </View>
            )}
            {errors.studentField && (
              <Text
                style={{
                  color: "red",
                  fontSize: 12,
                  alignSelf: "flex-start",
                }}
              >
                {errors.studentField.message}
              </Text>
            )}
          </SectionContent>

          <SectionContent>
            <Button
              text="Dalje"
              onPress={handleSubmit((data) => {
                if (jobRole === null && job === "zaposlen") {
                  setError("jobRole", {
                    type: "manual",
                    message: "Izaberite oblast poslovanja",
                  });
                } else if (studentField === null && job === "student") {
                  setError("studentField", {
                    type: "manual",
                    message: "Izaberite oblast oblast studija",
                  });
                } else {
                  clearErrors("jobRole");
                  clearErrors("studentField");
                }

                navigation.navigate("Second", data);
              })}
              style={{
                marginTop: 10,
              }}
            />
          </SectionContent>
        </View>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = new StyleSheet.create({
  dark: {
    backgroundColor: "#282D33",
    borderWidth: 1,
    borderColor: "#fafafa50",
  },

  light: {
    backgroundColor: "#fafafa",
    shadowColor: "black",
  },
});

export default First;

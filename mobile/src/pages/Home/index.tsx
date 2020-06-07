import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { View, Image, StyleSheet, Text, ImageBackground } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import endpoints from "../../services/api";
import { UfIbge, CityIbge, Item } from "../../interfaces";

const Home = () => {
  const navigation = useNavigation();
  const [ufs, setUfs] = useState<Item>({} as Item);
  const [cities, setCities] = useState<Item>({} as Item);
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    endpoints.getUfs().then((response) => {
      const ufs: any = response.data.map((uf: any) => {
        return {
          label: uf.sigla,
          value: uf.sigla,
        };
      });
      setUfs(ufs);
    });
  }, []);

  useEffect(() => {
    if (selectedUf !== "") {
      endpoints.getCities(selectedUf).then((response) => {
        const cities: any = response.data.map((city: any) => {
          return {
            label: city.nome,
            value: city.nome,
          };
        });
        setCities(cities);
      });
    }
  }, [selectedUf]);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/home-background.png")}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <View style={styles.footer}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedUf(value)}
          value={selectedUf}
          items={ufs}
          style={pickerSelectStyles}
        />

        <RNPickerSelect
          onValueChange={(value) => setSelectedCity(value)}
          value={selectedCity}
          items={cities}
          style={pickerSelectStyles}
        />

        <RectButton
          style={styles.button}
          onPress={() =>
            navigation.navigate("Points", {
              uf: selectedUf,
              city: selectedCity,
            })
          }
        >
          <View style={styles.buttonIcon}>
            <Text>
              <Feather name="arrow-right" color="#FFF" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingBottom: 10,
  },
});

export default Home;

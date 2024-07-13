// import React, { useState, useRef, useCallback } from "react";
// import {
//   View,
//   Text,
//   SafeAreaView,
//   TextInput as RNTextInput,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { Background } from "@/src/components/container";
// import { Button } from "@/src/components/button";
// import { TextInput, Menu, Button as RNPButton } from "react-native-paper";
// import { theme } from "@/src/theme";
// import { styles } from "./styles";
// import { router, useFocusEffect } from "expo-router";
// import { isValidPhoneNumber } from "@/src/utils";

// import { useAuthStore } from "@/src/store/authStore";

// export default function Login() {
//   const [menuVisible, setMenuVisible] = useState(false);

//   const {
//     phoneNumber,
//     areaCode,
//     setPhoneNumber,
//     setAreaCode,
//     signInWithPhoneNumber,
//     loading,
//     checkUserExists,
//   } = useAuthStore();

//   const textInputRef = useRef<RNTextInput>(null);

//   const openMenu = () => setMenuVisible(true);
//   const closeMenu = () => setMenuVisible(false);

//   useFocusEffect(
//     useCallback(() => {
//       if (textInputRef.current) {
//         textInputRef.current.focus();
//       }
//     }, [])
//   );

//   const handleLogin = async () => {
//     if (!isValidPhoneNumber(phoneNumber)) {
//       Alert.alert(
//         "Número Inválido",
//         "Por favor, ingresa un número de teléfono válido"
//       );
//       return;
//     }

//     const fullPhoneNumber = areaCode + phoneNumber;
//     const userExists = await checkUserExists(fullPhoneNumber);

//     if (userExists) {
//       const result = await signInWithPhoneNumber();

//       if (result.success) {
//         router.push("otp");
//       } else {
//         Alert.alert("Error", result.message);
//       }
//     } else {
//       router.push("register");
//     }
//   };

//   const goToRegister = () => {
//     router.push("register");
//   };

//   return (
//     <Background>
//       <SafeAreaView>
//         <ScrollView automaticallyAdjustKeyboardInsets>
//           <View style={styles.containerTitle}>
//             <Text style={styles.title}>Iniciar sesión</Text>
//             <Text
//               style={styles.subtitle}
//             >{`Tan simple como loguearte \ncon tu número de móvil`}</Text>
//           </View>
//           <View style={styles.container}>
//             <View style={styles.row}>
//               <Menu
//                 visible={menuVisible}
//                 onDismiss={closeMenu}
//                 anchor={
//                   <RNPButton
//                     mode="outlined"
//                     onPress={openMenu}
//                     style={styles.areaButton}
//                     textColor="white"
//                   >
//                     {areaCode}
//                   </RNPButton>
//                 }
//               >
//                 <Menu.Item
//                   onPress={() => {
//                     setAreaCode("+54");
//                     closeMenu();
//                   }}
//                   title="+54 Argentina"
//                   titleStyle={{
//                     fontFamily: "RobotoBold",
//                   }}
//                 />
//                 <Menu.Item
//                   onPress={() => {
//                     setAreaCode("+34");
//                     closeMenu();
//                   }}
//                   title="+34 España"
//                   titleStyle={{
//                     fontFamily: "RobotoBold",
//                   }}
//                 />
//               </Menu>
//               <TextInput
//                 ref={textInputRef}
//                 style={styles.input}
//                 mode="outlined"
//                 focusable={true}
//                 value={phoneNumber}
//                 label={""}
//                 onChangeText={(text) => setPhoneNumber(text)}
//                 placeholder={"Número de móvil"}
//                 autoFocus={true}
//                 onSubmitEditing={() => console.log("Login Process")}
//                 keyboardType={"phone-pad"}
//                 // maxLength={areaCode === "+54" ? 10 : 9}
//                 theme={{
//                   colors: {
//                     primary: theme.colors.white,

//                     background: "transparent",
//                     placeholder: theme.colors.white,
//                     text: theme.colors.white,
//                   },
//                   roundness: 10,
//                 }}
//                 placeholderTextColor={theme.colors.white}
//                 activeOutlineColor={theme.colors.white}
//                 outlineColor={theme.colors.white}
//                 textColor={theme.colors.white}
//                 keyboardAppearance="dark"
//                 outlineStyle={{ borderWidth: 0.9 }}
//               />
//             </View>
//             <View style={styles.login}>
//               <Button
//                 mode="contained"
//                 onPress={handleLogin}
//                 title={"Iniciar sesión"}
//                 labelStyle={styles.labelLogin}
//                 disabled={loading}
//                 loading={loading}
//               />
//             </View>

//             <View style={styles.register}>
//               <Button
//                 mode="outlined"
//                 onPress={goToRegister}
//                 title={"Quiero crear una cuenta"}
//                 labelStyle={styles.labelRegister}
//               />
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </Background>
//   );
// }

import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput as RNTextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Background } from "@/src/components/container";
import { Button } from "@/src/components/button";
import { TextInput, Menu, Button as RNPButton } from "react-native-paper";
import { theme } from "@/src/theme";
import { styles } from "./styles";
import { router, useFocusEffect } from "expo-router";
import { isValidPhoneNumber } from "@/src/utils";
import { useAuthStore } from "@/src/store/authStore";

export default function Login() {
  const [menuVisible, setMenuVisible] = useState(false);

  const {
    phoneNumber,
    areaCode,
    setPhoneNumber,
    setAreaCode,
    signInWithPhoneNumber,
    registerUser,
    loading,
    checkUserExists,
  } = useAuthStore();

  const textInputRef = useRef<RNTextInput>(null);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  useFocusEffect(
    useCallback(() => {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, [])
  );

  const handleLoginOrRegister = async () => {
    // if (!isValidPhoneNumber(phoneNumber)) {
    //   Alert.alert(
    //     "Número Inválido",
    //     "Por favor, ingresa un número de teléfono válido"
    //   );
    //   return;
    // }

    const fullPhoneNumber = areaCode + phoneNumber;
    const userExists = await checkUserExists(fullPhoneNumber);

    const result = await signInWithPhoneNumber();

    if (result.success) {
      if (!userExists) {
        const registerResult = await registerUser();
        if (registerResult.status !== "SUCCESS") {
          Alert.alert("Error", registerResult.message);
          return;
        }
      }
      router.push("otp");
    } else {
      Alert.alert("Error", result.message);
    }
  };

  return (
    <Background>
      <SafeAreaView>
        <ScrollView automaticallyAdjustKeyboardInsets>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Iniciar sesión</Text>
            <Text
              style={styles.subtitle}
            >{`Tan simple como loguearte \ncon tu número de móvil`}</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.row}>
              <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                  <RNPButton
                    mode="outlined"
                    onPress={openMenu}
                    style={styles.areaButton}
                    textColor="white"
                  >
                    {areaCode}
                  </RNPButton>
                }
              >
                <Menu.Item
                  onPress={() => {
                    setAreaCode("+54");
                    closeMenu();
                  }}
                  title="+54 Argentina"
                  titleStyle={{
                    fontFamily: "RobotoBold",
                  }}
                />
                <Menu.Item
                  onPress={() => {
                    setAreaCode("+34");
                    closeMenu();
                  }}
                  title="+34 España"
                  titleStyle={{
                    fontFamily: "RobotoBold",
                  }}
                />
              </Menu>
              <TextInput
                ref={textInputRef}
                style={styles.input}
                mode="outlined"
                focusable={true}
                value={phoneNumber}
                label={""}
                onChangeText={(text) => setPhoneNumber(text)}
                placeholder={"Número de móvil"}
                autoFocus={true}
                onSubmitEditing={() => console.log("Login Process")}
                keyboardType={"phone-pad"}
                // maxLength={areaCode === "+54" ? 10 : 9}
                theme={{
                  colors: {
                    primary: theme.colors.white,
                    background: "transparent",
                    placeholder: theme.colors.white,
                    text: theme.colors.white,
                  },
                  roundness: 10,
                }}
                placeholderTextColor={theme.colors.white}
                activeOutlineColor={theme.colors.white}
                outlineColor={theme.colors.white}
                textColor={theme.colors.white}
                keyboardAppearance="dark"
                outlineStyle={{ borderWidth: 0.9 }}
              />
            </View>
            <View style={styles.login}>
              <Button
                mode="contained"
                onPress={handleLoginOrRegister}
                title={"Iniciar sesión"}
                labelStyle={styles.labelLogin}
                disabled={loading}
                loading={loading}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}

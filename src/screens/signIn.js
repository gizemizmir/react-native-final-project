import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import React, {useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { navigate } = useNavigation();
  const { control, handleSubmit } = useForm();

  return (
    <SafeAreaView style={styles.form}>
    <View style={styles.formArea}>
      <Text style={styles.pageLabel}>Sign In</Text>
      <Controller
        control={control}
        name="email"
        render={({ field }) => {
          return (
            <>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                {...field}
                style={styles.input}
                autoCapitalize={false}
                onChangeText={field.onChange}
              />
            </>
          );
        }}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => {
          return (
            <>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                {...field}
                style={styles.input}
                autoCapitalize={false}
                onChangeText={field.onChange}
              />
            </>
          );
        }}
      />
      <Pressable style={styles.button} onPress={handleSubmit({})}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
      {isError ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <Text style={styles.errorText}> </Text>
      )}
      <Text style={styles.signupLabel}>Don't have an account?</Text>
      <Pressable
        style={styles.buttonSignUp}
        onPress={() => {
          navigate("SignUp");
        }}
      >
        <Text style={styles.buttonSignUpText}>Sign Up</Text>
      </Pressable>
    </View>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
form: {
  backgroundColor: "#FFF",
  height: "100%",
},
formArea: {
  width: "90%",
  height: "90%",
  display: "flex",
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
},
input: {
  width: "100%",
  height: 50,
  fontSize: 16,
  borderWidth: 1,
  borderColor: "#686868",
  marginBottom: 20,
  padding: 10,
  borderRadius: 4,
},
inputLabel: {
  display: "flex",
  alignSelf: "flex-start",
  marginBottom: 5,
  fontSize: 15,
  fontWeight: "bold",
},
pageLabel: {
  display: "flex",
  alignSelf: "center",
  marginBottom: 45,
  fontSize: 30,
  fontWeight: "bold",
},
button: {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 12,
  paddingHorizontal: 32,
  borderRadius: 4,
  elevation: 3,
  backgroundColor: "#06B6D4",
},
buttonText: {
  color: "#FFF",
  fontSize: 15,
  lineHeight: 21,
  fontWeight: "bold",
  letterSpacing: 0.25,
},
buttonSignUp: {
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 35,
  marginTop:10,
  paddingVertical: 12,
  paddingHorizontal: 32,
  borderWidth:1,
  borderRadius: 4,
  borderColor: '#06B6D4'
},
buttonSignUpText: {
  color: "#06B6D4",
  fontSize: 15,
  lineHeight: 21,
  fontWeight: "bold",
  letterSpacing: 0.25,
},
signupLabel: {
  display: "flex",
  alignSelf: "center",
  marginBottom: 5,
  fontSize: 15,
  fontWeight: "bold",
},
errorText: {
  color: "#ff3333",
  fontWeight: "bold",
  marginTop: 10,
  marginBottom: 25,
},
});
export default SignIn;

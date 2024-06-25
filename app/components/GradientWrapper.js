import React from "react";
import { View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const GradientWrapper = ({ children }) => {
  return (
    <LinearGradient
      style={styles.gradient}
      colors={["#FF5093", "#9A37E7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    alignItems: "center",
    borderRadius: 10,
  },
});

export default GradientWrapper;

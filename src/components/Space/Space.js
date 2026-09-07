import React from 'react';
import { View, StyleSheet } from 'react-native';
import { appColors } from '../../constants/appColors';

export const Space = ({ width = 0, height = 0 }) => {
  return <View style={{ width, height }} />;
};

export default Space;

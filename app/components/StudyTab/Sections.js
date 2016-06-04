import React, { PropTypes, Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from '../../styles';

class Sections extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Sections View
        </Text>
      </View>
    );
  }
}
export default Sections;

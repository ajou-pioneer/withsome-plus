/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import LoggedOutNavigation from '../../navigation/LoggedOutNavigation';
import MainTab from '../../navigation/MainTab';
import ProfileSettingsStack from '../../navigation/ProfileSettingNavigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
class AppContainer extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    makeProfile:PropTypes.bool,
  };
  render() {
    const { isLoggedIn,makeProfile } = this.props;
    if(isLoggedIn && makeProfile){
      return(
        <View  style={styles.container}>
          <MainTab/>
        </View>
      );
    }else if(isLoggedIn && !makeProfile){
      return(
        <View  style={styles.container}>
          <ProfileSettingsStack/>
        </View>
        
      );
    } else{
      return (
        <View  style={styles.container}>
          <LoggedOutNavigation/>
        </View>
      );
    }
  }
}

export default AppContainer;

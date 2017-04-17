import React from 'react';
import { ScrollView, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import S from '../styles/styles';
import LoadingIndicator from '../components/LoadingIndicator';

import { fetchUserProfile } from '../actions/UserProfileActions';

class Home extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Home`,
  };

  componentDidMount() {
    this.props.fetchUserProfile();
  }

  render() {
    // const { navigate } = this.props.navigation;
    const props = this.props;

    if (props.userProfileData.isFetching) {
      return (
        <LoadingIndicator />
      )
    }

    return (
      <ScrollView style={S.container}>
        <StatusBar barStyle="light-content" />
        { props.userProfileData.data ?
          <ScrollView data={props.userProfileData.data} /> : null
        }
      </ScrollView>
    );
  }
}

function mapStateToProps (state) {
  return {
    userProfileData: state.userProfileData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchUserProfile: () => dispatch(fetchUserProfile())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
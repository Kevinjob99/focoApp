import React from 'react'
import { createStackNavigator } from 'react-navigation'

import { R } from '../constants'
import S from '../styles'

import Splash from './Splash'
import SignInHome from './SignInHome'
import SignInWithEmail from './SignInWithEmail'
import SignUpWithEmail from './SignUpWithEmail'

const STACK = {}
STACK[R.NAV_USER_SIGNIN] = { screen: Splash }
STACK[R.NAV_USER_SIGNIN_HOME] = { screen: SignInHome }
STACK[R.NAV_USER_SIGNIN_WITH_EMAIL] = { screen: SignInWithEmail }
STACK[R.NAV_USER_SIGNUP_WITH_EMAIL] = { screen: SignUpWithEmail }

const SignInStack = createStackNavigator(STACK,  {
  swipeEnabled: false,
  animationEnabled: false,
  navigationOptions: ({navigation}) => ({
    title: null,
    gesturesEnabled: false,
    ...S.navigation.header,
    headerLeft: null,
  }),
})

export default SignInStack

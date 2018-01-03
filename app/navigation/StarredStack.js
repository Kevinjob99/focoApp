import React from 'react'
import { StackNavigator } from 'react-navigation'

import C from '../C'
import L from '../L'
import S from '../styles/styles'

import Icons from '../components/Icons'
import StarredHome from '../containers/StarredHome'
import StarredFilterConfigurator from '../containers/StarredFilterConfigurator'

const STACK = {}
STACK[C.NAV_STARRED_HOME] = { screen: StarredHome }
STACK[C.NAV_STARRED_FILTER_CONFIGURATOR] = { screen: StarredFilterConfigurator }

const StarredStack = StackNavigator(STACK, {
  navigationOptions: ({navigation}) => ({
    title: L.nav.app,
    tabBarLabel: L.nav.starred,
    tabBarIcon: ({ focused, tintColor }) => (
      Icons.star({ focused, color:tintColor, size:S.tabNav.iconSize })
    ),
  })
})

export default StarredStack

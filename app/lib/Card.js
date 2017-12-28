import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'

import styles, { sizes, themes, DefaultTheme } from './styles'
import StyledText from './StyledText'
import StyledDivider from './StyledDivider'

export default class Card extends React.Component {
  renderInner(props) {
    const theme = themes[props.theme] ? themes[props.theme] : DefaultTheme
    const headerBackground = props.backgroundColor ? 'transparent' : theme.backgroundColor
    const innerStyle = props.innerStyle

    return (
      <View style={{ flex:1, backgroundColor:'transparent', overflow:'hidden' }}>
        { props.title &&
          <View style={[styles.containers.header, {backgroundColor: headerBackground}]}>
            { props.subtitle &&
              <StyledText style='subtitle' theme={theme} numberOfLines={1}>
                {props.subtitle.toUpperCase()}
              </StyledText>
            }
            { props.title &&
              <StyledText style='title' theme={theme} numberOfLines={1}>
                {props.title}
              </StyledText>
            }
            { props.divider &&
              <StyledDivider location='bottom' theme={theme} />
            }
          </View>
        }
        {props.toggle}
        <View style={[styles.containers.normal, innerStyle]}>
          {props.children}
        </View>
      </View>
    )
  }

  render() {
    const props = this.props

    const theme = themes[props.theme] ? themes[props.theme] : DefaultTheme
    const backgroundImage = props.backgroundImage
    const backgroundColor = props.backgroundColor ? props.backgroundColor : theme.backgroundColor
    const containerStyle = [
      styles.cards.card,
      styles.cards.raised,
      styles.corners.rounded,
      { justifyContent: 'space-between' , backgroundColor: backgroundColor },
      props.containerStyle ? props.containerStyle : {},
    ]

    const card = (
      <View style={containerStyle}>
        { backgroundImage &&
          <Image
            style={[styles.corners.rounded, {width:'100%', height:'100%', position:'absolute'}]}
            source={{uri: backgroundImage}}
          />
        }
        {this.renderInner(props)}
      </View>
    )

    const onPress = this.props.onPress
    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          {card}
        </TouchableOpacity>
      )
    } else {
      return card
    }
  }
}

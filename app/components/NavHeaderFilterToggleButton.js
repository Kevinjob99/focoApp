import React from 'react'

import T from '../T'
import S from '../styles'
import Icons from '../components/Icons'

export default class NavHeaderFilterToggleButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { toggled:false }
    this.onTogglePress = this.onTogglePress.bind(this)
  }
  componentDidMount() {
    if (this.props.toggled) {
      this.setState({ toggled:true })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.toggled != this.props.toggled) {
      this.setState({ toggled:nextProps.toggled })
    }
  }
  onTogglePress() {
    this.props.onPress(!this.state.toggled)
  }
  render() {
    const props = this.props
    const paddingLeft = props.left ? S.spacing.xsmall : 0
    const paddingRight = props.right ? S.spacing.xsmall : 0
    const headerTintColor = props.inverse ? S.navigation.inverseHeader.headerTintColor : S.navigation.header.headerTintColor

    if (this.state.toggled) {
      return Icons.filter({
        size: T.icons.smallIcon,
        color: headerTintColor,
        style: {top:S.spacing.navIconSpacer, paddingLeft, paddingRight},
        onPress: this.onTogglePress
      })
    }

    return Icons.filterOutline({
      size: T.icons.smallIcon,
      color: S.navigation.inactiveHeader.headerTintColor,
      style: {top:S.spacing.navIconSpacer, paddingLeft, paddingRight},
      onPress: this.onTogglePress
    })
  }
}

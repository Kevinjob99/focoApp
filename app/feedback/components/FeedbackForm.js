import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { localize } from '../../locales'
import S from '../../styles'

export default class FeedbackForm extends React.Component {
  constructor() {
    super()
    this.state = { name:'', email:'', feedback:'' }
    this.onInputTextChange = this.onInputTextChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      name: this.props.name,
      email: this.props.email,
      feedback: ''
    })
  }

  onInputTextChange(key, text) {
    const newState = {}
    newState[key] = text
    this.setState(newState)
    this.props.onFormChange(key, text)
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={[S.form.container, {paddingTop:0}]}
        keyboardDismissMode="interactive"
        getTextInputRefs={() => {
          return [this._name, this._email, this._feedback]
        }}
      >
        <View style={S.form.group}>
          <Text style={S.form.label}>
            {localize("feedback.name")}
          </Text>
          <TextInput
            style={S.form.input}
            underlineColorAndroid="transparent"
            value={this.state.name}
            onChangeText={(text) => this.onInputTextChange('name', text)}
            ref={(r) => { this._name = r }}
            returnKeyType={'next'}
            onSubmitEditing={(event) => this._email.focus()}
          />
        </View>

        <View style={S.form.group}>
          <Text style={S.form.label}>
            {localize("feedback.email")}
          </Text>
          <TextInput
            style={S.form.input}
            underlineColorAndroid="transparent"
            value={this.state.email}
            keyboardType='email-address'
            onChangeText={(text) => this.onInputTextChange('email', text)}
            ref={(r) => { this._email = r }}
            returnKeyType={'next'}
            onSubmitEditing={(event) => this._feedback.focus()}
          />
        </View>

        <View style={S.form.group}>
          <Text style={S.form.label}>
            {localize("feedback.feedback")}
          </Text>
          <TextInput
            style={S.form.input}
            underlineColorAndroid="transparent"
            value={this.state.feedback}
            onChangeText={(text) => this.onInputTextChange('feedback', text)}
            multiline={true}
            numberOfLines={5}
            ref={(r) => { this._feedback = r }}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

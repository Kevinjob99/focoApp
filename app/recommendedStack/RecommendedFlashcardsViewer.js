import React from 'react'
import { connect } from 'react-redux'

import C, { R } from '../constants'

import FlashcardsListContainer from '../containers/FlashcardsListContainer'
import NavHeaderBackButton from '../components/NavHeaderBackButton'

import CurrentUser from '../auth/CurrentUser'
import { actions as UserPrefsActions } from '../userPrefs'
import { actions as FlashcardActions, FlashcardsList } from '../flashcards'

class RecommendedFlashcardsViewer extends FlashcardsListContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      title: null,
      headerLeft: <NavHeaderBackButton left={true} onPress={navigation.goBack} />,
    })
  }

  constructor(props) {
    super(props)
    this.setScreen({screenName:R.NAV_RECOMMENDED_FLASHCARDS_VIEWER, className:'RecommendedFlashcardsViewer'})
  }

  get user() {
    return CurrentUser
  }

  get _iapAccessRequired() {
    try {
      const navigation = this.props.navigation
      const collection = navigation.state.params.collection
      return collection.accessRequired
    } catch (e) {
      return null
    }
  }

  get _contentType() {
    return C.CONTENT_FLASHCARD
  }

  get _contentKey() {
    try {
      const navigation = this.props.navigation
      const collection = navigation.state.params.collection
      return collection.id
    } catch (e) {
      return null
    }
  }

  _fetchData() {
    const navigation = this.props.navigation
    if (!navigation) {
      return null
    }

    const user = this.user
    this.setState({refreshing: true})
    this.props.fetchFlashcards(navigation.state.params.collection.flashcards, user.uid)
  }

  _cancelFetch() {
    this.props.resetFlashcardsState()
    this.setState({refreshing: false})
  }

  _updatePref(options) {
    const { user, flashcard, pref } = options
    this.props.upsertUserFlashcardPrefs(
      user.uid,
      flashcard.id,
      pref,
    )
  }
}

const ns = R.NAV_RECOMMENDED_FLASHCARDS_VIEWER
function mapStateToProps (state) {
  return {
    user: CurrentUser.profile,
    ready: state.flashcards[ns] ? state.flashcards[ns].status === C.FB_FETCHED : null,
    flashcards: state.flashcards[ns] ? state.flashcards[ns].data : null,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetFlashcardsState: () => dispatch(FlashcardActions.resetFlashcardsState(ns)),
    fetchFlashcards: (ids, userId) => dispatch(FlashcardActions.fetchFlashcards(ns, ids, userId)),
    upsertUserFlashcardPrefs: (userId, flashcardId, prefs) => dispatch(UserPrefsActions.upsertUserFlashcardPrefs(userId, flashcardId, prefs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendedFlashcardsViewer)

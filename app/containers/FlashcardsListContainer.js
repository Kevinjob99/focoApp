import React from 'react'
import { Dimensions, StatusBar, Text, View, ScrollView, RefreshControl } from 'react-native'
import { Animated, LayoutAnimation } from 'react-native'

import C, { E } from '../constants'
import BaseListContainer from './BaseListContainer'
import { FlashcardsList } from '../flashcards'
import { AccessManager, ProUpgradeModal as IapModal } from '../iap'

export default class FlashcardsListContainer extends BaseListContainer {
  constructor(props) {
    super(props)
    this.onPrefToggle = this.onPrefToggle.bind(this)
    this.onCardFlip = this.onCardFlip.bind(this)
  }

  get _paging() {
    return true
  }

  get _scrollEventName() {
    return E.user_action_flashcards_scrolled
  }

  get _iapAccessRequired() {
    return C.ACCESS_CONSUMABLE_FLASHCARD
  }

  get _iapProductId() {
    return AccessManager.preferredProductForType(this._iapAccessRequired)
  }

  get _refProductId() {
    return AccessManager.referenceProductForType(this._iapAccessRequired)
  }

  get _contentType() {
    return C.CONTENT_FLASHCARD
  }

  get _contentKey() {
    return null
  }

  get _filteredFlashcards() {
    // to be overridden by subclasses
    return this.props.flashcards
  }

  onPrefToggle(id, pref) {
    const locked = !AccessManager.hasAccess({
      config: RemoteConfig.IAPFlowConfig,
      accessRequired: this._iapAccessRequired,
      contentType: this._contentType,
      contentKey: this._contentKey
    })

    if (!locked) {
      const user = this.user
      const flashcard = this.props.flashcards[id]
      this._updatePref({user, flashcard, pref})
      this.logEvent(E.user_action_flashcard_pref_updated, {
        flashcardId: flashcard.id,
        pref,
      })
    }
  }

  onCardFlip(flashcardId) {
    this.logEvent(E.user_action_flashcard_flipped, {
      flashcardId,
    })
  }

  _updatePref(options) {
    // no-op - to be overridden by subclass
  }

  _renderIapModal(props) {
    const isIapVisible = this.state.isIapVisible
    return (
      <IapModal
        productId={this._iapProductId}
        refProductId={this._refProductId}
        isVisible={isIapVisible}
        onDismiss={this.hideIapModal}
        onAttempt={this.onIapAttempt}
        onCancel={this.onIapCancelled}
        onSuccess={this.onIapSuccess}
        onError={this.onIapError} />
    )
  }

  _renderList(props) {
    const dimensions = this.state.dimensions
    const flashcards = this._filteredFlashcards
    const locked = !AccessManager.hasAccess({
      config: RemoteConfig.IAPFlowConfig,
      accessRequired: this._iapAccessRequired,
      contentType: this._contentType,
      contentKey: this._contentKey
    })

    if (flashcards) {
      return (
        <FlashcardsList
          dimensions={dimensions}
          flashcards={flashcards}
          locked={locked}
          onPrefToggle={this.onPrefToggle}
          onCardFlip={this.onCardFlip}
          onTriggerIAP={() => this.showIapModal(this._iapProductId)}
        />
      )
    }
  }
}

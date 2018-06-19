import React from 'react'
import { Dimensions, StatusBar, Text, View, ScrollView, RefreshControl } from 'react-native'
import { Animated, LayoutAnimation } from 'react-native'

import C, { E } from '../constants'
import BaseListContainer from './BaseListContainer'
import { CollectionCardsList } from '../collections'
import { AccessManager, ProUpgradeModal as IapModal } from '../iap'

export default class CollectionsListContainer extends BaseListContainer {
  constructor(props) {
    super(props)
    this.onCollectionPress = this.onCollectionPress.bind(this)
    this.onPrefToggle = this.onPrefToggle.bind(this)
  }

  get _scrollEventName() {
    return E.user_action_collections_scrolled
  }

  get _iapProductType() {
    return C.ACCESS_PREMIUM_COLLECTION
  }

  get _iapProductId() {
    return AccessManager.preferredProductForType(this._iapProductType)
  }

  get _onSelectedRoute() {
    // no-op - to be overridden by subclass
  }

  onCollectionPress(collection) {
    const navigation = this.props.navigation
    const user = this.props.user

    if (collection.status == C.STATUS_COMING_SOON) {
      this.logEvent(E.user_action_collection_coming_soon, {
        uid: user.uid,
        collectionId: collection.id,
        ...this._screen,
      })
    } else {
      this.logEvent(E.user_action_collection_selected, {
        uid: user.uid,
        collectionId: collection.id,
        ...this._screen,
      })
      navigation.navigate(this._onSelectedRoute, {
        user, collection
      })
    }
  }

  onPrefToggle(collectionId, pref) {
    const user = this.props.user
    const collection = {id:collectionId, ...this.props.collections[collectionId]}
    this._updatePref({user, collection, pref})
    this.logEvent(E.user_action_collection_pref_updated, {
      uid: user.uid,
      collectionId: collection.id,
      pref,
      ...this._screen,
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
        isVisible={isIapVisible}
        onDismiss={this.hideIapModal}
        onAttempt={this.onIapAttempt}
        onSuccess={this.onIapSuccess}
        onError={this.onIapError} />
    )
  }

  _renderList(props) {
    const collections = props.collections ? props.collections : {}
    const keys = Object.keys(collections).sort().reverse()

    if (collections) {
      return (
        <CollectionCardsList
          keys={keys}
          collections={collections}
          onSelect={this.onCollectionPress}
          onPrefChange={this.onPrefToggle}
          onTriggerIAP={() => this.showIapModal(this._iapProductId)}
        />
      )
    }
  }
}

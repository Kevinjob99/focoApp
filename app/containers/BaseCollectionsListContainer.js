import React from 'react'
import { Dimensions, StatusBar, View, ScrollView, RefreshControl } from 'react-native'

import { E } from '../constants'
import S from '../styles'
import BaseContainer from './BaseContainer'
import CollectionCard from '../components/CollectionCard'
import LoadingScreen from '../components/LoadingScreen'
import EmptyListScreen from '../components/EmptyListScreen'
import BackToTopButton from '../components/BackToTopButton'

export default class CollectionHome extends BaseContainer {
  constructor(props) {
    super(props)
    this.state = { ...this.state, showBackToTop: false, reachedEnd: false }
    this.onScroll = this.onScroll.bind(this)
    this.onScrollToTopPress = this.onScrollToTopPress.bind(this)
    this.onCollectionPress = this.onCollectionPress.bind(this)
    this.onPrefToggle = this.onPrefToggle.bind(this)
  }

  componentDidMount() {
    this._fetchData()
  }

  componentWillUnmount() {
    this._cancelFetch()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ready && !this.props.ready) {
      this.setState({refreshing: false})
    }
  }

  onRefresh() {
    this._fetchData()
  }

  onScroll(e) {
    const yOffset = e.nativeEvent.contentOffset.y
    const passThreshold = yOffset > (this.state.dimensions.height * 1.5)
    if (!this.state.showBackToTop && passThreshold) {
      this.setState({ showBackToTop: true })
      this.logEvent(E.user_action_collections_scrolled, {
        uid: this.props.user.uid,
        ...this._screen,
      })
    }

    if (this.state.showBackToTop && !passThreshold) {
      this.setState({ showBackToTop: false })
    }

    const user = this.props.user
    const windowHeight = Dimensions.get('window').height
    const scrolledToEnd = (windowHeight + yOffset) >= e.nativeEvent.contentSize.height
    if (!this.state.reachedEnd && scrolledToEnd) {
      this.setState({ reachedEnd: true })
      this.logEvent(E.user_action_collections_scrolled, {
        uid: user.uid,
        location: 'end',
        ...this._screen,
      })
    } else if (this.state.reachedEnd && !scrolledToEnd) {
      this.setState({ reachedEnd: false })
    }
  }

  onScrollToTopPress() {
    this.refs['_SCROLLVIEW'].scrollTo({x: 0, y: 0, animated: true})
    this.logEvent(E.user_action_collections_scrolled, {
      uid: user.uid,
      location: 'start',
      ...this._screen,
    })
  }

  onCollectionPress(collection) {
    const navigation = this.props.navigation
    const user = this.props.user
    this.logEvent(E.user_action_collection_selected, {
      uid: user.uid,
      collectionId: collection.id,
      ...this._screen,
    })
    navigation.navigate(this._viewerRoute(), {
      user, collection
    })
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

  _fetchData() {
    // no-op - to be overridden by subclass
  }

  _cancelFetch() {
    // no-op - to be overridden by subclass
  }

  _updatePref(options) {
    // no-op - to be overridden by subclass
  }

  _viewerRoute() {
    // no-op - to be overridden by subclass
  }

  render() {
    const navigation = this.props.navigation
    const user = this.props.user
    const ready = this.props.ready

    const collections = this.props.collections ? this.props.collections : {}
    const collectionsKeys = Object.keys(collections)
    const refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      />
    )

    if (!ready || !user || !this.state.dimensions) {
      return (
        <LoadingScreen onLayout={this.onLayout} />
      )
    }

    if (collectionsKeys.length == 0) {
      return (
        <EmptyListScreen onLayout={this.onLayout} refreshControl={refreshControl} />
      )
    }

    return (
      <View style={{flex:1}}>
        <ScrollView
          contentContainerStyle={S.containers.list}
          refreshControl={refreshControl}
          onScroll={this.onScroll}
          scrollEventThrottle={64}
          ref='_SCROLLVIEW'
        >
          <StatusBar barStyle={S.statusBarStyle} />
          { collections &&
            collectionsKeys.map((id, index) => {
              const collection = {id, ...collections[id]}
              const lastItem = (index == (collectionsKeys.length-1)) ? S.lists.lastItem : null
              return (
                <CollectionCard
                  style={[S.lists.listItem, lastItem]}
                  key={collection.id}
                  type={collection.type}
                  collection={collection}
                  onPrefToggle={this.onPrefToggle}
                  onPress={() => this.onCollectionPress(collection)}>
                </CollectionCard>
              )
            }
          )}
        </ScrollView>

        { this.state.showBackToTop && (
          <BackToTopButton
            style={S.lists.backToTop}
            onPress={this.onScrollToTopPress}
          />
        )}
      </View>
    )
  }
}

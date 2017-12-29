import React from 'react'
import { View, Dimensions } from 'react-native'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'

import FlashcardSetCard from './FlashcardSetCard'
import AddNewCard from './AddNewCard'

export default class CollectionsGridList extends React.Component {
  render() {
    const cardSets = this.props.sets
    const onPress = this.props.onPress
    const onAddNew = this.props.onAddNew
    const onEdit = this.props.onEdit
    const {height, width} = Dimensions.get('window')
    const padding = S.spacing.normal
    const itemWidth = (width-padding*2) / 2 - S.spacing.xsmall

    return (
      <View style={S.containers.grid}>
        { Object.keys(cardSets).map(id => {
          const set = cardSets[id]
          return (
            <FlashcardSetCard
              key={id}
              type='regular'
              set={set}
              style={{width: itemWidth, marginBottom:S.spacing.xsmall*2}}
              onEdit={() => onEdit({id, ...set})}
              onPress={() => onPress({id, ids:set.flashcards})}>
            </FlashcardSetCard>
          )
        })}

        <AddNewCard
          style={{width: itemWidth, marginBottom:S.spacing.xsmall*2}}
          type='regular'
          onPress={onAddNew} />
      </View>
    )
  }
}

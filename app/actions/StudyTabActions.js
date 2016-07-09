import C from '../constants';
import { push } from './NavigationActions';

import { carddecks, flashcards } from '../data/TestData';

// --- Cardsdeck actions ---//
function requestDecks(section) {
  return {
    type: C.REQUEST_SECTION_DECKS,
    section,
  }
}
function receiveDecks(section, json) {
  return {
    type: C.RECEIVE_SECTION_DECKS,
    section,
    carddecks: json,
    receivedAt: Date.now()
  }
}
function fetchDecks(section) {
  return dispatch => {
    dispatch(requestDecks(section));

    // TODO replace with call to Firebase
    return fetch(`http://www.reddit.com/r/Showerthoughts.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveDecks(section, carddecks)))
  }
}
function shouldFetchDecks(state, section) {
  const decksState = state.carddecksForSection[section.id];
  if (!decksState) {
    return true
  } else if (decksState.isFetching) {
    return false
  } else {
    return decksState.didInvalidate
  }
}
export function fetchDecksIfNeeded(section) {
  return (dispatch, getState) => {
    const state = getState().get(C.S_STUDYTAB)
    if (shouldFetchDecks(state, section)) {
      return dispatch(fetchDecks(section))
    }
  }
}

// --- flashcards actions ---//
function requestFlashcards(carddeck) {
  return {
    type: C.REQUEST_DECK_CARDS,
    carddeck,
  }
}
function receiveFlashcards(carddeck, json) {
  return {
    type: C.RECEIVE_DECK_CARDS,
    carddeck,
    flashcards: json,
    receivedAt: Date.now()
  }
}
function fetchFlashcards(carddeck) {
  return dispatch => {
    dispatch(requestFlashcards(carddeck));

    // TODO replace with call to Firebase
    return fetch(`http://www.reddit.com/r/Showerthoughts.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveFlashcards(carddeck, flashcards)))
  }
}
function shouldFetchFlashcards(state, carddeck) {
  const cardsState = state.flashcardsForDeck[carddeck.id];
  if (!cardsState) {
    return true
  } else if (cardsState.isFetching) {
    return false
  } else {
    return cardsState.didInvalidate
  }
}
export function fetchFlashcardsIfNeeded(carddeck) {
  return (dispatch, getState) => {
    const state = getState().get(C.S_STUDYTAB)
    if (shouldFetchFlashcards(state, carddeck)) {
      return dispatch(fetchFlashcards(carddeck))
    }
  }
}
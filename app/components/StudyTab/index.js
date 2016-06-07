/*
*
* StudyHome
*
*/

import React, { Component } from 'react';
import { View, ScrollView, Platform, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';

import styles, { theme } from '../../styles';
import Section from './Section';
import SectionDetails from './SectionDetails';
import MCActivity from './MCActivity';

import StudySections from '../../data/StudySections';

const { Header: NavigationHeader, CardStack: NavigationCardStack } = NavigationExperimental;
const NavigationHeaderBackButton = require('NavigationHeaderBackButton');

class StudyTab extends Component {
	render() {
		return (
			<NavigationCardStack
				direction={'horizontal'}
				navigationState={this.props.navigation}
				onNavigate={this._onNavigate}
				renderScene={this._renderScene.bind(this)}
				renderOverlay={this._renderHeader.bind(this)}
				style={styles.main}
			/>
		);
	}

	_renderHeader(props) {
		const showHeader = props.scene.navigationState.title &&
			(Platform.OS === 'ios' || props.scene.navigationState.key === 'sections');

		if (showHeader) {
			return (
				<NavigationHeader
				{...props}
				renderTitleComponent={this._renderTitleComponent.bind(this)}
				renderLeftComponent={this._renderLeftComponent.bind(this)}
				renderRightComponent={this._renderRightComponent.bind(this)}
				/>
			);
		}

		return null;
	}

	_renderTitleComponent(props) {
		return (
			<NavigationHeader.Title>
				{props.scene.navigationState.title}
			</NavigationHeader.Title>
		);
	}

	_renderLeftComponent(props) {
		if (props.scene.navigationState.showBackButton) {
			return (
				<NavigationHeaderBackButton onNavigate={this.props.onNavigate.bind(this)} />
			);
		}

		return null;
	}

	_renderRightComponent(props) {
		return null;
	}
	// // // sample code -- not used
	// _renderRightComponent(props) {
	// 	if (props.scene.navigationState.key === 'sections') {
	// 		return (
	// 			<TouchableHighlight
	// 				style={styles.buttonContainer}
	// 				onPress={this._onAddItem.bind(this)}>
	// 				<Image
	// 					style={styles.button}
	// 					source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} />
	// 			</TouchableHighlight>
	// 		);
	// 	}
	//
	// 	return null;
	// }

	_renderScene(props) {
		const marginTop = Platform.OS === 'ios' ? NavigationHeader.HEIGHT : 0;

		if (props.scene.navigationState.key === 'sections') {
			return (
				<View style={[{marginTop: marginTop} , styles.container]}>
					<ScrollView style={styles.container} automaticallyAdjustContentInsets={true}>
						{StudySections.map((s) => {
							return (
								<Section data={s} onSelectItem={this._onSelectItem.bind(this)} key={s.key} />
							);
						}
						)}
					</ScrollView>
				</View>
			);
		}

		if (props.scene.navigationState.key === 'sectionDetails') {
			return (
				<View style={{ marginTop: marginTop }}>
					<SectionDetails onSelectActivity={this._onSelectActivity.bind(this)} data={props.scene.navigationState.data} />
				</View>
			);
		}

		if (props.scene.navigationState.key === 'mcActivity') {
			return (
				<View style={{ marginTop: marginTop }}>
					<MCActivity data={props.scene.navigationState.data} />
				</View>
			);
		}
	}

	// // sample code -- not used
	// _onAddItem() {
	// 	this.props.onNavigate({
	// 		type: 'push',
	// 		scope: 'global',
	// 		route: {
	// 			key: 'new',
	// 			title: 'Main Screen',
	// 			showBackButton: true
	// 		}
	// 	});
	// }

	_onSelectItem(data) {
		this.props.onNavigate({
			type: 'push',
			route: {
				key: 'sectionDetails',
				title: data.title,
				data: data,
				showBackButton: true
			}
		});
	}

	_onSelectActivity(data) {
		this.props.onNavigate({
			type: 'push',
			route: {
				key: 'mcActivity',
				title: data.title,
				data: data,
				showBackButton: true
			}
		});
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.get('studyNavigation')
	};
}

export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, stateProps, dispatchProps, {
		onNavigate: (action) => {
			dispatchProps.dispatch(Object.assign(action, {
				scope: action.scope || stateProps.navigation.key
			}));
		}
	});
})(StudyTab);

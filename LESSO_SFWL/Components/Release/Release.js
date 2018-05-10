import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';



type Props = {};
export default class Release extends Component<Props> {

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>我是第二个页面</Text>
			</View>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

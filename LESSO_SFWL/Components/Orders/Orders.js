import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';


import NavigationBar from '../../Public/NavBarCommon'
type Props = {};
export default class Orders extends Component<Props> {

	render() {
		return (
			<View style={{flex:1}}>
				<NavigationBar title={'订单中心'}/>
				<View style={styles.container}>
					<Text style={styles.welcome}>我是第三个页面</Text>
				</View>
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

import React, { Component } from 'react';
import {
	NavigatorIOS,
} from 'react-native';

import TabBar from '../Public/TabBar'


type Props = {};
export default class Main extends Component<Props> {

	constructor(props) {
		super(props);

	}


	render() {
		return (
			<NavigatorIOS
				style={{flex:1}}
				navigationBarHidden={true}
				initialRoute={
					{
						component:TabBar,
						title:'首页'
					}
				}
				renderScene={(route, navigator) => {
					let Component = route.component;
					return <Component {...route.params} navigator={navigator} />
				}}
			/>
		);
	}
}

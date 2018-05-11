import React, { Component } from 'react';
import {TabBarIOS} from 'react-native'
import Order from "../Components/Orders/Orders";
import Release from "../Components/Release/Release";
import Home from "../Components/Home/Home";

export default class TabBar extends Component<Props> {

	constructor(props) {
		super(props);

		this.state = ({
			selectedTabBarItem : 'Home',
		})

	}

	render() {
		return (
			<TabBarIOS style={{flex:1}} tintColor='orange'>
				<TabBarIOS.Item
					title='首页'
					systemIcon='bookmarks'
					selected={this.state.selectedTabBarItem === 'Home'}
					onPress={
						()=> {
							this.setState({
								selectedTabBarItem:'Home',
							})
						}
					}
				>
					<Home navigator={this.props.navigator}/>
				</TabBarIOS.Item>

				<TabBarIOS.Item
					title='发布'
					systemIcon='contacts'
					selected={this.state.selectedTabBarItem === 'Release'}
					onPress={()=>{
						this.setState({
							selectedTabBarItem:'Release',
						})
					}
					}
				>
					<Release navigator={this.props.navigator}/>
				</TabBarIOS.Item>


				<TabBarIOS.Item
					title='订单'
					systemIcon='featured'
					selected={this.state.selectedTabBarItem === 'Orders'}
					onPress={()=>{
						this.setState({
							selectedTabBarItem:'Orders',
						})
					}}
				>
					<Order navigator={this.props.navigator}/>
				</TabBarIOS.Item>

			</TabBarIOS>
		)

	}
}
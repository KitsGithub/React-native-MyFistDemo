import React, { Component } from 'react';
import {
	TabBarIOS,
	NavigatorIOS,
} from 'react-native';


import Home from '../Components/Home/Home'
import Order from '../Components/Orders/Orders'
import Release from '../Components/Release/Release'


type Props = {};
export default class Main extends Component<Props> {

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
					<NavigatorIOS
						style={{flex:1}}
						navigationBarHidden={true}
						initialRoute={
							{
								component:Home,
								title:'首页'
							}
						}
						renderScene={(route, navigator) => {
							let Component = route.component;
							return <Component {...route.params} navigator={navigator} />
						}}
					/>

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
					<NavigatorIOS
						style={{flex:1}}
						initialRoute={
							{
								component:Release,
								title:'发布',
							}
						}
					>
					</NavigatorIOS>
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
					<NavigatorIOS
						style={{flex:1}}
						initialRoute={{
							component:Order,
							title:'订单中心'
						}}
					>
					</NavigatorIOS>

				</TabBarIOS.Item>

			</TabBarIOS>
		);
	}
}

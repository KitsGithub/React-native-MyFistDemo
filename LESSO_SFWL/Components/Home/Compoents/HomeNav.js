import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
} from 'react-native'
export default class HomeNav extends Component {

	constructor(props) {
		super(props);

		this.state = ({
			selectedType: 0,
		})
	}

	render(){
		const {iconSelected} = this.props;
		return (
			<View style={styles.navView}>
				<TouchableOpacity activeOpacity={0.8}
													onPress={()=>iconSelected()}
													style={styles.userIcon}
				>
					<Image source={require('../../../SFIcon/Default_Head.png')} style={{width:30,height:30,borderRadius:15}} />
				</TouchableOpacity>
				<View style={styles.containerView}>
					<View style={{backgroundColor:'#3d3d3d',borderRadius:14,height:28,width:140,flexDirection:'row'}}>
						<View style={styles.selectedView}>
							<Text style={styles.selectedFont}>货源</Text>
						</View>
						<View style={styles.normalView}>
							<Text style={styles.normalFont}>车源</Text>
						</View>
					</View>
				</View>
				<Image source={require('../../../SFIcon/Home_Search.png')} style={styles.searchIcon}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	navView:{
		position:'absolute',
		top:0,
		width:global.SCREEN.width,
		height:64,
		zIndex:1,
		flexDirection:'row',
	},
	userIcon:{
		width:30,
		height:30,
		marginTop:27,
		marginLeft:12,
		marginRight:10,
	},
	searchIcon:{
		width:18,
		height:18,
		marginTop:33,
		marginRight:26,
		marginLeft:10
	},
	containerView:{
		flex:1,
		flexDirection:'row',
		marginTop:20,
		justifyContent:'center',
		alignItems:'center',
	},

	normalView:{
		flex:1,
		backgroundColor:'#3d3d3d',
		borderRadius:14,
		justifyContent:'center',
		alignItems:'center',
	},

	selectedView:{
		flex:1,
		backgroundColor:'#ffd74c',
		borderRadius:14,
		justifyContent:'center',
		alignItems:'center',
	},

	normalFont:{
		fontSize:14,
		color:'white'
	},
	selectedFont:{
		fontSize:14,
		color:'#3d3d3d',
	}
});
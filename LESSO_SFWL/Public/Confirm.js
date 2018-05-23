import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native'


let Dimension = require('Dimensions').get('window')
let SCREEN_WIDTH = Dimension.width;
let SCREEN_HEIGHT = Dimension.height;

export default class ConfirmLog extends Component {

	constructor(props) {
		super(props)
	}


	render(){
		const {title, detail,userSelected} = this.props;
		return(
				<View style={styles.container} onPress={()=>userSelected(0)}>
					<View style={styles.containerView}>
						<View style={styles.titleView}>
							<Text style={fontStyle.titleFont}>{title}</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={fontStyle.detailFont}
										numberOfLines={0}
										multiline={true}>{detail}</Text>
						</View>
						<View style={styles.bottomView}>
							<TouchableOpacity style={styles.cancelView} onPress={()=>userSelected(0)}>
								<Text style={fontStyle.cancelFont}>取消</Text>
							</TouchableOpacity>
							<Text style={styles.separateLine}/>
							<TouchableOpacity style={styles.confirmView} onPress={()=>userSelected(1)}>
								<Text style={fontStyle.confirmFont}>确定</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
		)
	}

}

const styles = StyleSheet.create({
	container:{
		position:'absolute',
		top:0,
		width:SCREEN_WIDTH,
		height:SCREEN_HEIGHT,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'rgba(0,0,0,0.3)'
	},
	containerView:{
		width:SCREEN_WIDTH - 90,
		height:141,
		backgroundColor:'hsla(255, 100%, 100%, 1)',
		borderRadius:12,
	},
	titleView:{
		width:SCREEN_WIDTH - 90,
		height:40,
		justifyContent:'center',
		alignItems:'center',
		marginTop:10,
	},
	detailView:{
		width:SCREEN_WIDTH - 90 - 60,
		justifyContent:'center',
		alignItems:'center',
		marginLeft:30,
	},
	bottomView:{
		position:'absolute',
		bottom:0,
		width:SCREEN_WIDTH - 90,
		height:44,
		borderTopWidth:0.5,
		borderTopColor:'#d7d7db',
		flexDirection:'row',
	},
	cancelView:{
		width: (SCREEN_WIDTH - 90 - 0.5) / 2,
		height:44,
		justifyContent:'center',
		alignItems:'center',
	},
	confirmView:{
		width: (SCREEN_WIDTH - 90 - 0.5) / 2,
		height:44,
		justifyContent:'center',
		alignItems:'center',
	},
	separateLine:{
		width:0.5,
		height:44,
		backgroundColor:'#d7d7db',
	}
});

const fontStyle = StyleSheet.create({
	titleFont : {
		fontSize:17,
		color:'black',
		fontWeight:'700',
	},
	detailFont :{
		fontSize:13,
		color:'black',
		textAlign:'center',
	},
	confirmFont :{
		fontSize:17,
		color:'#ff3b30',
	},
	cancelFont :{
		fontSize:17,
		color:'#007aff',
	}
})
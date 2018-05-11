import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,

} from 'react-native';

import '../../../Public/PublicResouce'

export default class HomeCell extends Component {

	constructor(props) {
		super(props);
	}


	render() {
		const {rowData} = this.props;
		return (
			<View style={cellStyle.cellContainerView}>
				<View style={cellStyle.addressContainer}>
					<View style={cellStyle.fromAddress}>
						<Text style={{fontSize:16,color:'#3d3d3d',fontWeight:'600'}}>{rowData.from_province + '-' + rowData.from_city + '-' + rowData.from_district}</Text>
					</View>
					<View style={cellStyle.toAddress}>
						<Text style={{fontSize:16,color:'#3d3d3d',fontWeight:'600'}}>{rowData.to_province + '-' + rowData.to_city + '-' + rowData.to_district}</Text>
					</View>
				</View>
				<View style={cellStyle.detailContainer}>
					<Image style={cellStyle.imageStyle} source={{uri: global.BaseSourceURL + rowData.head_src}}/>
					<View style={cellStyle.detailRight}>
						<View style={{flex:1,flexDirection:'row'}}>
							<Text style={cellStyle.goodsName}>{rowData.goods_name + ' '+ rowData.goods_weight + '吨 '}</Text>
							<Text style={cellStyle.textSeport}>|</Text>
							<Text style={cellStyle.goodsName}>{' ' + rowData.car_type + ' ' + rowData.car_long + ' '+ rowData.car_count + '辆'}</Text>
						</View>
						<View style={{flex:1,marginBottom:10,flexDirection:'row'}}>
							<Text style={cellStyle.identifier}>已认证</Text>
							<Text style={[cellStyle.userName,{fontSize:12, color:'#999999'}]} numberOfLines={0}>{rowData.name}</Text>
							<Text style={[cellStyle.userName,{fontSize:12, color:'#999999'}]}>{'发货: '+rowData.issueCount+'次'}</Text>
						</View>
					</View>
					<View style={cellStyle.getOrder}>
						<Text style={{fontSize:14, color:'#3d3d3d'}}>接单</Text>
					</View>
				</View>
				<View style={cellStyle.bottomContainer}></View>
			</View>
		)

	}



}

const cellStyle = StyleSheet.create({
	cellContainerView:{
		backgroundColor:'white',
		width:global.SCREEN.width,
		height:138,
	},

	addressContainer:{
		flex:1,
		width:global.SCREEN.width,
	},

	fromAddress:{
		marginTop:20,
		paddingLeft:27,
	},
	toAddress:{
		marginTop:8,
		paddingLeft:27,
	},


	detailContainer:{
		width:global.SCREEN.width,
		height:58,
		flexDirection:'row',
	},
	imageStyle:{
		width:38,
		height:38,
		backgroundColor:'yellow',
		marginTop:10,
		marginLeft:10,
		borderRadius:19,
	},
	detailRight:{
		flex:1,
		marginLeft:10,
	},
	goodsName:{
		paddingTop:10,
		fontSize:12,
		color:'#3d3d3d',
	},
	textSeport:{
		paddingTop:10,
		fontSize:12,
		color:'#dadada',
	},
	identifier:{
		width:36,
		height:14,
		marginTop:10,

		color:'#3d3d3d',
		backgroundColor:'#ffd74c',
		textAlign:'center',
		borderRadius:2,
		fontSize:10,
		lineHeight:14,
	},
	userName:{
		height:12,
		marginTop:11,
		marginLeft:5,
	},

	getOrder:{
		backgroundColor:'#ffd74c',
		width:56,
		height:24,
		position: 'absolute',
		right:10,
		bottom:10,
		justifyContent:'center',
		alignItems:'center',
		borderRadius:2,
	},


	bottomContainer:{
		width:global.SCREEN.width,
		height:10,
		backgroundColor: '#f2f2f2',
	}

});

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity
} from 'react-native'

import '../../../Public/PublicResouce'

export default class goodsDetailView extends Component {

	constructor(props) {
		super(props);

	}


	getOrder(guid,carType) {
		this.props.getGoodsPress(guid,carType)
	}

	render() {
		const { goodsDetail} = this.props;
		return (
			<View style={{flex:1}}>
				<ScrollView style={styles.container}>
					<View style={styles.addressAndUser}>
						<View style={styles.addressStyle}>
							<Text style={styles.addressText}>{goodsDetail.from_province + '-' + goodsDetail.from_city + '-' + goodsDetail.from_district}</Text>
							<Text style={styles.detailAddressText}>{goodsDetail.from_address}</Text>
						</View>
						<View style={[styles.addressStyle,{marginTop:20}]}>
							<Text style={styles.addressText}>{goodsDetail.to_province + '-' + goodsDetail.to_city + '-' + goodsDetail.to_district}</Text>
							<Text style={styles.detailAddressText}>{goodsDetail.to_address}</Text>
						</View>
						<View style={styles.userMessage}>
							<Image style={styles.imageStyle} source={{uri: global.BaseSourceURL + goodsDetail.head_src}}/>
							<View style={styles.messageView}>
								<Text style={styles.normalText}>{goodsDetail.name}</Text>
								<Text style={styles.phoneText}>{goodsDetail.mobile}</Text>
							</View>
						</View>
						<Text style={styles.separateLineStyle}/>
					</View>
					<View style={styles.goodDetail}>
						<View style={styles.subTitleView}>
							<Text style={styles.subTitleText}>货物详情</Text>
						</View>
						<View style={styles.subMessageView}>
							<Text style={styles.subMessageText}>{goodsDetail.goods_name + ' '+ goodsDetail.goods_weight + '吨 '}</Text>
						</View>
						<Text style={styles.separateLineStyle}/>
					</View>
					<View style={styles.goodDetail}>
						<View style={styles.subTitleView}>
							<Text style={styles.subTitleText}>车辆需求</Text>
						</View>
						<View style={styles.subMessageView}>
							<Text style={styles.subMessageText}>{goodsDetail.car_type + ' ' + goodsDetail.car_long + ' '+ goodsDetail.car_count + '辆'}</Text>
						</View>
						<Text style={styles.separateLineStyle}/>
					</View>
					<View style={styles.goodDetail}>
						<View style={styles.subTitleView}>
							<Text style={styles.subTitleText}>意向价格</Text>
						</View>
						<View style={styles.subMessageView}>
							<Text style={styles.subMessageText}>{goodsDetail.price + ' 元/车'}</Text>
						</View>
						<Text style={styles.separateLineStyle}/>
					</View>
					<View style={styles.goodDetail}>
						<View style={styles.subTitleView}>
							<Text style={styles.subTitleText}>收货人信息</Text>
						</View>
						<View style={styles.subMessageView}>
							<Text style={styles.subMessageText}>{goodsDetail.delivery_by + ' ' +goodsDetail.delivery_mobile}</Text>
						</View>
						<Text style={styles.separateLineStyle}/>
					</View>
					<View style={styles.goodDetail}>
						<View style={styles.subTitleView}>
							<Text style={styles.subTitleText}>备注</Text>
						</View>
						<View style={styles.subMessageView}>
							<Text style={styles.subMessageText}>{goodsDetail.car_remark}</Text>
						</View>
					</View>
					<View style={{width:global.SCREEN.width,height:49}}></View>
				</ScrollView>
				<TouchableOpacity style={styles.getOrderView}
													onPress={()=>this.getOrder(goodsDetail.guid,goodsDetail.car_type)}
													activeOpacity={1}
				>
					<Text style={styles.getOrderText}>接单</Text>
				</TouchableOpacity>
			</View>
		)
	}
}



const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'white',
	},
	addressAndUser:{
		width:global.SCREEN.width,
		height:208,
	},

	addressStyle:{
		marginLeft:37,
		marginTop:30,
		width:global.SCREEN.width - 37,
	},

	addressText:{
		fontSize:18,
		fontWeight:'800',
	},
	detailAddressText:{
		paddingTop:5,
		fontSize:14,
		color:'#999',
	},

	userMessage:{
		flex:1,
		flexDirection:'row',
	},
	imageStyle:{
		width:38,
		height:38,
		backgroundColor:'yellow',
		marginTop:20,
		marginLeft:20,
		borderRadius:19,
	},
	messageView:{
		flex:1,
		marginTop:20,
		marginLeft:10,
	},
	normalText:{
		fontSize:16,
		color:'#3d3d3d',
	},
	phoneText:{
		marginTop:6,
		fontSize:16,
		color:'#4c90ff',
	},

	separateLineStyle:{
		width:global.SCREEN.width - 40,
		height:1,
		backgroundColor:'#eeeeee',
		position:'absolute',
		bottom:1,
		left:20,
	},


	goodDetail:{
		width:global.SCREEN.width,
		height:100,
	},
	subTitleView:{
		marginLeft:20,
		marginTop:20,
	},

	subTitleText:{
		fontSize:16,
		color:'#3d3d3d',
		fontWeight:'700',
	},

	subMessageView:{
		marginLeft:20,
		marginTop:18,
	},
	subMessageText:{
		color:'#666666',
		fontSize:16,
	},
	redStyleTexe:{
		color:'#e65c5c',
		fontSize:16,
	},

	getOrderView:{
		backgroundColor:'#ffd74c',
		position:'absolute',
		bottom:0,
		width:global.SCREEN.width,
		height:50,
		justifyContent:'center',
		alignItems:'center',
	},

	getOrderText:{
		color:'#3d3d3d',
		fontSize:18,
		fontWeight:'500',
	}

});
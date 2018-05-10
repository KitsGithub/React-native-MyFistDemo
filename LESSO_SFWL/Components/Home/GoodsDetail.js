import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';

import Networking from '../../Public/Networking'
var goodsDetailURL = 'Goods/GetGoodsDetails';

export default class GoodsDetail extends Component {

	constructor(props){
		super(props);

		this.state = ({
			guid: null,
		})
	}


	componentDidMount() {
		console.log(this.props.guid);
		this.setState({
			guid : this.props.guid,
		});

		//请求详情数据
		this.getDetailData()
	}


	render() {
		return (
			<View style={style.container}>
				<Text>{this.props.guid}</Text>
			</View>
		)
	}


	getDetailData() {
		Networking.POST(goodsDetailURL,JSON.stringify({
			Guid:this.props.guid,
		}),(response)=>{


		})
	}

}

const style = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'yellow',
	}
});
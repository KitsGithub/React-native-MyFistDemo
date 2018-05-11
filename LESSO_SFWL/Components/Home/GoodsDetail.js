import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';



import Networking from '../../Public/Networking'
var goodsDetailURL = 'Goods/GetGoodsDetails';


import NavigationBar from '../../Public/NavBarCommon'
import GoodsDetailView from './Compoents/goodsDetailView'

export default class GoodsDetail extends Component {

	constructor(props){
		super(props);

		this.state = ({
			guid: null,
			goodsDetail:null,
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


	backAction(){
		this.props.navigator.pop()
	}

	getGoodsPress(guid) {
		alert('接单' + guid)

	}


	render() {
		if (this.state.goodsDetail) {
			return (
				<View style={{flex:1}}>
					<NavigationBar title={'货源详情'}
												 leftImage={require('../../SFIcon/Nav_Back.png')}
												 leftAction={()=>this.backAction()}
					/>
					<GoodsDetailView goodsDetail={this.state.goodsDetail} getGoodsPress={(guid)=>this.getGoodsPress(guid)}/>
				</View>
			)
		}
		else  {
			return (
				<View style={style.container}>
					<Text>{this.props.guid}</Text>
				</View>
			)
		}
	}


	getDetailData() {
		Networking.POST(goodsDetailURL,JSON.stringify({
			Guid:this.props.guid,
		}),(response)=>{

			if (response.Code === 0) {

				this.setState({
					goodsDetail:response.Data,
				})
			}

		})
	}

}

const style = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'white',
	}
});
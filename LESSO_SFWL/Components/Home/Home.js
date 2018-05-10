import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ListView,
	TouchableOpacity,
} from 'react-native';

//添加公共库文件
import '../../Public/PublicResouce'
import Networking from '../../Public/Networking'
import GoodsDetail from './GoodsDetail'

//添加banner组件
import BannerView from './Compoents/Banner'
//添加homeCell组件
import HomeCell from './Compoents/HomeCell'


//请求货源路径
var GoosListURL = 'goods/GetRealTimeGoodsPage'

type Props = {};
export default class Home extends Component<Props> {

	constructor(props) {
		super(props);

		this.state = ({
			dataSource: null,
		})
	}

	componentDidMount() {
		this.requireDataSource()
	}

	render() {
		if (this.state.dataSource) {
			return (
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData)=>this.renderRowView(rowData)}
					renderHeader={()=> {return <BannerView/>}}
					renderFooter={()=> {return(<View style={{height:49,width:global.SCREEN.width}}></View>)}}
				/>
			);
		} else  {
			return <View style={styles.container}></View>
		}
	}


	//返回cell样式
	renderRowView (rowData) {
		return (
			<TouchableOpacity onPress={()=>{
				this.props.navigator.push({
					component:GoodsDetail,
					title:'货源详情',
					passProps:{
						guid: rowData.guid,
					}
				})
			}}>
				{HomeCell.goodsCell(rowData)}
			</TouchableOpacity>
		)
	}


	//网络请求
	requireDataSource () {
		Networking.POST(GoosListURL,JSON.stringify({
			PageIndex: 1,
			PageSize: 10,
		}),(response) => {
			if (!response.Code) {
				let ds = new ListView.DataSource({
					rowHasChanged:(r1,r2) => r1 !== r2,
				});
				this.setState({
					dataSource : ds.cloneWithRows(response.Data),
				})
			}
		})
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
});

import React, { Component } from 'react';
import {
	StyleSheet,
	ListView,
	View,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native'

//添加公共库文件
import '../../Public/PublicResouce'
import NavigationBar from '../../Public/NavBarCommon'
import Networking from '../../Public/Networking'

var getIdentifyCarLisrURL = '/Cars/GetCarNoList';



export default class selectedCar extends Component<Props> {

	constructor(props) {
		super(props);

		this.state = ({
			dataList : [],
			dataSource : new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}).cloneWithRows([]),
		})
	}

	_selectedIconPress(rowID){
		let dataList = this.state.dataList;
		let item = dataList[rowID];
		item.isSelected = !item.isSelected;

		this.setState({
			dataList:dataList,
			dataSource : new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}).cloneWithRows(dataList)
		})
	}

	_renderRow(rowData,rowID){
		const isSelected = rowData.isSelected;
		return(
			<View style={{width:global.SCREEN.width,height:100}}>
				<View style={cellStyle.topViewContainer}>
					<Image source={require('../../SFIcon/SFCarList_CarTips.png')} style={cellStyle.tipsImage}/>
					<Text style={cellStyle.carNumFont}>{rowData.car_no}</Text>
				</View>
				<View style={cellStyle.bottomContainer}>
					<Text style={cellStyle.carDetailFont}>{rowData.car_type + ' ' + rowData.car_long + ' ' + rowData.dead_weight + '吨'}</Text>
				</View>
				<TouchableOpacity style={cellStyle.tickIcon} onPress={()=>this._selectedIconPress(rowID)}>
					{
						isSelected ?
							<Image source={require('../../SFIcon/Confirm_Selected.png')} style={{width:20,height:20}}/>
							:
							<Image source={require('../../SFIcon/Confirm_Normal.png')} style={{width:20,height:20}}/>
					}
				</TouchableOpacity>
				<Text style={{width:global.SCREEN.width - 40,height:1,position:'absolute',bottom:0,backgroundColor:'#eeeeee',marginLeft:20}}/>
			</View>
		)
	}

	_getIdentifyCarList(){
		const {carType} = this.props;
		Networking.POST(getIdentifyCarLisrURL,JSON.stringify({
			carType: carType,
			UserId:'88383c70-f27b-43cc-98a5-d073a67de554',
		}),(response)=> {
			if (response.Code === 0) {

				for (let i = 0;i<response.Data.length;i ++) {
					let data = response.Data[i];
					data.isSelected = false;
				}

				this.setState({
					dataList : response.Data,
					dataSource : new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}).cloneWithRows(response.Data)
				})
			}

		});
	}

	_commitSelectedCar(){

		const {navigator} = this.props;
		let selectedList = [];

		for (let i = 0;i<this.state.dataList.length;i++) {
			let item = this.state.dataList[i];
			if (item.isSelected) {
				selectedList.push(item);
			}
		}

		this.props.newCarList(selectedList)

		if (navigator) {
			this.props.navigator.pop()
		}

	}



	componentDidMount() {
		this._getIdentifyCarList();
	}

	render(){
		return (
			<View style={styles.container}>
				<NavigationBar title={'选择车辆'}
											 leftImage={require('../../SFIcon/Nav_Back.png')}
											 leftAction={()=>{this.props.navigator.pop()}}
											 rightTitle={'确定'}
											 rightAction={()=>this._commitSelectedCar()}
				/>
				<ListView dataSource={this.state.dataSource}
									automaticallyAdjustContentInsets={false}
									enableEmptySections={true}
									renderRow={(rowData,sectionID,rowID)=>this._renderRow(rowData,rowID)}
				/>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container:{
		flex:1,
	},

});

const cellStyle = StyleSheet.create({
	topViewContainer:{
		width:global.SCREEN.width,
		height:36,
		flexDirection:'row',
	},
	tipsImage:{
		width:20,
		height:16,
		marginLeft:20,
		marginTop:20,
	},
	carNumFont:{
		color:'#3d3d3d',
		fontSize:16,
		marginLeft:10,
		marginTop:20,
	},
	bottomContainer:{
		width:global.SCREEN.width,
		height:46,
	},
	carDetailFont:{
		color:'#3d3d3d',
		fontSize:16,
		marginLeft:20,
		marginTop:18,
	},
	tickIcon:{
		width:20,
		height:20,
		position:'absolute',
		right:20,
		top:40,
	}
});
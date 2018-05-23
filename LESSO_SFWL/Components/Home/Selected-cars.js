import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ListView,
	Image,
	Text,
	TouchableOpacity,
	TextInput,
} from 'react-native';


//公共库文件
import NavigationBar from '../../Public/NavBarCommon'
import '../../Public/PublicResouce'

import selectedCarList from './car-list'
import Networking from "../../Public/Networking";
import ConfirmLog from '../../Public/Confirm'


var comfireCarList = 'GoodsOrder/AddGoodsOrder';


export default class selectedCars  extends Component {
	constructor(props) {
		super(props);

		this.state = ({
			dataList: [],
			dataSource : new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2}).cloneWithRows([]),
			currentData: '',
			currentTime: '',
			orderRemark: '',

			//弹框
			needToConfirm : false,
			confirmTitle:'',
			confirmDetail:''
		})
	}

	/*用户操作*/

	//删除某个选择车辆
	deleteSelectedCell(rowData,index) {

		let dataList = this.state.dataList.splice();
		let newList  = dataList.slice(index,1);

		this.setState({
			dataList: newList,
			dataSource : new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2}).cloneWithRows(newList),
		})
	}


	/*确认分配车辆*/
	_confirmSelectedCars() {

		if (!this.state.dataList.length) {
			alert('请选择车辆');
			return;
		}

		this.setState({
			needToConfirm : true,
			confirmTitle:'是否确认接单',
			confirmDetail:'请仔细检查您的发车时间，一旦接单将无法修改'
		})
		// if (value) {
		// }
	}


	//弹框确认回调
	_confirmLogSelected(index) {
		this.setState({
			needToConfirm : false,
		});
		if (index === 1) {
			const {guid} = this.props;
			let date = this._getCurrentData();
			let time = this._getCurrentTime();

			let tempArr = date.split('.');
			date = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2] + ' ' + time;

			Networking.POST(comfireCarList,JSON.stringify({
				UserId:'88383c70-f27b-43cc-98a5-d073a67de554',
				Time:date,
				OrderId:guid,
				OrderRemark:this.state.orderRemark,
				Cars:JSON.stringify(this.state.dataList),
			}),(response)=>{
				console.log('确认分配');
				this.props.navigator.popToTop()
			})
		}
	}


	selectedNewCars() {
		const {carType} = this.props;
		this.props.navigator.push({
			component:selectedCarList,
			title:'选择车辆',
			passProps:{
				selectedCarList : this.state.selectedCarList,
				carType: carType,
				newCarList:(newCarList)=>{
					this.setState({
						dataList: newCarList,
						dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}).cloneWithRows(newCarList),
					})
				}
			},
		})
	}



	/*私有方法*/
	//获取日期
	_getCurrentData(){
		let systemDate = new Date();

		// 获取当年
		let year = systemDate.getFullYear();

		// 获取当月 （月+1是因为js中月份是按0开始的）
		let month = systemDate.getMonth() + 1;

		// 获取当日
		let day =  systemDate.getDate();

		if (day < 10) { // 如果日小于10，前面拼接0

			day = '0' + day;
		}

		if (month < 10) { // 如果月小于10，前面拼接0

			month = '0' + month;
		}

		return year + '.' + month + '.' + day;
	}

	//获取时间
	_getCurrentTime(){
		let systemDate = new Date();

		let my_hours = systemDate.getHours();
		let my_minutes = systemDate.getMinutes();

		if (my_minutes < 10) {
			my_minutes = '0' + my_minutes;
		}

		return my_hours + ':' + my_minutes;
	}






	componentDidMount() {
		let currentData = this._getCurrentData();
		let currentTime = this._getCurrentTime();

		this.setState({
			currentData: currentData,
			currentTime: currentTime,
		});
	}




	_listHeader() {
		return (
			<TouchableOpacity activeOpacity={1}
												onPress={()=>this.selectedNewCars()}
			>
				<View style={headerStyle.container}>
					<View style={headerStyle.titleStyle}>
						<Text style={headerStyle.titleFont}>选择车辆</Text>
					</View>
					<View style={headerStyle.arrowView}>
						<Image style={headerStyle.arrowStyle} source={require('../../SFIcon/PersonalCenter_arrow.png')}/>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

	_listFooter() {
		return (
			<View style={footerStyle.footerConainer}>
				<View style={footerStyle.calendarContainer}>
					<Image style={footerStyle.calendar} source={require('../../SFIcon/Calendar_Image.png')}/>
					<View style={footerStyle.tipsView}>
						<Text style={footerStyle.tipsFont}>发车时间</Text>
					</View>
					<View style={footerStyle.currentContainer}>
						<Text style={footerStyle.currentTimeFont}>{this.state.currentTime}</Text>
					</View>
					<View style={footerStyle.currentDataContainer}>
						<Text style={footerStyle.currentDataFont}>{this.state.currentData}</Text>
					</View>
				</View>
				<View style={footerStyle.inputViewContainer}>
					<TextInput style={footerStyle.inputView}
										 placeholder='填写备注'
										 placeholderTextColor={'#999999'}
										 numberOfLines={0}
										 multiline={true}
										 onChangeText={(text)=>{this.setState({orderRemark:text})}}
					/>
				</View>
			</View>
		)
	}



	_renderRowView(rowData,index) {
		return (
			<View style={styles.cellContainer}>
				<View style={styles.cellView}>
					<TouchableOpacity
						style={{width:12,height:12,position:'absolute',right:20,
							top:20,zIndex:100,}}
						onPress={()=>this.deleteSelectedCell(rowData,index)}
					>
						<Image source={require('../../SFIcon/Nav_Close_Dark.png')} style={{width:12,height:12}}/>
					</TouchableOpacity>
					<View style={styles.carNumView}>
						<Image source={require('../../SFIcon/SFCarList_CarTips.png')} style={styles.cellTipsImage}/>
						<Text style={styles.carNumText}>{rowData.car_no}</Text>
					</View>
					<View style={styles.carTypeView}>
						<Text style={styles.carTypeText}>{rowData.car_type + ' ' + rowData.car_long + ' ' + rowData.dead_weight + '吨'}</Text>
					</View>
					<View style={styles.inputViewStyle}>
						<TextInput placeholder='填写报价'
											 placeholderTextColor={'#999999'}
											 style={styles.inputStyle}
											 keyboardType={'numbers-and-punctuation'}
						/>
						<Text style={{fontSize:16,fontWeight:'500',marginRight:10}}>￥</Text>
					</View>
				</View>
			</View>
		)
	}

	render() {
		return(
			<View style={styles.container}>
				<NavigationBar title={'选择接单车辆'}
											 leftImage={require('../../SFIcon/Nav_Back.png')}
											 leftAction={()=>{this.props.navigator.pop()}}
				/>
				<ListView
					style={{width:global.SCREEN.width,height:global.SCREEN.height-64}}
					automaticallyAdjustContentInsets={false}
					enableEmptySections={true}
					dataSource={this.state.dataSource}
					renderHeader={()=>this._listHeader()}
					renderRow={(rowData,sectionID,rowID)=>this._renderRowView(rowData,rowID)}
					renderFooter={()=>this._listFooter()}
				/>

				<TouchableOpacity onPress={()=>this._confirmSelectedCars()}
													activeOpacity={0.8}
				>
					<View style={styles.bottomView}>
						<Text style={{fontSize:18,color:'#3d3d3d',fontWeight:'500',}}>确定</Text>
					</View>
				</TouchableOpacity>

				{this.state.needToConfirm ? <ConfirmLog title={this.state.confirmTitle}
																		 detail={this.state.confirmDetail}
																		 userSelected={(index)=>this._confirmLogSelected(index)}
				/> : null}
			</View>
		)
	}
}


const headerStyle = StyleSheet.create({
	container:{
		width:global.SCREEN.width,
		height:76,
		flexDirection:'row',
		alignItems:'center',
	},
	titleStyle:{
		paddingLeft:20,
	},
	titleFont:{
		color:'#666',
		fontSize:18,
	},
	arrowView:{
		width:8,
		height:16,
		position:'absolute',
		right:20,
	},
	arrowStyle:{
		width:8,
		height:16,
	}
});

const footerStyle = StyleSheet.create({
	footerConainer:{
		width:global.SCREEN.width,
		height:140,
		flexDirection:'row',
	},
	calendarContainer:{
		width:100,
		height:100,
		marginLeft:20,
		marginTop:10,
	},
	calendar:{
		width:100,
		height:100,
		position:'absolute',
		left:0,
		top:0,
	},
	tipsView:{
		width:100,
		height:32,
	},
	tipsFont:{
		color:'#ffffff',
		fontSize:14,
		marginLeft:8,
		marginTop:9,
	},
	currentContainer:{
		width:100,
		height:36,
	},
	currentTimeFont:{
		color:'#ffffff',
		fontSize:28,
		marginLeft:8,
		marginTop:8,
	},
	currentDataContainer:{
		width:100,
		height:32,
	},
	currentDataFont:{
		color:'#ffffff',
		marginLeft:8,
		marginTop:10,
		fontSize:14,
	},

	inputViewContainer:{
		width:global.SCREEN.width - 100 - 50,
		height:100,
		backgroundColor:'#f1f1f3',
		borderRadius:10,
		marginLeft:10,
		marginTop:10,
	},
	inputView:{
		width:global.SCREEN.width - 100 - 70,
		height:68,
		marginLeft:10,
		marginTop:16,
		fontSize:18,
	}
});


const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	cellContainer:{
		width:global.SCREEN.width,
		height:171,
	},
	cellView:{
		width:global.SCREEN.width - 40,
		height:161,
		borderWidth:1,
		borderColor:'#eeeeee',
		borderLeftWidth:2,
		borderLeftColor:'#ffd74c',
		marginLeft:20,
	},

	carNumView:{
		alignItems:'center',
		flexDirection:'row',
		height:21 + 18 + 16,
		width:global.SCREEN.width - 40,
	},
	cellTipsImage:{
		width:20,
		height:16,
		marginLeft:20,
		marginRight:10,
	},
	carNumText:{
		color:'#3d3d3d',
		fontSize:16,
	},

	carTypeView:{
		flexDirection:'row',
		alignItems:'center',
		marginLeft:20,
	},
	carTypeText:{
		color:'#3d3d3d',
		fontSize:16,
	},
	inputViewStyle:{
		width:global.SCREEN.width - 80,
		height:50,
		borderRadius:10,
		backgroundColor:'#f3f3f3',
		marginLeft:20,
		marginTop:20,
		flexDirection:'row',
		alignItems:'center',
	},
	inputStyle:{
		flex:1,
		height:50,
		marginLeft:10,
		marginRight:10,
		fontSize:16,
	},

	bottomView:{
		backgroundColor:'#ffd74c',
		position:'absolute',
		bottom:0,
		width:global.SCREEN.width,
		height:50,
		justifyContent:'center',
		alignItems:'center',

	}
})
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ListView,
	TouchableOpacity,
	Image,
	TextInput,
	RefreshControl
} from 'react-native';

import '../../../Public/PublicResouce'


export default class selectedCarsView  extends Component {


	constructor(props) {
		super(props);

		const {selectedCarList} = this.props;

		console.log('选择的值' + JSON.stringify(selectedCarList))

		let ds = new ListView.DataSource({
			rowHasChanged:(r1,r2) => r1 !== r2,
		});


		this.state = ({
			dataSource : ds.cloneWithRows(selectedCarList),
			currentData: '',
			currentTime: '',
		})
	}

	/*公开方法*/
	selectedCarList() {
		const {selectedNewCarFun} = this.props;
		selectedNewCarFun()
	}

	deleteSelectedCell(rowData,index) {
		alert('点击了关闭啊' + rowData + index)

	}

	/*私有方法*/
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



	listHeader() {
		return (
			<TouchableOpacity activeOpacity={1}
												onPress={()=>this.selectedCarList()}
			>
				<View style={headerStyle.container}>
					<View style={headerStyle.titleStyle}>
						<Text style={headerStyle.titleFont}>选择车辆</Text>
					</View>
					<View style={headerStyle.arrowView}>
						<Image style={headerStyle.arrowStyle} source={require('../../../SFIcon/PersonalCenter_arrow.png')}/>
					</View>

				</View>
			</TouchableOpacity>
		)
	}

	listFooter() {
		return (
			<View style={footerStyle.footerConainer}>
				<View style={footerStyle.calendarContainer}>
					<Image style={footerStyle.calendar} source={require('../../../SFIcon/Calendar_Image.png')}/>
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
					/>
				</View>
			</View>
		)
	}



	renderRowView(rowData,index) {
		return (
			<View style={styles.cellContainer}>
				<View style={styles.cellView}>
					<TouchableOpacity
						style={{width:12,height:12,position:'absolute',right:20,
							top:20,zIndex:100,}}
						onPress={()=>this.deleteSelectedCell(rowData,index)}
					>
						<Image source={require('../../../SFIcon/Nav_Close_Dark.png')} style={{width:12,height:12}}/>
					</TouchableOpacity>
					<View style={styles.carNumView}>
						<Image source={require('../../../SFIcon/SFCarList_CarTips.png')} style={styles.cellTipsImage}/>
						<Text style={styles.carNumText}>粤B 12345</Text>
					</View>
					<View style={styles.carTypeView}>
						<Text style={styles.carTypeText}>集装车  6.8米  1吨  1方</Text>
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
		if (this.state.dataSource) {
			return (
				<View>
					<ListView
						style={{width:global.SCREEN.width,height:global.SCREEN.height-64}}
						automaticallyAdjustContentInsets={false}
						enableEmptySections={true}
						dataSource={this.state.dataSource}
						renderHeader={()=>this.listHeader()}
						renderRow={(rowData,sectionID,rowID)=>this.renderRowView(rowData,rowID)}
						renderFooter={()=>this.listFooter()}
					/>

				</View>

			)
		} else {
			return (
				<View style={{flex:1}}></View>
			)
		}
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
		backgroundColor:'red',
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
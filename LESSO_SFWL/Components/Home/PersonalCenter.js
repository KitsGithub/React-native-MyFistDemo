import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
	ListView,
} from 'react-native'


//添加公共库文件
import '../../Public/PublicResouce'
import Networking from '../../Public/Networking'
import NavigationBar from '../../Public/NavBarCommon'


export default class PersonalCenter extends Component {

	constructor(props) {
		super(props)

		let dataSource = [{
			title:'我的物源',
			subTitle:'',
			compoents:''
		},{
			title:'资金账户',
			subTitle:'',
			compoents:''
		},{
			title:'我的司机',
			subTitle:'',
			compoents:''
		},{
			title:'我的车辆',
			subTitle:'',
			compoents:''
		},{
			title:'信誉认证',
			subTitle:'认证成功',
			compoents:''
		},{
			title:'我的保单',
			subTitle:'',
			compoents:''
		},{
			title:'个人资料',
			subTitle:'',
			compoents:''
		},{
			title:'合同查询',
			subTitle:'',
			compoents:''
		},{
			title:'退出登录',
			subTitle:'',
			compoents:''
		}];


		this.state = ({
			dataSource : new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}).cloneWithRows(dataSource),

		})
	}


	backAction(){
		this.props.navigator.pop()
	}


	_renderRowView(rowData) {
		return (
			<TouchableOpacity activeOpacity={1} onPress={()=>this.backAction()}>
				<View style={cellView.containerView}>
					<View style={cellView.bottomLine}/>
					<View style={cellView.titleContainer}>
						<Text style={cellView.titleFont}>{rowData.title}</Text>
					</View>
					{rowData.subTitle === '' ?
						<Image source={require('../../SFIcon/Arrow_right.png')} style={cellView.arrowImage}/>
						:
						<Text style={cellView.subTitleView}>{rowData.subTitle}</Text>
					}
				</View>

			</TouchableOpacity>
		)
	}

	_renderHeaderView() {
		let isIdentity = true;
		return (
			<View style={{width:global.SCREEN.width,height:305}}>
				<View style={{width:global.SCREEN.width,height:125,backgroundColor:'white',position:'absolute',bottom:0}}/>
				<View style={headerStyle.containerView}>
					<View style={headerStyle.topView}>
						<View style={headerStyle.userImageContainer}>
							<Image source={require('../../SFIcon/Default_Head.png')} style={{width:74,height:74,borderRadius:37}}/>
						</View>
						<View style={headerStyle.userMessageContainer}>
							<Text style={headerStyle.userName}>哈哈哈哈哈</Text>
							<View style={{flexDirection:'row'}}>
								<Image source={require('../../SFIcon/Driver_Phone.png')} style={{width:14,height:18,marginRight:10}}/>
								<Text style={{fontSize:16,color:'#3d3d3d'}}>14726282139</Text>
							</View>

							<Text style={headerStyle.userPhone}>接单数：123</Text>
						</View>
					</View>
					<View style={headerStyle.bottomView}>
						<Image source={require('../../SFIcon/Personal_IDCard_Selected.png')} style={headerStyle.userIdentityImage}/>
						<Image source={require('../../SFIcon/Personal_BusinessLicense_Selected.png')} style={headerStyle.userIdentityImage}/>
						<Image source={require('../../SFIcon/Personal_Mentou_Selected.png')} style={headerStyle.userIdentityImage}/>
					</View>
					{
						isIdentity ?
							<Image source={require('../../SFIcon/Identity.png')} style={headerStyle.identityImage}/>
							:
							null
					}
				</View>
			</View>
		)
	}


	render() {
		return (
			<View style={styles.container}>
				<Image source={require('../../SFIcon/PersonalCenter_BJ.png')}
							 style={{width:global.SCREEN.width, height:global.SCREEN.height,position:'absolute',top:0}}/>
				<View style={{width:global.SCREEN.width,height:64,position:'absolute',top:0,zIndex:1}}>

				</View>
				<ListView
					automaticallyAdjustContentInsets={false}
					dataSource={this.state.dataSource}
					renderRow={(rowData)=>this._renderRowView(rowData)}
					renderHeader={()=>this._renderHeaderView()}
				/>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container:{
		flex:1,
	}
});

const headerStyle = StyleSheet.create({
	containerView:{
		backgroundColor:'white',
		width:global.SCREEN.width - 40,
		height:191,
		borderRadius:10,
		position:'absolute',
		bottom:30,
		marginLeft:20,
		shadowOffset:{width:0,height:0},
		shadowColor:'black',
		shadowOpacity:0.1,
		shadowRadius:10,
	},
	topView:{
		width:global.SCREEN.width - 40,
		height:107,
		flexDirection:'row',
	},
	userImageContainer:{
		width:74,
		height:74,
		marginLeft:23,
		marginTop:32
	},
	userMessageContainer:{
		flex:1,
		marginLeft:24,
		marginTop:32,
	},
	userName:{
		fontSize:16,
		color:'#3d3d3d',
		fontWeight:'600',
		marginBottom:11,
	},
	userPhone:{
		fontSize:16,
		color:'#3d3d3d',
		fontWeight:'800',
		marginTop:11,
	},

	bottomView:{
		flex:1,
		width:global.SCREEN.width - 120,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		marginLeft:40,
	},
	identityImage:{
		width:50,
		height:50,
		position:'absolute',
		top:0,
		right:0,
	},
	userIdentityImage:{
		width:34,
		height:26,
	}
})

const cellView = StyleSheet.create({
	containerView :{
		width:global.SCREEN.width,
		height:77,
		flexDirection:'row',
		backgroundColor:'white',
	},
	titleContainer:{
		marginTop:30,
		marginLeft:20,
	},
	arrowImage:{
		width:8,
		height:16,
		position:'absolute',
		right:20,
		top:30,
	},
	bottomLine: {
		width: global.SCREEN.width - 40,
		marginLeft: 20,
		height: 1,
		backgroundColor: '#eeeeee',
		position:'absolute',
		top:0,
	},
	subTitleView:{
		flex:1,
		marginRight:20,
		textAlign:'right',
		fontSize:15,
		color:'#3d3d3d',
		marginTop:30,
	},
	titleFont:{
		fontSize:16,
		color:'#3d3d3d',
	}
})
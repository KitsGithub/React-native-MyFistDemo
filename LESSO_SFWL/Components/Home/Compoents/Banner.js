import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TouchableOpacity,
} from 'react-native';

import '../../../Public/PublicResouce'
import NavBar from '../../../Public/NavBarCommon'

var ScreenWidth = require('Dimensions').get('window').width;
var BannerHeight = 171;

export default class Banner extends Component {

	constructor(props) {
		super(props);
		this.state = ({
			currentPage: 0,
		})
	}

	static defaultProps = {
		time: 2000
	};

	componentDidMount() {
		this._startTimer();
	}

	//开始拖拽的时候
	_onAnimationBeginDrag(e) {
		// console.log('开始拖拽');
		//开始拖拽的时候停止拖拽
		this.timer && clearTimeout(this.timer);
	}

	//结束拖拽
	_onAnimationEndDrag(e){
		//唤醒定时器
		this._startTimer();
	}

	// 停止拖拽时调用
	_onAnimationEnd(e) {
		let offsetX = e.nativeEvent.contentOffset.x;
		let index = Math.floor(offsetX / ScreenWidth);
		this.setState({
			currentPage : index
		});
	}

	//开启定时器
	_startTimer(){

		let scrollView = this.refs.scrollView;

		let maxCount = 2;

		this.timer = setInterval(()=>{
			let currentIndex = 0;
			if ((this.state.currentPage + 1 ) >= maxCount) {
				currentIndex = 0;
			} else {
				currentIndex = this.state.currentPage + 1;
			}

			this.setState({
				currentPage: currentIndex
			});

			let offsetX = currentIndex * ScreenWidth;
			scrollView.scrollResponderScrollTo({x:offsetX,y:0,animated:true});

		}, this.props.time);

	}


	render() {
		return (
			<View style={styles.container}>
				<ScrollView
					ref='scrollView'
					horizontal={true}
					pagingEnabled={true}
					showsHorizontalScrollIndicator={false}
					onScrollBeginDrag={(e)=>this._onAnimationBeginDrag(e)}
					onScrollEndDrag={(e)=>this._onAnimationEndDrag(e)}
					onMomentumScrollEnd={(e)=>this._onAnimationEnd(e)}
				>
					{this.renderChildView()}
				</ScrollView>
				<View style={styles.pageViewStyle}>
					{/*返回原点*/}
					{this.renderPageCircle()}
				</View>
			</View>
		)
	}

	renderChildView() {
		//数组
		var allChild = [];
		for (let i = 0; i < 3; i++) {
			allChild.push(
				<View style={{width: ScreenWidth, height: 170}}
							key={i}>
					<Image source={require('./images/Banner_Driver.png')} style={{width:ScreenWidth, height:170}}></Image>
				</View>
			)
		}
		return allChild;
	};

	//返回原点
	renderPageCircle(){
		let indicatorArr = [];

		for (let i = 0; i < 2; i++) {
			let color =  (i === this.state.currentPage) ? 'orange' : '#ffffff';
			indicatorArr.push(
				<Text style={[{color},{fontSize:25, lineHeight:25}]} key={i}>&bull;</Text>
			)
		}
		return indicatorArr;
	}
}

const styles = StyleSheet.create({
	outView:{
		flex:1,
	},
	container:{
		width:global.SCREEN.width,
		height: BannerHeight,
	},
	pageViewStyle:{
		width: ScreenWidth,
		height:25,
		paddingLeft:15,
		//定位
		position:'absolute',
		bottom:0,

		//设置对齐方式
		flexDirection:'row',
		alignItems:'center'
	},
	indicatorStyle:{
		fontSize:25,
		color:'red',
		lineHeight:25,
		paddingLeft:5,
	}
});
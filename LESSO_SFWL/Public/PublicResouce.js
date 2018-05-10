/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/*获取屏幕宽高*/
let Dimension = require('Dimensions').get('window')
global.SCREEN = {
	width : Dimension.width,
	height: Dimension.height,
}


//基地址
global.BaseURL = 'http://172.16.100.147/lisapi/api/'

//资源文件路径
global.BaseSourceURL = 'http://172.16.100.147/devlis'

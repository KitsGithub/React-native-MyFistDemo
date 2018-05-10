import {Component} from "react";

import './PublicResouce'

export default class Networking extends Component {

	constructor(props) {
		super(props);
	}




	static GET(url,params,responCallBack) {
		fetch(url,{
			method:'GET',
			body:params
		}).then((resopnse)=> {
			if (resopnse.ok) {
				return resopnse.json()
			}
		}).then((response)=> {
			responCallBack(response);
		})
	}


	static POST(url,params,responseCallBack) {
		url =  global.BaseURL + url;
		fetch(url,{
			method:'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body:params
		}).then((response)=> {
			if (response.ok) {
				return response.json()	//格式化返回参数
			}
		}).then((response) => {
			console.log('++++ 接口：' + url + '\n++++ 请求参数\n' + params);
			console.log(response)
			//判断接口规范
			responseCallBack(response);
		}).catch((errorMessage) => {
			console.log(errorMessage)
			alert('network error');
		})
	}


	static POSTwithJSONString(url,params,responseCallBack) {
		url =  global.BaseURL + url;
		fetch(url,{
			method:'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body:JSON.stringify(params)
		}).then((response)=> {
			if (response.ok) {
				return response.json()	//格式化返回参数
			}
		}).then((response) => {
			console.log('++++ 接口：' + url + '\n++++ 请求参数\n' + params);
			console.log(response)
			//判断接口规范
			responseCallBack(response);
		}).catch((errorMessage) => {
			console.log(errorMessage)
			alert('network error');
		})
	}

}
import React from 'react';

// For babel and es2015+, make sure to import the file:
import 'whatwg-fetch';

import {Component, Btn, View, Sts} from './comps';

import {MaterialItem} from 'aaa';

var cmpMaterialItem = React.createFactory(MaterialItem);

//console.log('MaterialItem', MaterialItem);

// import {
//   Text,
//   Image,
//   StyleSheet
// } from 'react-native-web';


// const styles = StyleSheet.create({
//   image: {
// 	height: 92,
// 	width: 272
//   }
// });

var gHeight = 350;
var gWidth = 140;

var queryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
	var pair = vars[i].split("=");
	// If first entry with this name
	if (typeof query_string[pair[0]] === "undefined") {
	  query_string[pair[0]] = decodeURIComponent(pair[1]);
	  // If second entry with this name
	} else if (typeof query_string[pair[0]] === "string") {
	  var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
	  query_string[pair[0]] = arr;
	  // If third or later entry with this name
	} else {
	  query_string[pair[0]].push(decodeURIComponent(pair[1]));
	}
  }
  return query_string;
}();

var vkId = queryString.viewer_id;
var authKey = queryString.auth_key;

export class MyApp extends Component {  
  constructor(props){
	super(props);

	this.state = {
	  arr: [],
	  text: ''
	};	
  }

  componentDidMount() {
	this.fetchData();
  }

  fetchData() {
	if (!vkId || !authKey) {
	  console.log('no viewer_id or auth_key');
	  return;
	}

	fetch('./v1/material/get-list?vk_id=' + vkId +
		  '&auth_key=' + authKey)
	  .then((response) => response.json())
	  .then((json) => {
		console.log('parsed json', json);
		if (json.errkey) {
		  alert('Непредвиденная ошибка: попробуйте позже');
		  return;
		}
		this.setState({
		  arr: json
		});
	  }).catch((ex) => {
		console.log('parsing failed', ex);
		alert('Непредвиденная ошибка: попробуйте позже');
		return;
	  });
	  //.done();
  }

  setCurrentText(currentText) {
	this.setState({
	  text: currentText
	});
  }

  render() {	
	var list = React.DOM.ol({
	  style: styles.list
	}, this.state.arr.map((item, ind) => {
	  var materialItem = cmpMaterialItem({
		row: item,
		vkId: vkId,
		authKey: authKey,
		apiHost: '.',
		cmp: {
		  btn: Btn,
		  view: View,
		  sts: Sts
		},
		setCurrentText: (content) => this.setCurrentText(content)
	  });
	  
	  return React.DOM.li({
		key: item.id
	  }, materialItem);
	}));
	
	var textWrap = React.DOM.textarea({
	  value: this.state.text,
	  placeholder: 'Выберите текст из списка справа!',
	  style: {
		padding: 4,
		width: "95%",
		height: gHeight
	  }
	});

	var divTextWrap = React.createElement(View, {
	  style: {
		paddingRight: gWidth,
		margin: 0
	  }
	}, textWrap);
	
	return this.state.arr.length ? React.DOM.div({
	  style: {
		clear: "both",
		margin: 8
	  }
	}, list, divTextWrap) : null;
  }
}


var styles = Sts.create({
  container: {
	backgroundColor: 'green'
  },
  list: {
	margin: 0,
	padding: 0,
	width: gWidth,
	height: gHeight,
	float: "right",
	overflow: "auto",
	overflowX: "hidden"
  }
});

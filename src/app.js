import React from 'react';
import ReactDOM from 'react-dom';

// For babel and es2015+, make sure to import the file:
import 'whatwg-fetch';

import {MyApp} from './my-app.js';

import cmp, {sts} from 'aweb';

// If you're using a module system, the recommended solution is to export the class and create the factory on the requiring side.
var MyAppComponent = React.createFactory(MyApp);

var queryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split('=');
    // If first entry with this name
    if (typeof query_string[pair[0]] === 'undefined') {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === 'string') {
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

ReactDOM.render(
  MyAppComponent({
    sts: sts,
    cmp: cmp,
    vkId: vkId,
    authKey: authKey
  }),
  document.getElementById('example')
);

(function(VK){

  try {
    VK.init(function () {

      if (VK.Widgets) {
        
        VK.Widgets.Like('vk_like', {
          type: 'button',
          width: 180,
          pageTitle: 'Баттл Естественный',
          pageDescription: 'Текстовый баттл. Аудиобаттл. Каталог битов. Принять участие можно в любой момент.',
          pageUrl: 'http://vk.com/app2644762',
          height: 20
        });
        
        VK.Widgets.Comments('vk_comments', {
          limit: 1,
          width: '665',
          height: '450',
          attach: false,
          pageUrl: '//vk.com/app2644762'
        }, 8642);

      }
      
    });
  }
  catch(exc) {
    console.log('VK exception');
    console.log(exc);
  }
})(window.VK);

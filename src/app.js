import React from 'react';
import ReactDOM from 'react-dom';

// For babel and es2015+, make sure to import the file:
import 'whatwg-fetch';

// all singletons inside a root
import AppDispatcher from './app-dispatcher';

//import {MyApp} from './my-app.js';
import Workspace from 'aaa';
console.log('Workspace', Workspace);
import cmp, {sts} from 'aweb';

import calcQueryString from './query-string';

(function(VK){

  // If you're using a module system, the recommended solution is to export the class and create the factory on the requiring side.

  var queryString = calcQueryString();

  var vkId = queryString.viewer_id;
  var authKey = queryString.auth_key;
  
  ReactDOM.render(
    React.createElement(Workspace, {
      sts: sts,
      cmp: cmp,
      vkId: vkId,
      authKey: authKey,
      apiHost: '.',
      dspr:  new AppDispatcher()
    }),
    document.getElementById('example')
  );

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

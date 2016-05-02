import React from 'react';
import ReactDOM from 'react-dom';

import {MyApp} from './my-app.js';

// If you're using a module system, the recommended solution is to export the class and create the factory on the requiring side.
var MyAppComponent = React.createFactory(MyApp);

ReactDOM.render(
  MyAppComponent(),
  document.getElementById('example')
);

try {
  VK.init(function () {

	if (VK.Widgets) {
	  
      VK.Widgets.Like("vk_like", { type: "button", width: 180, pageTitle: 'Баттл Естественный', pageDescription: 'Текстовый баттл. Аудиобаттл. Каталог битов. Принять участие можно в любой момент.', pageUrl: 'http://vk.com/app2644762', height: 20 });
	  
	  VK.Widgets.Comments("vk_comments", {
		limit: 1,
		width: "665",
		height: "450",
		attach: false,
		pageUrl: "//vk.com/app2644762"
	  }, 8642);

	}
	
  });
}
catch(exc) {
  console.log('VK exception');
  console.log(exc);
}

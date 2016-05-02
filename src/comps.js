import React, {
  Component
} from 'react';

exports.Component = Component;

exports.Sts = {
  create: function(obj){
	return obj;
  }
};

export class Btn extends Component {
  // constructor(props){
  // 	super(props);
  // }

  render() {
	return React.DOM.button({
	  // onPress for mobiles
	  onClick: (e) => {
		this.props.onClick(e);
	  },
	  style: this.props.style,
	  children: this.props.children
	});
  }
}

export class View extends Component {
  render() {
	return React.DOM.div(this.props);
  }
}

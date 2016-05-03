import React, {
  Component
} from 'react';

exports.Component = Component;

// StyleSheet.create construct is optional but
//   provides some key advantages.
// It ensures that the values are immutable and opaque by transforming them into plain numbers that reference an internal table.
// By putting it at the end of the file, you also ensure that they are only created once for the application and not on every render.
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
	// display: 'flex',
	// flex: 1,
	// flexDirection: 'row',
	// justifyContent: 'center',
	// alignItems: 'center',
	return React.DOM.div(this.props);
  }
}

import React from 'react';

import {MaterialItem} from 'aaa';

export class MyApp extends React.Component {  
  constructor(props){
    super(props);

    this.state = {
      arr: [],
      text: ''
    };

    this.cmpView = React.createFactory(this.props.cmp.View);
    this.cmpMaterialItem = React.createFactory(MaterialItem);

    var gHeight = 350;
    var gWidth = 140;    
    
    this.styles = this.props.sts.create({
      list: {
        margin: 0,
        padding: 0,
        width: gWidth,
        height: gHeight,
        float: 'right',
        overflow: 'auto',
        overflowX: 'hidden'
      },
      textWrap: {
        paddingRight: gWidth,
        margin: 0
      },
      textarea: {
        padding: 4,
        width: '95%',
        height: gHeight
      }
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  handleList(list){
    this.setState({
      arr: list
    });
  }

  fetchData() {
    fetch('./v1/material/get-list?vk_id=' + this.props.vkId +
          '&auth_key=' + this.props.authKey)
      .then((response) => response.json())
      .then((json) => {
        console.log('parsed json', json);
        if (json.errkey) {
          alert('Непредвиденная ошибка: попробуйте позже');
          return;
        }
        this.handleList(json);
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
      style: this.styles.list
    }, this.state.arr.map((item) => {
      var materialItem = this.cmpMaterialItem({
        row: item,
        vkId: this.props.vkId,
        authKey: this.props.authKey,
        apiHost: '.',
        sts: this.props.sts,
        cmp: this.props.cmp,
        setCurrentText: (content) => this.setCurrentText(content)
      });
      
      return React.DOM.li({
        key: item.id
      }, materialItem);
    }));
    
    var textWrap = React.DOM.textarea({
      value: this.state.text,
      placeholder: 'Выберите текст из списка справа!',
      style: this.styles.textarea
    });

    var divTextWrap = this.cmpView({
      style: this.styles.textWrap
    }, textWrap);
    
    return this.state.arr.length ? this.cmpView({
      style: {
        clear: 'both',
        margin: 8
      }
    }, list, divTextWrap) : null;
  }
}

MyApp.propTypes = {
  vkId: React.PropTypes.string.isRequired,
  authKey: React.PropTypes.string.isRequired,
  sts: React.PropTypes.object.isRequired,
  cmp: React.PropTypes.object.isRequired
};

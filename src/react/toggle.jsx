import React, { Component } from 'react';
import { render, findDOMNode } from 'react-dom';
import $ from 'jquery';

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, userInput: '' };// 只在组件装载之前调用一次
    this.handleClick = (e) => {
      this.setState({liked: !this.state.liked});
    };
    this.handleInput = (e) => {
      this.setState({ userInput: e.target.value })
    }
    this.clearAndFocusInput = () => {
      this.setState({ userInput: ''}, () => {this.refs.theInput.focus()});
      console.log(findDOMNode(this.refs.hello));
    }
  }
  componentDidMount() {
    const el = findDOMNode(this); // 得到dom对象
    console.log($(el).html());// findDOMNode()不能用在无状态组件上面
  }
  render() {
    const text = this.state.liked ? 'liked' : 'haven\'t liked';
    return (
      <div ref="hello">
        <p onClick={this.handleClick}>
          You {text} this. Click to toggle.
        </p>
        <div onClick={this.clearAndFocusInput}>click to focus and reset</div>
        <input ref="theInput" value={this.state.userInput} type='text' onChange={this.handleInput} />
      </div>
    )
  }
}

LikeButton.defaultProps = {// 这个方法在实例初始化之前调用,缓存返回的对象,当访问时,这个属性没有在父组件传入时,仍然确保是幼值的.
  like: false,
};

render( // 必须,组装成这个组件的HTML结构.也可以返回null或者false.
  <LikeButton />,
  document.getElementById('reactToggle')
);
// 生命周期函数
// componentWillMount,   在render之前调用.
// componentDidMount, 在render之后调用.可以通过ReactDOM.findDOMNode(this)获取到组件的DOM节点.
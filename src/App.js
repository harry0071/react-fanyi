import React, { Component } from 'react';
import './App.css';

const md5 = window.md5;
const axios = window.axios;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appid: '20160614000023332',
      key: '9KrY22h99MzDRWiJ0Jen',
      salt: '1435660288',
      srcLang:'',
      to:'zh',
      languages:[{
        lang:'zh',
        name:'中文'
      },{
        lang:'en',
        name:'英语'
      },{
        lang:'jp',
        name:'日语'
      },{
        lang:'kor',
        name:'韩语'
      },{
        lang:'th',
        name:'泰语'
      },{
        lang:'fra',
        name:'法语'
      },{
        lang:'ru',
        name:'俄语'
      },{
        lang:'de',
        name:'德语'
      }],
      result:'Please enter the text'
    };

    this.fanyi = this.fanyi.bind(this);
    this.setSrcLang = this.setSrcLang.bind(this);
    this.setTo = this.setTo.bind(this);
  };

  fanyi(){
    axios.jsonp('https://fanyi-api.baidu.com/api/trans/vip/translate', {
      params: {
        q: this.state.srcLang,
        to: this.state.to,
        appid: this.state.appid,
        key: this.state.key,
        from: 'auto',
        salt: this.state.salt,
        sign: md5(this.state.appid + this.state.srcLang + this.state.salt + this.state.key)
      }
    })
    .then(res => {
      const result = res.trans_result[0].dst;
      this.setState({ result });
    })

  };

  setSrcLang(ev){
    this.setState({
      srcLang: ev.target.value
    })
  };

  setTo(ev){
    this.setState({
      to: ev.target.value
    })
  };

  render() {
    const { languages,srcLang,to,result } = this.state;
    return (
      <div className="container">
        <div id="from-to">
          {/*
          <select id="to">
            <option value="auto">自动检测</option>
            <option value="zh">中文</option>
            <option value="en">英语</option>
            <option value="jp">日语</option>
            <option value="kor">韩语</option>
            <option value="th">泰语</option>
          </select>↓ */} 我想要翻译成
          <select id="to" value={to} onChange={this.setTo}>
            {languages.map(lang => <option key={lang.lang} value={lang.lang}>{lang.name}</option>)}
          </select>▼
        </div>
        <textarea value={srcLang} onChange={this.setSrcLang} autoFocus placeholder="请输入文字"></textarea>
        <button id="btn" onClick={this.fanyi}>翻译</button>
        <div id="result">{result}</div>
        <footer>© 极简翻译 由 stage 制作</footer>
      </div>
    );
  }
}

export default App;

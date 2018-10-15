import React, { Component } from 'react';
import './App.css';

const md5 = window.md5;
const axios = window.axios;
const appid = '20160614000023332';
const key = '9KrY22h99MzDRWiJ0Jen';
const salt = '1435660288';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        appid,
        key,
        from: 'auto',
        salt,
        sign: md5(appid + this.state.srcLang + salt + key)
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
        <div id="from-to">我想要翻译成 
          <select id="to" value={to} onChange={this.setTo}>
            {languages.map(lang => <option key={lang.lang} value={lang.lang}>{lang.name}</option>)}
          </select>
        </div>
        <textarea value={srcLang} onChange={this.setSrcLang} autoFocus placeholder="请输入文字"></textarea>
        <button id="btn" onClick={this.fanyi}>翻译</button>
        <div id="result">{result}</div>
        <footer>© 极简翻译 由 <a href="https://harry0071.github.io/react-fanyi">stage</a> 制作</footer>
      </div>
    );
  }
}

export default App;

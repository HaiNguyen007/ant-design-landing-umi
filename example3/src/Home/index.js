import React from "react";
import { enquireScreen } from 'enquire-js';

import Feedback from "./Feedback";
import Contact from "./Contact";
import Newsletter from "./Newsletter";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    /* 如果不是 dva 2.0 请删除 start */
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
    /* 如果不是 dva 2.0 请删除 end */
  }
  render(){
    return (
    <>
      <h1 style={{ textAlign: "center" }}>
        <a
          href="https://docs.google.com/spreadsheets/d/1Z5dAPskMy0iC7Tm95c00tC5p366JqiNht9NmWz-hDqQ/"
          target="_blank"
        >
          Sheets View
        </a>
      </h1>
      <div className="App">
        <div className="contact-form form">
          <h1>Feedback Form</h1>
          <Feedback />
        </div>
        <div className="feedback-form form">
          <h1>Contact Form</h1>
          <Contact />
        </div>
        <div className="newsletter-form form">
          <h1>Newsletter</h1>
          <Newsletter />
        </div>
      </div>
    </>
  );
  }
}

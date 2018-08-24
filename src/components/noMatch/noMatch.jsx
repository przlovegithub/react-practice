import React from "react";
import noMatchImg from "@/assets/images/404.jpg";
import "./noMatch.scss";
class noMatch extends React.Component {
  render() {
    return (
      <div className="noMatch">
        <img src={noMatchImg} alt="" />
      </div>
    );
  }
}
export default noMatch;

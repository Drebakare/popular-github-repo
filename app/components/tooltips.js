import React, { Children } from 'react'
import PropTypes from 'prop-types'

export default class ToolTips extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hovering:false
      }
      this.mouseOver = this.mouseOver.bind(this)
      this.mouseOut = this.mouseOut.bind(this)
      
    }
    mouseOver() {
    this.setState({
        hovering: true,
    });
    }
    mouseOut() {
    this.setState({
        hovering: false,
    });
    }
    render() {
        const {hovering} = this.state
        const {text,children} = this.props
        return (
            <div onMouseOver={this.mouseOver}
             onMouseOut={this.mouseOut}
             style={styles.container}
             >
                 {hovering ? <div style={styles.tooltip}>{text}</div> : null }
                 {children}
            </div>
        )
    }
}

const styles = {
  container: {
    position: "relative",
    display: "flex",
  },
  tooltip: {
    boxSizing: "border-box",
    position: "absolute",
    width: "160px",
    bottom: "100%",
    left: "50%",
    marginLeft: "-80px",
    borderRadius: "3px",
    backgroundColor: "hsla(0,0%,20%,0.9)",
    padding: "7px",
    marginBottom: "5px",
    color: "#fff",
    textAlign: "center",
    fontSize: "14px",
  },
};

ToolTips.propTyps = {
    text:PropTypes.string.isRequired,
}
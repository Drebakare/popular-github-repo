import React from 'react'
import PropTypes from "prop-types";

const styles = {
    content: {
        fontSize: '35px',
        position: 'absolute',
        left: '0',
        right: '0',
        marginTop: '20px',
        textAlign: 'center'

    }
}

export default class Loading extends React.Component{
    constructor(props) {
        super(props);
        const {time,text} = this.props
        this.state = {
            content:text,
            time:time
        }
    }
    componentDidMount() {
        const {time,text} = this.props
        this.interval = window.setInterval(()=>{
            this.state.content === {text} + "..."
              ? this.setState({ content: text })
              : this.setState(({ content }) => ({content:content + '.'}));
        },time)
    }
    componentWillUnmount(){
        window.clearInterval(this.interval)
    }
    
    render() {
        return (
            <p style={styles.content}>
                {this.state.content}
            </p>
        )
    }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

Loading.defaultProps = {
    text: 'Loading',
    time: 300
}

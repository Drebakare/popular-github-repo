import React from 'react'
import ReactDom from 'react-dom'
import {MdPeople,MdFlight,MdLocalBar,MdCancel} from 'react-icons/md'
import PropTypes from 'prop-types'
import Result from './result'
import {ThemeConsumer} from '../context/context'
import {Link} from 'react-router-dom'

function Instructions (props) {
        return (
          <ThemeConsumer>
            {({ theme }) => (
              <div className="instruction-container">
                <h1 className="center-text header-lg">Instructions</h1>
                <ol className="container-sm grid center-text battle-instruction">
                  <li>
                    <h3 className="header-sm">Enter Two Github User</h3>
                    <MdPeople
                      className={`bg-${theme}`}
                      color="rgb(255,191,116)"
                      size={140}
                    ></MdPeople>
                  </li>
                  <li>
                    <h3 className="header-sm">Battle</h3>
                    <MdFlight
                      className={`bg-${theme}`}
                      color="#727272"
                      size={140}
                    ></MdFlight>
                  </li>
                  <li>
                    <h3 className="header-sm">See The Winner</h3>
                    <MdLocalBar
                      className={`bg-${theme}`}
                      color="rgb(255,215,0)"
                      size={140}
                    ></MdLocalBar>
                  </li>
                </ol>
              </div>
            )}
          </ThemeConsumer>
        );
    }

class PlayerInput extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        username:''
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(event){
      event.preventDefault()
      this.props.onSubmit(this.state.username)
    }

    handleChange(event){
        this.setState({
          username:event.target.value
        })
    }
    render() {
      return (
        <ThemeConsumer>
          {({ theme }) => (
            <form className="column player" onSubmit={this.handleSubmit}>
              <label htmlFor="username" className="player-label">
                {this.props.label}
              </label>
              <div className="row player-input">
                <input
                  type="text"
                  id="username"
                  className={`input-${theme}`}
                  placeholder="github username"
                  autoComplete="off"
                  value={this.state.username}
                  onChange={this.handleChange}
                ></input>
                <button
                  className={`btn ${theme}-btn`}
                  type="submit"
                  disabled={!this.state.username}
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </ThemeConsumer>
      );
    }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label:PropTypes.string.isRequired
};

function PlayerPreview({username,onReset,label}){
  return(
      <div className='column player'>
          <h3 className='player-label'>{label}</h3>
          <div className='row bg-light'>
              <div className='player-info'>
                  <img className='avatar-small' src={`https:github.com/${username}.png?size=200`} alt={`avatar for ${username}`}></img>
                  <a 
                    href={`https://github.com/${username}`}
                    className='link'>
                      {username}
                  </a>
              </div>
              <button className='btn-clear flex-center' onClick={onReset}>
                  <MdCancel color='rgb(194,57,42)' size={26}></MdCancel>
              </button>
          </div>
      </div>
  )
}

PlayerPreview.propTypes = {
    username:PropTypes.string.isRequired,
    onReset:PropTypes.func.isRequired,
    label:PropTypes.string.isRequired,
}
export default class Battle extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        playerOne:null,
        playerTwo:null,
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleReset = this.handleReset.bind(this)
    }

    handleSubmit(id,player){
        this.setState({
          [id]:player
        })
    }

    handleReset(id){
      this.setState({
        [id]:null
      })
    }

    render(){
        const {playerOne, playerTwo} = this.state
       
        return (
          <React.Fragment>
            <Instructions></Instructions>
            <div className="players-container">
              <h1 className="center-text header-lg"> Players</h1>
              <div className="row space-around">
                {playerOne === null ? (
                  <PlayerInput
                    label="Player One"
                    onSubmit={(player) =>
                      this.handleSubmit("playerOne", player)
                    }
                  ></PlayerInput>
                ) : (
                  <PlayerPreview
                    username={playerOne}
                    label="Player One"
                    onReset={() => this.handleReset('playerOne')}
                  ></PlayerPreview>
                )}
                {playerTwo === null
                 ? (
                  <PlayerInput
                    label="Player Two"
                    onSubmit={(player) =>
                      this.handleSubmit("playerTwo", player)
                    }
                  ></PlayerInput>
                ) 
                : 
                (
                  <PlayerPreview
                    username={playerTwo}
                    label="Player Two"
                    onReset={() => this.handleReset('playerTwo')}
                  ></PlayerPreview>
                )}
              </div>
              
              {playerOne !== null && playerTwo !==null ? 
                <Link className='btn dark-btn btn-space'
                  to={{ 
                    pathname:'/battle/results',
                    search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                   }}
                >
                  Battle
                </Link>
                :null
              }
            </div>
          </React.Fragment>
        );
    }
}

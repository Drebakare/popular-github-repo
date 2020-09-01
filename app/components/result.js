import React from 'react'
import {battle} from '../utils/api'
import { MdPersonPin, MdLocationOn, MdShoppingBasket, MdPeople } from "react-icons/md";
import Card from './card'
import PropTypes from "prop-types";
import Loading from './loading'
import ToolTips from './tooltips'
import queryString from 'query-string'
import {Link} from 'react-router-dom'

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <MdPersonPin color="rgb(255,191,116)" size={22}></MdPersonPin>
        <a className="link" href={profile.html_url}>
          {profile.name}
        </a>
      </li>
      {profile.location ? (
        <li>
          <ToolTips text="User's Location">
            <MdLocationOn color="rgb(255,141,0)" size={22}></MdLocationOn>
            {profile.location}
          </ToolTips>
        </li>
      ) : null}
      {profile.company ? (
        <li>
          <ToolTips text="User's Company">
            <MdShoppingBasket color="#795548" size={22}></MdShoppingBasket>
            {profile.company}
          </ToolTips>
        </li>
      ) : null}
      <li>
        <MdPeople color="rgb(241,138,247)" size={22}></MdPeople>
        {profile.followers.toLocaleString()} Followers
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default class Result extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           'winner': null,
           'loser' : null,
           'loading' : true,
           'error' : null
        }
    }
    componentDidMount(){
        console.log(this.props.location.search);
        const {playerOne,playerTwo} = queryString.parse(this.props.location.search)
         const battleResult =  battle([playerOne,playerTwo])
         console.log(battleResult)
        battleResult
        .then((players) => {
            this.setState({
              winner:players[0],
              loser:players[1], 
              error:null,
              loading:false
            })
        })
        .catch(error =>{
          this.setState({
            error:error,
            loading:false
          })
        })
    }
  render(){
      const {winner,loser,error,loading} = this.state
      console.log(this.state)
      if (loading) {
        return (
            <div>
              <Loading time={200} text='Take Chill Pill'></Loading>
            </div>
        )
      }
      if (error) {
        return (
            <p className='center-text error'>{error}</p>
        )
      }
      return (
        <React.Fragment>
          <div className="grid space-around container-sm">
            <Card
              header={winner.score === loser.score ? "Tie" : "Winner"}
              subheader={`Score: ${winner.score.toLocaleString()}`}
              avatar={winner.profile.avatar_url}
              href={winner.profile.html_url}
              name={winner.profile.name}
            >
              <ProfileList profile={winner.profile} />
            </Card>
            <Card
              header={winner.score === loser.score ? "Tie" : "Loser"}
              subheader={`Score: ${loser.score.toLocaleString()}`}
              avatar={loser.profile.avatar_url}
              href={loser.profile.html_url}
              name={loser.profile.name}
            >
              <ProfileList profile={loser.profile}></ProfileList>
            </Card>
          </div>
          <Link className='btn dark-btn btn-space' to='/battle'>
              Reset
          </Link>
        </React.Fragment>
      );
  }   
}


const styles = {
  container:{
    position:'relative',
    display:'flex',
  },
  tooltip:{
    boxSizing:'border-box',
    position:'absolute',
    width:'160px',
    bottom:'100%',
    left:'50%',
    marginLeft:'-80px',
    borderRadius:'3px',
    backgroundColor:'hsla(0,0%,20%,0.9)',
    padding:'7px',
    marginBottom:'5px',
    color:'#fff',
    textAlign:'center',
    fontSize: '14px',
  }
}
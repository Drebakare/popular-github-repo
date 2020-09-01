import React from 'react'
import PropTypes from 'prop-types'
import {fetchPopularRepos} from '../utils/api'
import Loading from './loading.js'
import {
  MdPersonPin,
  MdStar,
  MdCallSplit,
  MdLockOpen,
} from "react-icons/md";
import ToolTips from "./tooltips";

function LanguageNav({selectedLanguage,changeLanguage}){
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
        <ul className="flex-center">
            {languages.map((language) => (
                <li key={language}>
                    <button
                        style={selectedLanguage === language ? { color: 'rgb(187,46,31)' } : null}
                        onClick={() => changeLanguage(language)} className="button-clear nav-link">
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    );
}

function RepostGrid({repos}){
    return(
        <ul className='grid space-around'>
            {
                repos.map((repo, index)=>{
                    const {name,owner,html_url, stargazers_count,forks,open_issues} = repo
                    const {login,avatar_url} = owner

                    return (
                      <li key={html_url} className="repo bg-light">
                        <h4 className="header-large content-center">
                          #{index + 1}
                        </h4>
                        <img
                          className="avatar"
                          src={avatar_url}
                          alt={`avatar for ${login}`}
                        ></img>
                        <h2 className="center-text">
                          <a className="link" href={html_url}>
                            {login}
                          </a>
                        </h2>
                        <ul className="card-list">
                          <li>
                            <ToolTips text='Username'>
                              <MdPersonPin
                                color="rgb(255,191,116)"
                                size={22}
                              ></MdPersonPin>
                              <a className="link" href={html_url}>
                                {login}
                              </a>
                            </ToolTips>
                          </li>
                          <li>
                            <MdStar color="rgb(255,141,0)" size={22}></MdStar>
                            {stargazers_count.toLocaleString()} stars
                          </li>
                          <li>
                            <MdCallSplit
                              color="rgb(255,141,0)"
                              size={22}
                            ></MdCallSplit>
                            {forks.toLocaleString()} Forks
                          </li>
                          <li>
                            <MdLockOpen
                              color="rgb(241,138,247)"
                              size={22}
                            ></MdLockOpen>
                            {open_issues.toLocaleString} Open Issues
                          </li>
                        </ul>
                      </li>
                    );
                })
            }
        </ul>
    )
}

LanguageNav.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    changeLanguage: PropTypes.func.isRequired
}

RepostGrid.propTypes = {
    repos:PropTypes.array.isRequired
}

export default class Popular extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedLanguage:'All',
            repos:{},
            error:null
        }
        this.changeLanguage = this.changeLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }

    componentDidMount(){
        this.changeLanguage(this.state.selectedLanguage)
    }
    changeLanguage(selectedLanguage){
        this.setState({
            selectedLanguage,
            error:null,
        })
        if (!this.state.repos[selectedLanguage]) {
            const result = fetchPopularRepos(this.state.selectedLanguage)
            result.then((data)=>{
                this.setState(({repos})=>({
                    repos:{
                        ...repos,
                        [selectedLanguage]:data
                    }
                }))
            })
            .catch(error => {
                this.setState({ error })
            })
        }
    }
    isLoading(){
        const {selectedLanguage, repos, error} = this.state
        return !repos[selectedLanguage] && error === null
    }
    render(){
        const {selectedLanguage, repos, error} = this.state
        console.log(repos)
        return (
          <React.Fragment>
            <LanguageNav
              selectedLanguage={selectedLanguage}
              changeLanguage={this.changeLanguage}
            ></LanguageNav>
            {this.isLoading() ? (
              <Loading time={200} text="Take Chill Pill"></Loading>
            ) : null}
            {error === null ? (
              <p className="error">{this.state.error}</p>
            ) : null}
            {repos[selectedLanguage] ? (
              <RepostGrid repos={repos[selectedLanguage]}></RepostGrid>
            ) : null}
          </React.Fragment>
        );
        
    }
}
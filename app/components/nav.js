import React from 'react'
import {ThemeConsumer} from '../context/context'
import {MdHighlight, MdTouchApp} from 'react-icons/md'
import {NavLink} from 'react-router-dom' 

const activeStyle = {
    color: 'rgb(187,46,31)'
}
export default function Nav() {
    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => (
          <nav className="row space-between">
            <ul className="row nav">
              <li>
                <NavLink to="/" className="nav-link" exact activeStyle={activeStyle}>
                  Popular
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/battle"
                  exact
                  className="nav-link"
                  activeStyle={activeStyle}
                >
                  Battle
                </NavLink>
              </li>
            </ul>
            <button
              style={{ fontSize: 30 }}
              className="btn-clear"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <MdTouchApp></MdTouchApp>
              ) : (
                <MdHighlight></MdHighlight>
              )}
            </button>
          </nav>
        )}
      </ThemeConsumer>
    );
}
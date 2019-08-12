import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { colors, textMonoSpace, transition } from './utils/styles'
import logo from '../img/logo.svg'
import { FaLinkedin, FaGithub, FaCaretDown } from 'react-icons/fa'

const Navbar = () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(sort: { fields: wordpress_id }, limit: 5) {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `}
    render={data => (
      <NavWrapper>
        <div className="nav-logo">
          <Link style={{ textDecoration: 'none' }} to="/">
            <div className="logo">
              <span style={{ color: 'black' }}>&#60;</span>
              LeeKlopfers
              <span style={{ color: 'black' }}>&#47;&#62;</span>
            </div>
          </Link>
        </div>
        <div className="dropdown">
          Blog <FaCaretDown />
          <div className="dropdown-content">
            <div className="dropdown-item" >Post1</div>
            <div className="dropdown-item" >Post2</div>
          </div>
        </div>
        <div className="nav-social">
          <div>
            <FaLinkedin className="icon" />
          </div>
          <div>
            <FaGithub className="icon" />
          </div>
        </div>
      </NavWrapper>
    )}
  />
)

export default Navbar

const NavWrapper = styled.nav`
  padding: 1.2rem;

  .logo {
    color: ${colors.primaryColor};
    ${textMonoSpace};
    font-size: 1.5rem;
    text-decoration: none;
  }

  div {
    display: inline;
  }

  .nav-logo {
  }

  .dropdown {
    margin-left: 2rem;
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #e0e0e0e0;
      min-width: 8rem;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      padding: .5rem;
      z-index: 1;

      .dropdown-item{
        display:block;
        &:hover{
          color: ${colors.primaryColor};
        }
      }
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }
  

  .nav-social {
    float: right;
    padding-top: .4rem;
  
    .icon{
    font-size: 1.3rem;
    color: ${colors.mainBlack};
    margin: 0 .7rem;
    
    &:hover{
      color: ${colors.primaryColor};
      transition: ${transition};
      cursor:pointer;
    }
  }
`

import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { colors } from './utils/styles'
import logo from '../img/logo.svg'

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
      <nav className="navbar is-transparent">
        <div className="container">
          <div className="navbar-brand">
            <a href='https://leeklopfers.de' target="_blank" rel='noopener noreferrer' className="navbar-item">
              <figure className="image">
                <img src={logo} alt="Lee" style={{ width: '88px' }} />
              </figure>
            </a>
          </div>
          <Link to="/" className="navbar-item">
            <LinkWrapper>Blog</LinkWrapper>
          </Link>
        </div>
        {/* <div className="navbar-start">
            {data.allWordpressPage.edges.map(edge => (
              <Link
                className="navbar-item"
                to={edge.node.slug}
                key={edge.node.slug}
              >
                {edge.node.title}
              </Link>
            ))}
          </div> 
        </div>*/}
      </nav>
    )}
  />
)

export default Navbar

const LinkWrapper = styled.div`
color: ${colors.mainBlack};
    &:hover {
      color: ${colors.primaryColor};
    }
`
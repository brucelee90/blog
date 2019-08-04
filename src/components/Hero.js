import React from 'react'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'

export default function Hero() {
  return (
    <div>
      <StaticQuery
        query={graphql`
          query HeadingQuery {
            wordpressWpMedia {
              source_url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        `}
        render={
          (data => (
            <header>
              <Img
                className="post-image"
                fluid={data.wordpressWpMedia.localFile.childImageSharp.fluid}
              />
            </header>
          ))
        }
      />
    </div>
  )
}

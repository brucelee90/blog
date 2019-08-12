import React from 'react'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

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
                  fluid {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        `}
        render={data => (
          <header>
            <Wrapper>
              <div className="image-container">
                <div className="hero-text text">LEE'S BLOG</div>
              </div>
              <HeroWrapper>
                <Img
                  className="post-image"
                  fluid={data.wordpressWpMedia.localFile.childImageSharp.fluid}
                  objectFit="cover"
                />
              </HeroWrapper>
            </Wrapper>
          </header>
        )}
      />
    </div>
  )
}

const HeroWrapper = styled.div`
  max-height: 95vh;
  overflow: hidden;
  filter: brightness(60%);
  position: relative;
`
const Wrapper = styled.div`
  max-height: 95vh;
  overflow: hidden;
  position: relative;

  .hero-text {
    color: white;
    position: absolute;
    z-index: 10;
    margin: auto;
    left: 50%;
    top: 50%;
  }

  .image-container {
  /* background-image: url("img_nature.jpg"); */
  /* background-size: cover; */
  /* position: relative; */
  /* height: 300px; */
}

.text {
  background-color: white;
  color: black;
  font-size: 6vw; 
  font-weight: bold;
  margin: 0 auto;
  padding: 10px;
  width: 35%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
}
`

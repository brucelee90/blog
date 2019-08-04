import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { colors } from './utils/styles'

export default function PostCard(data) {
  // Alle Props kommen aus PostList.js
  const {
    title,
    linkToPost,
    thumbnail,
    htmlText,
    datePosted,
    tags,
    // postAuthor,
  } = data

  function htmlTexting() {
    return 'servus hehe'
  }

  const readMoreText = input => {
    // Nach dem div kommt nur ein Link aus Wordpress, der entfernt werden muss
    const x = input.split('<div>')
    return x[0]
  }

  // console.log(tags)

  return (
    <PostCardWrapper>
      <Link to={linkToPost}>
        <div>
          <Img
            className="post-image"
            fluid={thumbnail}
            style={{
              borderRadius: '5px',
            }}
          />
          <div className="post-header">{title}</div>
        </div>
      </Link>

      <div
        className="post-text"
        dangerouslySetInnerHTML={{
          __html: readMoreText(htmlText),
          // __html: htmlText,
        }}
      />
      <Link className="read-more" to={linkToPost}>
        ... mehr lesen
      </Link>

      <div className="post-date">
        <small>- {datePosted}</small>
      </div>
      <div className="tag-section">
        <div className='tags'>Tags:</div>
        <div>
          <ul className="post-tags">
            {tags.map(tag => (
              <li key={`${tag.slug}tag`}>
                <Link className="post-tag" to={`/tags/${tag.slug}/`}>
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PostCardWrapper>
  )
}

const PostCardWrapper = styled.div`
  .post-text {
    margin-top: 0.3rem;
    font-weight: 400;
    font-size: 1rem;
  }

  .post-header {
    margin-top: 0.5rem;
    font-weight: bold;
    font-size: 1.4em;
    color: ${colors.mainBlack};
  }

  .post-image {
    -webkit-box-shadow: 0px 6px 19px -7px rgba(0, 0, 0, 0.45);
    -moz-box-shadow: 0px 6px 19px -7px rgba(0, 0, 0, 0.45);
    box-shadow: 0px 6px 19px -7px rgba(0, 0, 0, 0.45);
  }

  .post-date {
    text-align: right;
    color: #aaaaaa;
  }
  .read-more {
    color: ${colors.mainBlack};
    &:hover {
      color: ${colors.primaryColor};
    }
  }

  .tags{
    display: inline;
    float: left;
    margin-right: .5rem;
  }

  .post-tags {
    list-style: none;
    margin: 0;
    overflow: hidden;
    padding: 0;
    display: inline;
    float: left;
  }

  .post-tags li {
    float: left;
  }

  .post-tag {
    background: #eee;
    border-radius: 3px 0 0 3px;
    color: #474747;
    display: inline-block;
    height: 26px;
    line-height: 26px;
    padding: 0 20px 0 23px;
    position: relative;
    margin: 0 10px 10px 0;
    text-decoration: none;
    -webkit-transition: color 0.1s;
  }

  .post-tag::before {
    background: #fff;
    border-radius: 10px;
    box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
    content: '';
    height: 6px;
    left: 10px;
    position: absolute;
    width: 6px;
    top: 10px;
  }

  .post-tag::after {
    background: #fff;
    border-bottom: 13px solid transparent;
    border-left: 10px solid #eee;
    border-top: 13px solid transparent;
    content: '';
    position: absolute;
    right: 0;
    top: 0;
  }

  .post-tag:hover {
    background-color: ${colors.primaryColor};
    color: white;
  }

  .post-tag:hover::after {
    border-left-color: ${colors.primaryColor};
  }
`

import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { colors, transition } from './utils/styles'

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

  const lastComma = (item, i) => {
    if (item.length === i+1) {
      console.log('last');
    }else{
      console.log('not last');
      return ', '
    }
  }

  return (
    <PostCardWrapper>
      <Img className="post-image" fluid={thumbnail} />
      <section>
        <div className="post-date">
          <small>{datePosted}</small>
        </div>
        <Link to={linkToPost}>
          <div className="post-header">{title}</div>
        </Link>

        <div
          className="post-text"
          dangerouslySetInnerHTML={{
            __html: readMoreText(htmlText),
            // __html: htmlText,
          }}
        />
        <Link className="read-more" to={linkToPost}>
          ...mehr lesen
        </Link>
      </section>
      <div>
        <hr />
      </div>

      <section>
        <ul className="post-tags">
          {tags.map((tag, i) => (
            <li key={`${tag.slug}tag`}>
              <Link className="post-tag" to={`/tags/${tag.slug}/`}>
                {tag.name.toUpperCase()}
                {lastComma(tags, i)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PostCardWrapper>
  )
}

const PostCardWrapper = styled.div`

  background: #ffffff;
  -webkit-box-shadow: 0px 0px 30px 0px rgba(204,204,204,1);
  -moz-box-shadow: 0px 0px 30px 0px rgba(204,204,204,1);
  box-shadow: 0px 0px 30px 0px rgba(204,204,204,1);
  transition: ${transition};
  &:hover{
    transition: ${transition};
    -webkit-box-shadow: 0px 0px 2px 0px rgba(204,204,204,1);
    -moz-box-shadow: 0px 0px 2px 0px rgba(204,204,204,1);
    box-shadow: 0px 0px 2px 0px rgba(204,204,204,1);
  }

  section {
    padding: .7rem 1.5rem;
  }

  .post-text {
    margin-top: 0.3rem;
    font-weight: 400;
    font-size: 1rem;
  }

  .post-header {
    margin: 1.1rem 0;
    font-weight: bold;
    font-size: 1.8em;
    color: ${colors.mainBlack};
    transition: ${transition};
    &:hover {
      color: ${colors.orange};
      transition: ${transition};
    }
  }

  .post-date {
    text-align: left;
    color: #aaaaaa;
  }
  .read-more {
    color: black;
    transition: ${transition};
    &:hover {
      transition: ${transition};
      color: ${colors.primaryColor};
    }
  }

  .tags {
    display: inline;
    float: left;
    margin-right: 0.5rem;
  }

  .post-tags {
    list-style: none;
    margin: 0;
    overflow: hidden;
    padding: 0;
  }

  .post-tags li {
    float: left;
  }

  hr{
    border: .5px solid #eee;
    /* width: 75%; */
    margin: 0;
    }

  .post-tag {
    font-size: .9rem;
    color: #969696;
    margin-right: .3em;
    transition: ${transition};
    &:hover{
      color: #000000;
      transition: ${transition};
    }
  }
`

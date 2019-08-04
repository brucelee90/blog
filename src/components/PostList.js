import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import PostCard from './PostCard'
import styled from 'styled-components'

export default class IndexPage extends React.Component {
  render() {
    const { posts, title } = this.props
    // console.log(this.props)

    return (
      <section className="section">
        <div className="container">

          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">{title}</h1>
          </div>
          <PostWrapper>
            {/* Alle Daten werden an PostCard übergeben, um dort besser stylen zu können! */}
            {posts.map(({ node: post }) => (
              <div className="masonry-item" key={post.id}>
                <PostCard
                  title={post.title}
                  linkToPost={post.slug}
                  thumbnail={
                    post.acf.thumbnailthumbnail.localFile.childImageSharp.fluid
                  }
                  htmlText={post.excerpt.replace(/<p class="link-more.*/, '')}
                  datePosted={post.date}
                  postAuthor={`/author/${post.author.slug}`}
                  tags={post.tags}
                />
              </div>
            ))}
          </PostWrapper>
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export const pageQuery = graphql`
  fragment PostListFields on wordpress__POST {
    acf {
      thumbnailthumbnail {
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
    id
    title
    excerpt
    author {
      name
      slug
      avatar_urls {
        wordpress_48
      }
    }
    date(formatString: "MMMM DD, YYYY")
    slug
    tags{
      name
      slug
    }
  }
`
const PostWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  grid-auto-rows: minmax(180px, auto);
  grid-auto-flow: dense;
`

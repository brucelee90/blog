import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { transition } from '../components/utils/styles'
import Layout from '../components/Layout'
import { FaTag } from 'react-icons/fa'

export const BlogPostTemplate = ({
  content,
  categories,
  tags,
  title,
  date,
  // author,
  acf,
}) => {
  const kategorienMehrzahl = items => {
    console.log(items.length)

    if (items.length > 1) {
      return 'n'
    }
    return ''
  }

  const lastComma = (item, i) => {
    if (item.length === i + 1) {
      console.log()
    } else {
      console.log()
      return ', '
    }
  }

  return (
    <PostWrapper>
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Img
                className="post-image"
                fluid={acf.thumbnailthumbnail.localFile.childImageSharp.fluid}
              />
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
              <div className="post-date-tags">
                <p>{date}</p>
                {tags && tags.length ? (
                  <div className="post-tags">
                    <FaTag className="fa-tag" />
                    <ul className="post-taglist">
                      {tags.map((tag, i) => (
                        <li key={`${tag.slug}tag`}>
                          <Link className="post-tag" to={`/tags/${tag.slug}/`}>
                            {tag.name.toUpperCase()}
                            {lastComma(tags, i)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <hr />
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <div style={{ marginTop: `4rem` }}>
                {/* <p>{date}</p> */}
                {categories && categories.length ? (
                  <div>
                    <hr />
                    <h4>Kategorie {kategorienMehrzahl(categories)}</h4>
                    <ul className="taglist post-taglist">
                      {categories.map(category => (
                        <li key={`${category.slug}cat`}>
                          <Link
                            className="post-tag"
                            to={`/categories/${category.slug}/`}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PostWrapper>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { wordpressPost: post } = data

  return (
    <Layout>
      <Helmet title={`${post.title} | Blog`} />
      <BlogPostTemplate
        content={post.content}
        categories={post.categories}
        tags={post.tags}
        title={post.title}
        date={post.date}
        author={post.author}
        acf={post.acf}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  fragment PostFields on wordpress__POST {
    id
    slug
    content
    date(formatString: "MMMM DD, YYYY")
    title
  }
  query BlogPostByID($id: String!) {
    wordpressPost(id: { eq: $id }) {
      id
      title
      slug
      content
      date(formatString: "DD. MMMM YYYY", locale: "de")
      categories {
        name
        slug
      }
      tags {
        name
        slug
      }
      author {
        name
        slug
      }
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
    }
  }
`

const PostWrapper = styled.div`
  .fa-tag{
    
    display:inline;
    margin-right: .5rem;
  }

  .post-date-tags {
    color: #aaaaaa;
  }

  hr {
    border: 0.5px solid #eee;
    margin: 2rem 0;
  }
  .post-taglist {
    display: inline;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .post-tags {
    display: block;
  }
  .post-tag {
    font-size: 0.9rem;
    color: #969696;
    margin-right: 0.2em;
    transition: ${transition};
    /* float: left; */

    &:hover {
      color: #000000;
      transition: ${transition};
    }
  }
  li {
    display: inline;
  }

  .content {
    line-height: 1.8rem;

    &:first-letter {
      font-weight: bold;
      font-size: 2rem;
      margin-right: 0.5rem;
    }
  }
`

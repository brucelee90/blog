import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

export default function CategoryDropDown() {
  // Funktion, um alle doppelten Werte aus Array zu entfernen
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index
  }

  const uniqueCategories = data => {
    const hash = {}
    data.allWordpressPost.edges.forEach((edges, i) => {
      hash[edges.node.categories[0].slug] = edges.node.categories[0].name
    })

    return Object.keys(hash).map(key => {
      console.log(hash[key])
      return (
        <Link
          style={{ textDecoration: 'none', color: 'black' }}
          to={`/categories/${key}/`}
        >
          <div className="dropdown-item">{hash[key]}</div>
        </Link>
      )
    })
  }
  return (
    <StaticQuery
      query={graphql`
        {
          allWordpressPost {
            edges {
              node {
                categories {
                  name
                  slug
                }
              }
            }
          }
        }
      `}
      render={data => <div>{uniqueCategories(data)}</div>}
    />
  )
}

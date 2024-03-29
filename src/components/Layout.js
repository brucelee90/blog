import React from 'react'
import Helmet from 'react-helmet'
import Navbar from './Navbar'
// import Navbar from './public/Navbar'

import './all.sass'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Blog | leeklopfers.de" />
    <Navbar />
    <div>{children}</div>
  </div>
)

export default TemplateWrapper

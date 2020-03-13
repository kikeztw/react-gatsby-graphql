import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import footerStyles from "./footer.module.scss"

export default () =>{

  const data = useStaticQuery(graphql`
    query{
      site{
        siteMetadata{
          author
        }
      }
    }
  `)

  return(
    <footer className={footerStyles.siteFooter}>
      <div className={footerStyles.container}>
        <p>
          Site developed by {data.site.siteMetadata.author}
          {" "}
          {new Date().getFullYear().toString()}{" "}
        </p>
      </div>
    </footer>
  )
}
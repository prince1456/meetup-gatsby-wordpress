import { Card, Carousel, Layout, List, Typography } from "antd"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as React from "react"
import { stripHtml } from "string-strip-html"
import LayoutComponent from "../components/layout"
import SEO from "../components/seo"
import "./styles.css"
const { Paragraph } = Typography
const { Content } = Layout

const slideContainer = {
  position: "relative",
}
const content = {
  position: "absolute",
  backgroundColor: "rgba(0,0,0, 0.5)",
  padding: "50px 10px",
  right: 0,
  top: 0,
  height: "100%",
  width: "30%",
  color: "white",
}

const IndexPage = ({ data: { allWpPost } }) => {
  return (
    <LayoutComponent>
      <SEO title="Home" />
      <header>
        <Carousel>
          {allWpPost.nodes.map((node, index) => {
            console.log(node)
            return (
              <div key={index}>
                <div style={slideContainer}>
                  <GatsbyImage
                    className=""
                    image={
                      node.featuredImage.node.localFile.childImageSharp
                        .gatsbyImageData
                    }
                  />
                  <div style={content}>
                    <h1>{node.title}</h1>
                    <h5>
                      {node.date} <span>{node.author?.node?.firstName}</span>
                    </h5>
                  </div>
                </div>
              </div>
            )
          })}
        </Carousel>
      </header>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            dataSource={allWpPost.nodes}
            renderItem={item => (
              <List.Item>
                <Link to={`/${item.slug}`}>
                  <Card
                    hoverable
                    style={{ width: "100%" }}
                    cover={
                      <GatsbyImage
                        image={
                          item.featuredImage.node.localFile.childImageSharp
                            .gatsbyImageData
                        }
                      />
                    }
                    title={item.title}
                  >
                    <Paragraph
                      ellipsis={{
                        rows: 3,
                      }}
                    >
                      {stripHtml(item.excerpt).result}
                    </Paragraph>
                  </Card>
                </Link>
              </List.Item>
            )}
          />
        }
      </Content>
    </LayoutComponent>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allWpPost(sort: { fields: [date] }) {
      nodes {
        author {
          node {
            firstName
          }
        }
        title
        excerpt
        slug
        date(formatString: "MMMM Do, YYYY")
        featuredImage {
          node {
            sourceUrl
            localFile {
              childImageSharp {
                gatsbyImageData(width: 920)
              }
            }
          }
        }
      }
    }
  }
`

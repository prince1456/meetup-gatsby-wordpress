import { graphql } from "gatsby"
import { Space, Row, Col, Avatar, Typography } from "antd"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import LayoutComponent from "../components/layout"
const { Text } = Typography
export default function BlogPost({ data: { wpPost } }) {
  console.log(wpPost)
  const { title, featuredImage, author, date, content} = wpPost
  return (
    <LayoutComponent>
      <h1>{title}</h1>
      <Row justify="space-between">
        <Col>
          <Space>
            <Avatar src={author.node?.avatar?.url} />
            <Text strong>
              {author.node?.firstName} {author.node?.lastName}
            </Text>
          </Space>
        </Col>
        <Col>
          <Space>
            <Text strong>Published At</Text>
            <Text>{date}</Text>
          </Space>
        </Col>
      </Row>
      <GatsbyImage
        style={{ width: "100%" }}
        image={featuredImage.node?.localFile.childImageSharp?.gatsbyImageData}
      />
      <div dangerouslySetInnerHTML={{__html: content}}/>
    </LayoutComponent>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    wpPost(slug: { eq: $slug }) {
      author {
        node {
          firstName
          lastName
          username
          avatar {
            url
          }
        }
      }
      content
      date(formatString: "LLL")
      slug
      tags {
        nodes {
          name
          slug
        }
      }
      title
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`

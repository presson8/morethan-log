import React from "react"
import styled from "@emotion/styled"
import { renderMarkdown } from "src/libs/markdown"

type Props = {
  content: string
}

const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  return (
    <StyledWrapper
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  )
}

export default MarkdownRenderer

const StyledWrapper = styled.div`
  color: ${({ theme }) => theme.colors.gray12};
  font-size: 1rem;
  line-height: 1.85;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.colors.gray12};
    font-weight: 700;
    line-height: 1.35;
    margin: 2rem 0 0.8rem;
  }

  h1 { font-size: 1.7rem; }
  h2 { font-size: 1.4rem; }
  h3 { font-size: 1.2rem; }

  p { margin: 1rem 0; }
  ul,
  ol { padding-left: 1.5rem; }
  li { margin: 0.35rem 0; }
  blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.gray8};
    color: ${({ theme }) => theme.colors.gray10};
    margin: 1.25rem 0;
    padding-left: 1rem;
  }
  code {
    background: ${({ theme }) => theme.colors.gray6};
    border-radius: 0.35rem;
    font-size: 0.9em;
    padding: 0.15rem 0.35rem;
  }
  pre {
    background: ${({ theme }) => theme.colors.gray2};
    border-radius: 0.75rem;
    overflow-x: auto;
    padding: 1rem;
  }
  pre code {
    background: transparent;
    padding: 0;
  }
  a {
    text-decoration: underline;
    text-underline-offset: 0.18em;
  }
  img {
    border-radius: 0.75rem;
    height: auto;
    max-width: 100%;
  }
  hr {
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.gray7};
    margin: 2rem 0;
  }
`

import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="128" cy="128" r="128" /> 
    <circle cx="106" cy="154" r="14" /> 
    <rect x="0" y="272" rx="10" ry="10" width="246" height="31" /> 
    <rect x="0" y="316" rx="10" ry="10" width="244" height="77" /> 
    <rect x="-1" y="404" rx="10" ry="10" width="106" height="33" /> 
    <rect x="119" y="402" rx="25" ry="25" width="124" height="37" />
  </ContentLoader>
)

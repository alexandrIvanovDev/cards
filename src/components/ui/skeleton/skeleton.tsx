import ContentLoader from 'react-content-loader'

type Props = {
  className?: string
}

export const Skeleton = ({ className }: Props) => (
  <ContentLoader
    speed={0.7}
    backgroundColor="#ababab"
    foregroundColor="#ecebeb"
    className={className}
  >
    <rect x="0" y="1" rx="0" ry="0" width="80" height="50" />
  </ContentLoader>
)

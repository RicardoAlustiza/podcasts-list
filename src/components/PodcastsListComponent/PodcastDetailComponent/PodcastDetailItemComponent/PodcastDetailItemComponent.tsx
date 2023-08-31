import { Link } from "react-router-dom"
import { PodcastDetailsResult } from "../../../../types/podcastDetailType"
import { format } from "date-fns"

interface Props {
  detail: PodcastDetailsResult
  index: number
  podcastHeader: PodcastDetailsResult
  podcastSummary: string
  podcastTitle: string
  podcastImg: string
}

const formatMilliseconds = (duration: number) => {

  return !isNaN(duration) ? new Date(duration).toISOString().slice(11, 19) : '00:00:00'
}

export const PodcastDetailItemComponent = ({detail, index, podcastHeader, podcastSummary, podcastTitle, podcastImg}: Props) => {
  const backgroundColor = index % 2 === 0 ? '#e4e4e4' : '#fff'

  return (
    <tr style={{ backgroundColor: backgroundColor}}>
      <td>
        <Link to={`/podcast/${podcastHeader.collectionId}/episode/${detail.trackId}`}
        state={{ podcastSummary: podcastSummary, podcastTitle: podcastTitle, podcastImg: podcastImg,
        trackName: detail.trackName, trackDescription: detail.description, episodeURL: detail.episodeUrl }}>
          { detail.trackName }
        </Link>
      </td>
      <td>
        { format(new Date(detail.releaseDate), 'dd/MM/yyyy') }
      </td>
      <td>
        { formatMilliseconds(detail.trackTimeMillis) }
      </td>
    </tr>
  )
}
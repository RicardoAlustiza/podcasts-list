import { Link } from "react-router-dom"
import { Entry } from "../../../types/podcastsListType"

interface Props {
  podcast: Entry
}

export const PodcastItemComponent = ({podcast}: Props) => {
  return (
    <div className='podcast-card'>
      <Link to={`/podcast/${podcast.id.attributes['im:id']}`}
      state={{ podcastSummary: podcast.summary.label, podcastTitle: podcast.title.label, podcastImg: podcast['im:image'][2].label}}>
        <div className="podcast-card__card">
          <div className="podcast-card__img-container">
            <img className="podcast-card__img" src={ podcast['im:image'][2].label }/>
          </div>
          <div className="podcast-card__text-container">
            <p className="podcast-card__title">
              { podcast['im:name'].label.toUpperCase() }
            </p>
            <p className="podcast-card__author">
              Author: { podcast['im:artist'].label.toUpperCase() }
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
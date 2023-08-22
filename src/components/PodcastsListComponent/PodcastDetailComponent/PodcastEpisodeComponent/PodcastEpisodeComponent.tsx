import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import './PodcastEpisodeComponent.css'

export const PodcastEpisodeComponent = () => {

  const [podcastId, setPodcastId] = useState<string>('')
  const location = useLocation()
  const { podcastSummary, podcastTitle, podcastImg } = location.state as { podcastSummary: string, podcastTitle: string, podcastImg: string }
  
  useEffect(() => {
    const podcastId = window.location.pathname.split('/')[2]

    setPodcastId(podcastId)
  }, [])

  return (
    <div className="podcast-episode-component">
      <div className="podcast-episode__container">
        <div className="podcast-episode__description">
          <div className="podcast-episode__description-card">
            <div className="episode-card__img">
              <Link to={`/podcast/${podcastId}`}
              state={{ podcastSummary: podcastSummary, podcastTitle: podcastTitle, podcastImg: podcastImg}}>
                <img src={ podcastImg } />
              </Link>
            </div>
            <div className="episode-card__title">
              <Link to={`/podcast/${podcastId}`}
              state={{ podcastSummary: podcastSummary, podcastTitle: podcastTitle, podcastImg: podcastImg}}>
                <p>{ podcastTitle }</p>              
              </Link>
            </div>
            <div className="episode-card__description">
              <p className="episode-title">Description:</p>
              <p className="episode-content">{ podcastSummary }</p>
            </div>
          </div>
        </div>
        <div className="podcast-episode__current">
          <div className="podcast-episode__current-card">
            <div className="episode__card-title">
              Episode Title
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
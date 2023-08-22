import { useEffect, useState } from "react"
import { type PodcastDetailsResult } from "../../../podcastDetailType"
import './PodcastDetailComponent.css'
import { Link, useLocation } from "react-router-dom"
import { SpinnerComponent } from "../../shared/SpinnerComponent/SpinnerComponent"

const formatMilliseconds = (duration: number) => {
  const minutes = Math.floor(duration / 60000)
  const seconds = ((duration % 60000) / 1000).toFixed(0)

  return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`
}

const formatDate = (date: Date) => {
  const dateObj = new Date(date)
  const day = dateObj.getDate()
  const month = dateObj.getMonth()
  const year = dateObj.getFullYear()

  return `${day}/${month}/${year}`
}

const isDayPassed = (podcastId: string) => {
  if(localStorage.getItem(`firstLoadPodcastDetailDate${podcastId}`) !== null) {
    if(localStorage.getItem('firstLoadPodcastsListDate') !== null) {
      const now = Date.now()
      const oneDay = 24 * 60 * 60 * 1000
      const createdAt = Date.parse(localStorage.getItem(`firstLoadPodcastDetailDate${podcastId}`) as string)
  
      if(now - createdAt > oneDay) {
        return true
      }
      return false
    }
    return true
  }
}

const fetchPodcast = async (podcastId: string) => {
  if(localStorage.getItem(`firstLoadPodcastDetail${podcastId}`) !== null && !isDayPassed(podcastId)) {

    return JSON.parse(localStorage.getItem(`firstLoadPodcastDetail${podcastId}`) as string)
  }
  else {
    return (
      await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`)
        .then(async res => {
          if (!res.ok) throw new Error('Error en la petición')
          return await res.json()
        })
        .then(res => {
          let firstLoadDate = new Date()
          localStorage.setItem(`firstLoadPodcastDetail${podcastId}`, JSON.stringify(res.results))
          localStorage.setItem(`firstLoadPodcastDetailDate${podcastId}`, firstLoadDate.toDateString())

          return res.results
        })
    )    
  }
}

export const PodcastDetailComponent = () => {

  const [podcastDetails, setPodcastDetails] = useState<PodcastDetailsResult[]>([])
  const [podcastHeader, setPodcastHeader] = useState({} as PodcastDetailsResult)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const location = useLocation()
  const { podcastSummary, podcastTitle, podcastImg } = location.state as { podcastSummary: string, podcastTitle: string, podcastImg: string }

  useEffect(() => {
    setIsLoading(true)
    const podcastId = window.location.pathname.split('/')[2]

    fetchPodcast(podcastId)
      .then(podcastDetails => {
        const podcastHeader = podcastDetails.shift()

        setPodcastHeader(podcastHeader)
        setPodcastDetails(podcastDetails)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      { isLoading && <SpinnerComponent/>}
      <div className="podcast-details-component">
        <div className="podcast-details__container">
          <div className="podcast-details__description">
            <div className="podcast-details__description-card">
              <div className="description-card__img">
                <img src={ podcastImg } />
              </div>
              <div className="description-card__title">
                <p>{ podcastTitle }</p>
              </div>
              <div className="description-card__description">
                <p className="description-title">Description:</p>
                <p className="description-content">{ podcastSummary }</p>
              </div>
            </div>
          </div>
          <div className="podcast-details__episodes-list">
            <div className="podcast-details__episodes-list-card">
              <div className="episodes-count">
                Episodes: { podcastDetails.length }
              </div>
              <table className="episodes-list-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody className="episodes-list">
                  { podcastDetails.map((detail, index) => {
                    const backgroundColor = index % 2 === 0 ? '#e4e4e4' : '#fff'

                    return (
                      <tr key={ detail.episodeGuid ? detail.episodeGuid : detail.trackId } style={{ backgroundColor: backgroundColor}}>
                        <td>
                          <Link to={`/podcast/${podcastHeader.collectionId}/episode/${detail.trackId}`}
                          state={{ podcastSummary: podcastSummary, podcastTitle: podcastTitle, podcastImg: podcastImg}}>
                            { detail.trackName }
                          </Link>
                        </td>
                        <td>
                          { formatDate(detail.releaseDate) }
                        </td>
                        <td>
                          { formatMilliseconds(detail.trackTimeMillis) }
                        </td>
                      </tr>
                    )
                    }) 
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
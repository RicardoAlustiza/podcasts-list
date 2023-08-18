import { useEffect, useState } from "react"
import { type PodcastDetailsResult } from "../../../podcastDetailType"
import './PodcastDetailComponent.css'
import { useLocation } from "react-router-dom"

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
  const location = useLocation()
  const { podcastSummary, podcastTitle, podcastImg } = location.state as { podcastSummary: string, podcastTitle: string, podcastImg: string }

  useEffect(() => {
    const podcastId = window.location.pathname.split('/')[2]

    fetchPodcast(podcastId)
      .then(podcastDetails => {
        podcastDetails.shift()

        setPodcastDetails(podcastDetails)
      })
      .catch(err => console.log(err))
  }, [])

  return (
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
            <div className="episodes-list">
              { podcastDetails.map(detail => {
                return (
                  <div key={ detail.episodeGuid ? detail.episodeGuid : detail.trackId }>
                    <p>{ detail.trackName } - { formatDate(detail.releaseDate) } - { formatMilliseconds(detail.trackTimeMillis) }</p>
                  </div>
                )
                }) 
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
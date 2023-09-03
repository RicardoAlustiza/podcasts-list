import { useEffect, useState } from "react"
import { type PodcastDetailsResult } from "../../../types/podcastDetailType"
import './PodcastDetailComponent.css'
import { useLocation } from "react-router-dom"
import { SpinnerComponent } from "../../shared/SpinnerComponent/SpinnerComponent"
import { PodcastDetailItemComponent } from "./PodcastDetailItemComponent/PodcastDetailItemComponent"
import { fetchPodcast } from "../../../services/utils.services"

export const PodcastDetailComponent = () => {

  const [podcastDetails, setPodcastDetails] = useState<PodcastDetailsResult[]>([])
  const [podcastHeader, setPodcastHeader] = useState({} as PodcastDetailsResult)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const location = useLocation()

  if(!location.state) {
    window.location.href = '/'
  }

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
                      return <PodcastDetailItemComponent key={ detail.episodeGuid ? detail.episodeGuid : detail.trackId }
                      detail={detail} index={index} podcastHeader={podcastHeader}
                      podcastSummary={podcastSummary} podcastTitle={podcastTitle} podcastImg={podcastImg}/>
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
import { useEffect, useState } from "react"
import { type PodcastDetailsResult } from "../../../podcastDetailType"

const fetchPodcast = async (podcastId: string) => {
  return (
    await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`)
      .then(async res => {
        if (!res.ok) throw new Error('Error en la petición')
        return await res.json()
      })
      .then(res => {
        return res.results
      })
  )
}

export const PodcastDetailComponent = () => {

  const [podcastDetails, setPodcastDetails] = useState<PodcastDetailsResult[]>([])

  useEffect(() => {
    const podcastId = window.location.pathname.split('/')[2]

    fetchPodcast(podcastId)
      .then(podcastDetails => setPodcastDetails(podcastDetails))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>{ podcastDetails.map(detail => {
      return (
        <div>
          <p>{ detail.trackName }</p>
        </div>
      )
      }) 
    }
    </div>
  )
}
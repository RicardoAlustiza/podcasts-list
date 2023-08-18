import { useMemo, useState } from 'react'
import { type Entry } from '../../types'
import { Link } from "react-router-dom";
import './PodcastsListComponent.css'

interface Props {
  podcasts: Entry[]
}

export const PodcastListComponent = ({ podcasts }: Props) => {
  const [filterPodcast, setFilterPodcast] = useState<string | null>(null)

  const filteredPodcasts = useMemo(() => {
    if(filterPodcast !== null && filterPodcast.length > 0) {
      if(podcasts.filter(podcast => podcast['im:name'].label.toLowerCase().includes(filterPodcast.toLowerCase())).length > 0) {
        return podcasts.filter(podcast => podcast['im:name'].label.toLowerCase().includes(filterPodcast.toLowerCase()))
      }
      else if(podcasts.filter(podcast => podcast['im:artist'].label.toLowerCase().includes(filterPodcast.toLowerCase())).length > 0) {
        return podcasts.filter(podcast => podcast['im:artist'].label.toLowerCase().includes(filterPodcast.toLowerCase()))
      }
      else {
        return []
      }
    }
    return podcasts
  }, [filterPodcast, podcasts])

  return (
    <>
      <div>
        <h1 className="main-title">Postify: Your podcasts App</h1>
        <span className="filtered-list-lenght">{ filteredPodcasts.length }</span>
        <input type="text" placeholder="Search podcast" onChange={(e) => setFilterPodcast(e.target.value)} />
      </div>
      <div className="podcasts-list">
        { filteredPodcasts.map(podcast => {
          return (
              <div key={podcast.id.attributes['im:id']} className='podcast-card'>
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
          })
        }
      </div>
    </>
  )
}
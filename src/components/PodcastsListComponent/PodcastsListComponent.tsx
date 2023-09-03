import { useEffect, useMemo, useState } from 'react'
import { type Entry } from '../../types/podcastsListType'
import './PodcastsListComponent.css'
import { PodcastItemComponent } from './PodcastItemComponent/PodcastItemComponent';
import { SpinnerComponent } from '../shared/SpinnerComponent/SpinnerComponent';
import { fetchPodcasts } from '../../services/utils.services';

export const PodcastListComponent = () => {

  const [podcasts, setPodcasts] = useState<Entry[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
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

  useEffect(() => {
    setIsLoading(true)
  
    fetchPodcasts()
      .then(podcasts => setPodcasts(podcasts))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      { isLoading && <SpinnerComponent/>}
      <div>
        <h1 className="main-title">Postify: Your podcasts App</h1>
        <div className="filter-list-container">
          <span className="filtered-list-lenght">{ filteredPodcasts.length }</span>
          <input type="text" placeholder="Search podcast" onChange={(e) => setFilterPodcast(e.target.value)} />          
        </div>
      </div>
      <div className="podcasts-list">
        { filteredPodcasts.map(podcast => {
            return <PodcastItemComponent key={podcast.id.attributes['im:id']} podcast={podcast}/>
          })
        }
      </div>
    </>
  )
}
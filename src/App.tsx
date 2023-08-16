import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { type Entry } from './types'
import { PodcastListComponent } from './components/PodcastsListComponent/PodcastsListComponent'
import { HeaderComponent } from './components/HeaderComponent/HeaderComponent'

const isDayPassed = () => {
  if(localStorage.getItem('firstLoadPodcastsListDate') !== null) {
    const now = Date.now()
    const oneDay = 24 * 60 * 60 * 1000
    const createdAt = Date.parse(localStorage.getItem('firstLoadPodcastsListDate') as string)

    if(now - createdAt > oneDay) {
      return true
    }
    return false
  }
  return true
}

const fetchPodcasts = async () => {
  if (localStorage.getItem('firstLoadPodcastsList') !== null && !isDayPassed()) {

    return JSON.parse(localStorage.getItem('firstLoadPodcastsList') as string)
  }
  else {
    return (
      await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
        .then(async res => {
          console.log(res.ok, res.status)

          if (!res.ok) throw new Error('Error en la petición')
          return await res.json()
        })
        .then(res => {
          let firstLoadDate = new Date()
          localStorage.setItem('firstLoadPodcastsList', JSON.stringify(res.feed.entry))
          localStorage.setItem('firstLoadPodcastsListDate', firstLoadDate.toDateString())

          return res.feed.entry
        })
    )    
  }
}

export const App = () => {

  const [podcasts, setPodcasts] = useState<Entry[]>([])
  const [filterPodcast, setFilterPodcast] = useState<string | null>(null)

  useEffect(() => {
    fetchPodcasts()
      .then(podcasts => setPodcasts(podcasts))
      .catch(err => console.log(err))
  }, [])

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
      <HeaderComponent />
      <main>
        <div>
          <h1 className="main-title">Postify: Your podcasts App</h1>
          { filteredPodcasts.length } <input type="text" placeholder="Search podcast" onChange={(e) => setFilterPodcast(e.target.value)} />    
        </div>
        <PodcastListComponent podcasts={filteredPodcasts} />        
      </main>
    </>
  )
}

export default App

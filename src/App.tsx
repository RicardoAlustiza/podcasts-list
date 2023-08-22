import { useEffect, useState } from 'react'
import './App.css'
import { type Entry } from './types'
import { PodcastListComponent } from './components/PodcastsListComponent/PodcastsListComponent'
import { HeaderComponent } from './components/HeaderComponent/HeaderComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PodcastDetailComponent } from './components/PodcastsListComponent/PodcastDetailComponent/PodcastDetailComponent'
import { PodcastEpisodeComponent } from './components/PodcastsListComponent/PodcastDetailComponent/PodcastEpisodeComponent/PodcastEpisodeComponent'

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

  useEffect(() => {
    fetchPodcasts()
      .then(podcasts => setPodcasts(podcasts))
      .catch(err => console.log(err))
  }, [])

  return (
    <BrowserRouter>
      <HeaderComponent />
      <main>
        <Routes>
          <Route path={'/'} element={<PodcastListComponent podcasts={podcasts} />}/>
          <Route path={'/podcast/:id'} element={<PodcastDetailComponent />} />
          <Route path={'/podcast/:podcastId/episode/:episodeId'} element={<PodcastEpisodeComponent />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

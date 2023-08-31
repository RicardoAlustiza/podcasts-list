import { useEffect, useState } from 'react'
import './App.css'
import { type Entry } from './types/podcastsListType'
import { PodcastListComponent } from './components/PodcastsListComponent/PodcastsListComponent'
import { HeaderComponent } from './components/HeaderComponent/HeaderComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PodcastDetailComponent } from './components/PodcastsListComponent/PodcastDetailComponent/PodcastDetailComponent'
import { PodcastEpisodeComponent } from './components/PodcastsListComponent/PodcastDetailComponent/PodcastEpisodeComponent/PodcastEpisodeComponent'
import { SpinnerComponent } from './components/shared/SpinnerComponent/SpinnerComponent'
import { isYesterday } from 'date-fns'

const fetchPodcasts = async () => {
  if (localStorage.getItem('firstLoadPodcastsList') !== null && !isYesterday(Date.parse(localStorage.getItem('firstLoadPodcastsListDate') as string))) {

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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
  
    fetchPodcasts()
      .then(podcasts => setPodcasts(podcasts))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <BrowserRouter>
      <HeaderComponent/>
      <main>
        { isLoading && <SpinnerComponent/>}
        <Routes>
          <Route path={'/'} element={<PodcastListComponent podcasts={podcasts}/>}/>
          <Route path={'/podcast/:id'} element={<PodcastDetailComponent/>}/>
          <Route path={'/podcast/:podcastId/episode/:episodeId'} element={<PodcastEpisodeComponent/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

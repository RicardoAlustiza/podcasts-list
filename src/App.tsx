import './App.css'
import { PodcastListComponent } from './components/PodcastsListComponent/PodcastsListComponent'
import { HeaderComponent } from './components/HeaderComponent/HeaderComponent'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PodcastDetailComponent } from './components/PodcastsListComponent/PodcastDetailComponent/PodcastDetailComponent'
import { PodcastEpisodeComponent } from './components/PodcastsListComponent/PodcastDetailComponent/PodcastEpisodeComponent/PodcastEpisodeComponent'

const App = () => {

  return (
    <BrowserRouter>
      <HeaderComponent/>
      <main>
        <Routes>
          <Route path={'/'} element={<PodcastListComponent/>}/>
          <Route path={'/podcast/:id'} element={<PodcastDetailComponent/>}/>
          <Route path={'/podcast/:podcastId/episode/:episodeId'} element={<PodcastEpisodeComponent/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

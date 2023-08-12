import { useEffect, useState } from 'react'
import './App.css'
import { type Entry } from './types'
import { PodcastListComponent } from './components/PodcastsListComponent'

const fetchPodcasts = async () => {
  return (
    await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
      .then(async res => {
        console.log(res.ok, res.status)

        if (!res.ok) throw new Error('Error en la petición')
        return await res.json()
      })
      .then(res => res.feed.entry)
  )
}

function App() {

  const [podcasts, setPodcasts] = useState<Entry[]>([])

  useEffect(() => {
    fetchPodcasts()
      .then(podcasts => setPodcasts(podcasts))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h1>Postify: your podcasts app</h1>
      <PodcastListComponent podcasts={podcasts} />
    </div>
  )
}

export default App

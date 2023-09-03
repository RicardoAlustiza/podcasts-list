import { isYesterday } from "date-fns"

export const fetchPodcasts = async () => {
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

export const fetchPodcast = async (podcastId: string) => {
  if(localStorage.getItem(`firstLoadPodcastDetail${podcastId}`) !== null && !isYesterday(Date.parse(localStorage.getItem(`firstLoadPodcastDetailDate${podcastId}`) as string))) {

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
          let firstLoadDate = Date.now()
          localStorage.setItem(`firstLoadPodcastDetail${podcastId}`, JSON.stringify(res.results))
          localStorage.setItem(`firstLoadPodcastDetailDate${podcastId}`, firstLoadDate.toString())

          return res.results
        })
    )    
  }
}
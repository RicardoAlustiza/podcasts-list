import { type Entry } from '../types'

interface Props {
  podcasts: Entry[]
}

export const PodcastListComponent = ({ podcasts }: Props) => {
  return (
    <div>
      { podcasts.map(podcast => {
        return (
          <div key={podcast.id.attributes['im:id']}>{ podcast['im:artist'].label }</div>
        )
        })
      }
    </div>
  )
}
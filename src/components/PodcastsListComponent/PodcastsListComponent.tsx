import { type Entry } from '../../types'
import './PodcastsListComponent.css'

interface Props {
  podcasts: Entry[]
}

export const PodcastListComponent = ({ podcasts }: Props) => {
  return (
    <div className="podcasts-list">
      { podcasts.map(podcast => {
        return (
          <div key={podcast.id.attributes['im:id']} className='podcast-card'>
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
          </div>
        )
        })
      }
    </div>
  )
}
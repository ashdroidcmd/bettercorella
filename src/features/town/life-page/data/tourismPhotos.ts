import type { StaticImageData } from 'next/image'
import fiestaImage from '../../../../assets/tourism/events/nuestra.jpg'
import foundingImage from '../../../../assets/tourism/events/municipal-hall.jpg'
import greenThumbFarm from '../../../../assets/tourism/spots/green-thumb.jpg'
import churchImage from '../../../../assets/tourism/spots/nuestra-senora-del-villar-church.jpg'
import tarsierSanctuary from '../../../../assets/tourism/spots/philippine-tarsier-sanctuary.jpg'

// Photos live in src/assets/tourism/ (see the README there). Import a photo, then map its record's slug to it.

export interface TourismPhoto {
  image: StaticImageData
  alt: string
  /** Photographer or owner, e.g. "Photo: Juan dela Cruz". Shown on the photo when set. */
  credit?: string
  creditUrl?: string
  /** CSS object-position for the 16:9 crop, e.g. 'center 20%' to keep a face in frame. */
  position?: string
}

export const spotPhotos: Record<string, TourismPhoto> = {
  'philippine-tarsier-sanctuary': {
    image: tarsierSanctuary,
    alt: 'A Philippine tarsier with large round eyes clinging to a branch against green leaves',
  },
  'nuestra-senora-del-villar-church': {
    image: churchImage,
    alt: 'The white church of Our Lady of the Village with its bell tower, arched entrance and garden plaza',
    position: 'center 60%',
  },
  'green-thumb-farm': {
    image: greenThumbFarm,
    alt: 'The painted "Green Thumb Alfresco Resto" mural with mushrooms, behind a garden and wooden benches',
  },
}

export const eventPhotos: Record<string, TourismPhoto> = {
  'town-fiesta-nuestra-senora-del-villar': {
    image: fiestaImage,
    alt: 'The image of Nuestra Señora del Villar in a gold-embroidered robe and crown, in front of the church',
    position: 'center 20%',
  },
  'adlaw-sa-corella': {
    image: foundingImage,
    alt: 'Corella Municipal Hall, shown as it is today and in a design for the new building',
    position: 'center 35%',
  },
}

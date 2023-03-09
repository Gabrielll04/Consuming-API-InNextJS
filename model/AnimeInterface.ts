export type MultipleItensResponse = {
  data: {
    Page: {
      media: Anime[]
    }
  }
}

export type SingleItemResponse = {
  data: {
    Media: DetailedAnime
  }
}

type AnimeTitle = {
  romaji: string,
  english?: string,
  native?: string
}

export interface Anime {
  id: number,
  title: AnimeTitle,
  genres: string[],
  episodes: number,
  averageScore: number,
}

interface StudioNodes {
  name: string
}

export interface DetailedAnime {
  id: number,
  title: AnimeTitle,
  genres: string[],
  episodes: number,
  averageScore: number,
  description: string,
  status: string,
  studios: {
    nodes: StudioNodes[]
  },
  bannerImage: string, 
}

export interface AnimeItemOnLocalStorage {
    id: number,
    title: string,
    description: string,
    bannerImage: string
}

export interface CardProps {
  media: Anime
}
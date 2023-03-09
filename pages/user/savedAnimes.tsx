import { useEffect, useState } from 'react'
import AnimeCard from '@/components/AnimeCard'
import { AnimeItemOnLocalStorage } from '@/model/AnimeInterface'

export function unsaveLocalStorage(animeToDelete: AnimeItemOnLocalStorage) {
  const animeListUnparsed: string | null = localStorage.getItem('saved-anime')
  if (animeListUnparsed === null) {
    return
  }
  const animeList = JSON.parse(animeListUnparsed)
  const updatedAnimeList = animeList.filter((anime: AnimeItemOnLocalStorage) => anime.title !== animeToDelete.title)
  localStorage.setItem('saved-anime', JSON.stringify(updatedAnimeList))
}

export function loadLocalStorage(setAnimeList: Function) {
  const animeListUnparsed: string | null = localStorage.getItem('saved-anime')
  if (animeListUnparsed === null) {
    return
  }
  const animeList = JSON.parse(animeListUnparsed)
  setAnimeList(animeList)
}

export default function SavedAnimes() {
  const [animeList, setAnimeList] = useState<AnimeItemOnLocalStorage[]>([])

  useEffect(() => {
    loadLocalStorage(setAnimeList)

  }, [setAnimeList])
  console.log(animeList)
  return (
    <div className='flex flex-col items-center w-screen h-screen p-14 space-y-4'>
      {animeList && animeList?.map((anime: AnimeItemOnLocalStorage) => (
        <div key={anime.id}>
          <AnimeCard media={anime} />
        </div>
      ))}
      {(!animeList || animeList.length === 0) && (
        <span className='text-3xl font-bold text-zinc-600'>{`There's`} nothing yet</span>
      )}
    </div>
  )
}
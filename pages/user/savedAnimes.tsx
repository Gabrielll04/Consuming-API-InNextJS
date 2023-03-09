import { useEffect, useState } from 'react'
import AnimeCard from '@/components/AnimeCard'

export function unsaveLocalStorage(animeToDelete: any) {
  const animeListUnparsed: any = localStorage.getItem('saved-anime-name')
  const animeList = JSON.parse(animeListUnparsed)
  const updatedAnimeList = animeList.filter((anime: any) => anime.title !== animeToDelete.title)
  localStorage.setItem('saved-anime-name', JSON.stringify(updatedAnimeList))
}

export function loadLocalStorage(setAnimeList: any) {
  const animeListUnparsed: any = localStorage.getItem('saved-anime-name')
  const animeList = JSON.parse(animeListUnparsed)
  setAnimeList(animeList)
}

export default function SavedAnimes() {
  const [animeList, setAnimeList] = useState<any[]>([])

  useEffect(() => {
    loadLocalStorage(setAnimeList)

  }, [setAnimeList])

  return (
    <div className='flex flex-col items-center w-screen h-screen p-14 space-y-4'>
      {animeList && animeList?.map((anime: any) => (
        <div key={anime.id}>
          <AnimeCard media={anime} />
        </div>
      ))}
      { !animeList || !animeList.length &&   (
        <span className='text-3xl font-bold text-zinc-600'>There's nothing yet</span>
      )}
    </div>
  ) 
}
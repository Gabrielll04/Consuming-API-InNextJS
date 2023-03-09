import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BiError } from 'react-icons/bi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Card from '../components/Card'

import { Anime, MultipleItensResponse } from '@/model/AnimeInterface'

export default function App() {
  const [media, setMedia] = useState<Anime[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<boolean>(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setErrorMsg(false)
        const response = await axios.post<MultipleItensResponse>('https://graphql.anilist.co/api/v2/', {
          query: `
                query {
                    Page(page: 1, perPage: 15) {
                        media (type: ANIME, sort: POPULARITY_DESC) {
                            id
                            title {
                                romaji
                            }
                            genres
                            episodes
                            averageScore
                        }
                    }
                }`,
        })
        setMedia(response.data.data.Page.media)//isso já é um array, por isso não precisa de spread operator.
        setLoading(false)
      } catch (error) {
        setErrorMsg(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [setMedia])

  if (loading) {
    return (
      <div className='flex justify-center items-center w-screen h-screen'>
        <AiOutlineLoading3Quarters className='animate-spin transition font-bold text-9xl' />
      </div>
    )
  }
  return (
    <div className='flex flex-col w-full'>
      <header className='w-full h-56 bg-green-400'></header>
      <section className='flex justify-center flex-wrap p-14 gap-10 w-full h-full'>
        {media && media.map((media: Anime) => (
          <Card media={media} key={media.id} />
        ))}
        {errorMsg && (
          <div className='flex flex-col justify-center items-center'>
            <BiError size={200} className='text-bold text-yellow-400' />
            <span className='font-bold text-2xl'>Ocorreu erro ao carregar o conteúdo, tente novamente</span>
          </div>
        )}
      </section>
    </div>
  )
}
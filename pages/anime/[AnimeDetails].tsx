import { useEffect, useState, Fragment } from 'react'
import { useRouter } from "next/router"
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BsThreeDotsVertical, BsBookmarkPlus } from 'react-icons/bs'
import { Menu, Transition } from '@headlessui/react'
import axios from 'axios'

export default function AnimeDetails() {
  const [media, setMedia] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()

  function saveLocalStorage() {
    const loadLocalStorage: any = localStorage.getItem('saved-anime-name')
    const loadedLocalStorage = JSON.parse(loadLocalStorage)
    const anime = { id: media.id, title: media.title.romaji, description: media.description, bannerImage: media.bannerImage }
    const animeList = loadedLocalStorage !== null ? [...loadedLocalStorage, anime] : [anime]
    localStorage.setItem('saved-anime-name', JSON.stringify(animeList))
  }

  useEffect(() => {
    async function FetchData() {
      try {
        setLoading(true)
        const response = await axios.post('https://graphql.anilist.co/api/v2/', {
          query: `
            query($title: String) {
              Media(type: ANIME, search: $title) {
                id
                title {
                  romaji,
                  native
                }
                genres
                episodes
                averageScore
                description
                status
                studios {
                  nodes {
                    name
                  }
                }
                bannerImage
                startDate {
                  year
                }
              }
            }
            `,
          variables: {
            title: router.query.AnimeDetails
          }
        })
        setMedia(response.data.data.Media)
        setLoading(false)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    FetchData()
  }, [router.query.AnimeDetails])

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }

  function MyDropdown() {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-zinc-600 hover:bg-zinc-600">
            <BsThreeDotsVertical className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-zinc-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => { saveLocalStorage() }}
                    className={classNames(
                      active ? ' bg-zinc-600' : 'text-white',
                      'flex w-full items-center px-4 py-2 text-sm space-x-1'
                    )}
                  >
                    <BsBookmarkPlus size={16} /><span>save anime</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }

  if (loading) {
    return (
      <div className='flex flex-col justify-center items-center w-screen h-screen space-y-8'>
        <AiOutlineLoading3Quarters className='animate-spin transition font-bold text-9xl' />
        <span className='font-bold text-2xl'>Carregando</span>
      </div>
    )
  }
  if (error) {
    return (
      <div className='flex justify-center items-center w-screen h-screen'>
        <span className='font-bold text-2xl'>Error</span>
      </div>
    )
  }

  return (
    <>
      {
        media && (
          <div className='sm:flex sm:flex-col sm:items-center sm:w-full h-full'>
            <section className='flex flex-col w-full h-44 justify-center items-center space-y-2 bg-svg bg-zinc-700 shadow-2xl'>
              <span className='font-bold text-4xl'>{media.title.romaji}</span>
              <span className='font-bold text-2xl'>{media.title.native}</span>
              <div className='flex flex-row space-x-4'>
                {media.genres.map((item: string, index: number) => (
                  <div key={index} className='flex flex-row'>
                    <span className='bg-green-400 text-xs font-bold text-black px-1 rounded-2xl'>{item}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className='sm:flex sm:w-full p-10 sm:flex-col items-center space-y-7'>
              <article className='flex self-end my-10 mr-32 '>
                <MyDropdown />
              </article>
              <article className='flex'>
                <img className='w-96' src={media.bannerImage}></img>
              </article>
              <article className='flex flex-col w-[43.75rem] p-7 border border-zinc-700 rounded-2xl items-center overflow-hidden flex-wrap'>
                <span className='text-2xl self-center'>Description</span>
                <span className='text-center'>{media.description}</span>
              </article>
              <article className='flex flex-col w-[43.75rem] p-7 border border-zinc-700 rounded-2xl items-center overflow-hidden flex-wrap space-y-2'>
                <span className='text-2xl self-center'>More informations</span>
                <span>Score: {media.averageScore}</span>
                <span>Episodes: {media.episodes}</span>
                <div className='flex flex-col items-center space-y-1'>
                  <span className='font-bold text-xl'>Studios</span>
                  {media.studios.nodes.map((studioName: any, index: number) => (
                    <span key={index}>{studioName.name}</span>
                  ))}
                </div>
              </article>
            </section>
          </div>
        )
      }
    </>
  )
}
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { unsaveLocalStorage } from '@/pages/user/savedAnimes'
import Link from 'next/link'


export default function AnimeCard({ media }: any) {

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }

  function Dropdown() {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex z-10 w-8 h-8 justify-center items-center rounded-md font-semibold text-white ring-zinc-600 hover:bg-zinc-600">
            <BsThreeDotsVertical className="text-lg" aria-hidden="true" />
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
          <Menu.Items className="absolute mt-2 w-56 origin-left rounded-md bg-zinc-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => { unsaveLocalStorage(media) }}
                    className={classNames(
                      active ? ' bg-zinc-600' : 'text-white',
                      'flex w-full items-center px-4 py-2 text-sm space-x-1'
                    )}
                  >
                    <span>unsave anime</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }

  return (
    <div style={{ backgroundImage: `url(${media.bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: 'inset 0 -70px 90px -6px black' }} className='flex border border-white w-[36rem] h-24 rounded-xl px-2 pb-1 cursor-pointer transition ease-in-out hover:-translate-y-1'>
      <Link href={`/anime/${media.title}`} className='w-full h-full'>
        <span className="font-bold self-end">{media.title}</span>
      </Link>
      <button className='flex justify-center items-center rounded-lg self-end ml-auto w-6 h-6 transition hover:bg-zinc-800'><Dropdown /></button>
    </div>
  )
}
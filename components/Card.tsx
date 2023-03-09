import Link from 'next/link'

import { CardProps} from '@/model/AnimeInterface'

export default function Card({ media }: CardProps) {
    return (
        <Link href={`anime/${media.title.romaji}`} key={media.id} className='flex flex-col font-bold text-white w-64 h-52 border border-zinc-700 rounded-2xl overflow-hidden transition delay-120 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-5 cursor-pointer'>
            <div className='flex flex-col w-full h-full'>
            <span className='text-base pl-3 text-sky-400 font-light'>Genres: {media.genres.join(', ')}</span>
                <span className='text-base pl-3 text-green-400 font-light'>Episodes: {media.episodes}</span>
                <span className='text-base pl-3 text-violet-400 font-light'>Score: {media.averageScore}</span>
                <span className='flex text-xl items-center pl-3 w-full h-14 overflow-hidden'>{media.title.romaji}</span>
            </div>
        </Link>
    )
}
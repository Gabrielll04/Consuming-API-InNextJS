import Link from 'next/link'
import { SiBitrise } from 'react-icons/si'
import { BiHomeSmile } from 'react-icons/bi'
import { BiUser } from 'react-icons/bi'
import { SlSettings } from 'react-icons/sl'
export default function SideBar() {

    return (
        <div className='sm:flex sm:flex-col sm:fixed sm:items-center sm:w-16 sm:min-h-screen bg-[#313133] shadow-2xl'>
            <section className='flex flex-col h-full p-1 space-y-3'>
                <div className='flex justify-center items-center h-10 w-12 font-bold text-3xl'><SiBitrise /></div>
                <div className='self-center w-11 h-[1px] bg-zinc-600'></div>
                <Link href='/' className='sideBarButton'><BiHomeSmile /></Link >
                <Link href ='/user/savedAnimes' className='sideBarButton'><BiUser /></Link>
                <div className='sideBarButton'><SlSettings /></div>
            </section>
        </div>
    )
}
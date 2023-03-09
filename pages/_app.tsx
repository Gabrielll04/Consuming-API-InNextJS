import '../styles/globals.css'
import SideBar from '../components/SideBar'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='flex flex-row'>
      <SideBar />
      <Component {...pageProps} />
    </div>
  )
}

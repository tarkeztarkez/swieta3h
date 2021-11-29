import type { NextPage } from 'next'
import YouTube from '../components/Youtube';
import { getYoutubeId } from '../lib/getYoutubeId';

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const videoUrl = "https://www.youtube.com/watch?v=N-PyWfVkjZc&ab_channel=ShakinStevensVEVO"
    
  return (
    <div className={styles.container}>
        <YouTube url={videoUrl} />
    </div>
  )
}

export default Home

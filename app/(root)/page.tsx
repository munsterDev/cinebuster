import HeroSection from '@/components/HeroSection'
import VideoPlayer from '@/components/VideoPlayer';
import { db } from '@/database/drizzle'
import { movies } from '@/database/schema'
import { Movie } from '@/types';
import { desc, eq } from "drizzle-orm";
import React from 'react'

const Home = async () => {
  const popular = (await db
                        .select()
                        .from(movies)
                        .limit(5)
                        .orderBy(desc(movies.popularity))) as Movie[];
  return (
    <div>
      <HeroSection movies={popular}/>
   </div>
  )
}

export default Home
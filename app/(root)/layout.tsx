import { auth } from '@/auth';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { after } from 'next/server';
import Header from "@/components/header/Header"
import React from 'react'
import { ReactNode } from 'react'
import Footer from '@/components/footer/Footer';
import AppSidebar  from '@/components/sidebar/AppSidebar';

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  /*
  if (!session) {
    redirect('/sign-in');
  }
    */

  after( async () => {
    if(!session?.user?.id) return;

    // Get user and see if lastActivityDate is today
    const user = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);

    if(user[0].lastActivityDate === new Date().toISOString().slice(0,10)) return;

    await db.update(users).set({lastActivityDate: new Date()
      .toISOString().slice(0,10)})
      .where(eq(users.id, session.user.id));
  })
  return (
      <main className='' suppressHydrationWarning>
        <div className="">
            <Header session={session!}/>
            {children}
        </div>
      </main>
  );
}

export default Layout
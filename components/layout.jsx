import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const name = 'Jared';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {
  const { data: session } = useSession();
  return (
    <div>
      <div className={utilStyles.login}>
        {session && (
          <>
            <div className={utilStyles.username}>{session.user.name}</div>
            <Image 
              src={"https://avatars.githubusercontent.com/u/38025637?v=4"}
              className={utilStyles.borderCircle}
              height={32}
              width={32}
              alt={"User Image"}
            />
            <button className={utilStyles.loginButton} onClick={() => signOut()}>Logout</button>
          </>
        )}
        {!session && (
          <>
            <button className={utilStyles.loginButton} onClick={() => signIn()}>Login</button>
          </>
        )}
      </div>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle,
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <Image
                src="/images/profile.jpeg"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <>
              <Link href="/">
                <a>
                  <Image
                    priority
                    src="/images/profile.jpeg"
                    className={utilStyles.borderCircle}
                    height={108}
                    width={108}
                    alt={name}
                  />
                </a>
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>{name}</a>
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

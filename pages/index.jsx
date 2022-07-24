import Head from 'next/head';
import Script from 'next/script';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../util/posts';
import Link from 'next/link';
import Date from '../components/date';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home({ allPostsData }) {
  if (typeof window !== "undefined" && window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    })
  }

  const { data: session } = useSession();

  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Script 
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      />
      <section className={utilStyles.headingMd}>
        <p className='text-blue-600'>Hi, I'm Jared</p>
      </section>
      <section className={utilStyles.navbar}>
        <Link href="/todo">
          <a>Todo</a>
        </Link>
        <Link href="/map">
          <a>Map</a>
        </Link>
        {session && <>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </>}
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  let allPostsData = getSortedPostsData();
  // Fix JSON serialization error for date object
  allPostsData = JSON.parse(JSON.stringify(allPostsData));
  return {
    props: { allPostsData }
  }
}
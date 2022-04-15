import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from "next/head"
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

// This is how to get content for each generated page
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
}

// This is all pages that will be generated for this dynamic link
export async function getStaticPaths() {
    const paths = getAllPostIds()
    // console.log(paths)
    return {
      paths,
      fallback: false
    }
}

// This is the component that goes to render
export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    )
  }
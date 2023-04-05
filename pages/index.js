import Head from 'next/head'
import Layout from '../components/Layout'
import Image from 'next/image'

import Link from 'next/link'
import { db } from '../firebase'
import { useState } from 'react'

export default function Home({ allblogs }) {
  // console.log(allblogs)
  const [blogs, setblogs] = useState(allblogs ?? [])
  const [end, setEnd] = useState(false)
  const loadMore = async () => {
    const last = blogs[blogs.length - 1]
    const res = await db.collection('blogs')
      .orderBy('createdAt', 'desc')
      .startAfter(new Date(last.createdAt))
      .limit(3)
      .get()
    const newblogs = res.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toMillis(),
        id: docSnap.id
      }
    })
    setblogs(blogs.concat(newblogs))

    if (newblogs.length < 3) {
      setEnd(true)
    }
  }

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase()
    const filteredBlogs = allblogs.filter(blog => blog.title.toLowerCase().includes(searchQuery))
    setblogs(filteredBlogs)
  }

  return (
    <>
      <Layout>
        <div className="hero">
          <div className="mid-inner">
            <h1>Welcome to </h1>
            <h5>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, doloribus!</h5>
          </div>
        </div>

        <div className="container">
            <div className="row mb-4">
              <div className="col-lg-8 col-md-10 col-12 mx-auto">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title"
                    aria-label="Search by title"
                    aria-describedby="search-btn"
                    onChange={handleSearch}
                  />
                  <button className="btn btn-primary" type="button" id="search-btn">Search</button>
                </div>
              </div>
              </div>
              </div>

        <div className="blog">
          <div className="container">
            <div className="row">
            <div className="col-lg-6 col-md-8 col-12  mx-auto " >
              {
                blogs?.map((val, ind) => {
                  return (
                    <>

                     
                        <div className="card mb-5" key={ind}>
                          <img
                            src={val.imageUrl}
                            alt={val.title}
                            className="bimg"

                          />
                        {/* <Image
                          src={val.imageUrl}
                          alt={val.title}
                          width={100}
                          height={300}
                        /> */}

                          <div className="p-2">
                            <h3>{val.title}</h3>
                            <p>{val.desc}</p>
                            <div className="text-center">
                              <Link href={`/blog/${val.id}`}><a className="btn btn-success"> Read More </a></Link>
                            </div>
                          </div>

                        </div>
                      
                    </>
                  )
                })
              }
              </div>
            </div>

            <div className="text-center">
              {
                end ? <h5 className="text-center">No Data</h5>
                  : <button className="btn btn-dark" onClick={loadMore}>Load More</button>
              }
            </div>


          </div>
        </div>

      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await db.collection('blogs').orderBy('createdAt', 'desc').limit(3).get()




  const allblogs = res.docs.map(snap => {
    return {
      ...snap.data(),
      createdAt: snap.data().createdAt.toMillis(),
      id: snap.id
    }
  })

  return {
    props: {
      allblogs
    }
  }


}
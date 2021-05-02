import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Layout from '../src/Layout/Layout'
import Navbar from '../src/Layout/Navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Layout>
      <Navbar header="Dashboard" />
    </Layout>
  )
}

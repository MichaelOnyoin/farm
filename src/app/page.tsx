import SpreadsheetViewer from '@/components/SheetViewer'
import Hero from '@/components/Landing'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Form from '@/components/Form'

export default function Home() {
  
  return (
    <main className="mx-auto w-full bg-white">
      <Header/>
      <Hero />
      <Form />
      <SpreadsheetViewer type={'spray'} />
      <SpreadsheetViewer type={'fertilizer'} />
      <Footer/>
    </main>
  )
}

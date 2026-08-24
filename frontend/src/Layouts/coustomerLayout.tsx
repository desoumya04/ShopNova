import {Outlet} from 'react-router-dom'
import Navbar from '../coustomer/Navbar/Navbar'
import Footer from '../coustomer/components/Footer/Footer'

const coustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default coustomerLayout
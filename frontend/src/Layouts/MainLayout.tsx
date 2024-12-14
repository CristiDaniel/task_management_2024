import { Outlet } from 'react-router-dom';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

export default function MainLayout() {
  return (
    <>
    <Header />
    <main><Outlet /></main>
    <Footer/>
    </>
  )
}

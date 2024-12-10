import { Outlet } from 'react-router-dom';
import Header from '../LayoutComponents/Header';

export default function MainLayout() {
  return (
    <>
    <Header />
    <main><Outlet /></main>
    <footer>Footer</footer>
    </>
  )
}

import React from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
    <header>Task Management Project</header>
    <main><Outlet /></main>
    <footer>Footer</footer>
    </>
  )
}

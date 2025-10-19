// src/components/layout/AppShell.tsx
import { Outlet } from 'react-router-dom';
import Topmast from './Topmast';

export default function AppShell() {
  return (
    <>
      <Topmast />
      <Outlet />
    </>
  );
}

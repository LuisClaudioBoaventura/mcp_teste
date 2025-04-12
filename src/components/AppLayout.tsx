'use client';

import { ReactNode, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useStore } from '@/store/useStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { isSidebarCollapsed, setSidebarCollapsed } = useStore();

  useEffect(() => {
    const handleResize = () => {
      setSidebarCollapsed(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarCollapsed]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex">
        <AnimatePresence>
          <motion.div
            initial={{ x: isSidebarCollapsed ? -240 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Sidebar />
          </motion.div>
        </AnimatePresence>
        
        <motion.div
          className="content flex-1 p-8"
          animate={{
            marginLeft: isSidebarCollapsed ? '80px' : '256px'
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
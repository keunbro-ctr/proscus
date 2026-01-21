'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports to prevent SSR issues
const DesktopLanding = dynamic(() => import('@/components/landing/DesktopLanding'), {
  ssr: false,
});

const MobileLanding = dynamic(() => import('@/components/landing/MobileLanding'), {
  ssr: false,
});

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 초기 화면 크기 체크
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px = md breakpoint
    };

    checkMobile();
    setIsLoading(false);

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 로딩 중에는 스켈레톤 UI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        <MobileLanding />
      ) : (
        <DesktopLanding />
      )}
    </>
  );
}
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// 타입 정의
type MenuItem = 
  | { label: string; href: string; hasSubmenu?: false }
  | { 
      label: string; 
      hasSubmenu: true; 
      submenu: { label: string; href: string }[] 
    };

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Drawer 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems: MenuItem[] = [
    { label: 'HOME', href: '/' },
    { 
      label: '회사소개', 
      hasSubmenu: true,
      submenu: [
        { label: '회사소개', href: '/about' },
        { label: '오시는 길', href: '/about/location' }
      ]
    },
    { label: '업무영역', href: '/services' },
    { label: '블로그', href: '/blog' },
  ];

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-5 flex items-center">
              <img
                src="https://ai.esmplus.com/secretbro/rect2.png"
                alt="PROS"
                className="h-full w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <span className="text-xs font-medium text-slate-900">
              관세사무소
            </span>
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="메뉴 열기"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <span className="w-full h-0.5 bg-slate-900 rounded-full transition-transform"></span>
              <span className="w-full h-0.5 bg-slate-900 rounded-full transition-transform"></span>
              <span className="w-full h-0.5 bg-slate-900 rounded-full transition-transform"></span>
            </div>
          </button>
        </div>
      </header>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] animate-fadeIn"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200">
          <span className="text-lg font-semibold text-slate-900">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="메뉴 닫기"
          >
            <svg
              className="w-5 h-5 text-slate-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col p-4 gap-1">
          {menuItems.map((item, idx) => (
            <div key={item.label}>
              {item.hasSubmenu ? (
                <>
                  <button
                    onClick={() => setAboutExpanded(!aboutExpanded)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all ${
                      isOpen ? 'animate-slideInRight' : ''
                    }`}
                    style={{
                      animationDelay: `${idx * 50}ms`,
                    }}
                  >
                    <span className="font-medium">{item.label}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        aboutExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  
                  {/* Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      aboutExpanded ? 'max-h-40' : 'max-h-0'
                    }`}
                  >
                    <div className="ml-4 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium transition-all ${
                    isOpen ? 'animate-slideInRight' : ''
                  }`}
                  style={{
                    animationDelay: `${idx * 50}ms`,
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* CTA Button */}
          <Link
            href="https://open.kakao.com/o/sfMApAbi"
            className={`mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl ${
              isOpen ? 'animate-slideInRight' : ''
            }`}
            style={{
              animationDelay: `${menuItems.length * 50}ms`,
            }}
            onClick={() => setIsOpen(false)}
          >
            <span>상담 신청하기</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </nav>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </>
  );
}

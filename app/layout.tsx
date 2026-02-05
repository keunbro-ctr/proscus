'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MobileHeader from '@/components/landing/MobileHeader';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <html lang="ko">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-white text-slate-900`}
      >
        {/* 조건부 헤더 렌더링 */}
        {mounted && (
          <>
            {isMobile ? (
              <MobileHeader />
            ) : (
              /* PC 헤더 */
              <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                  <Link href="/" className="flex items-center gap-3 group">
                    <img
                      src="https://ai.esmplus.com/secretbro/rect2.png"
                      alt="PROS"
                      className="h-8 transition-transform group-hover:scale-105"
                    />
                    <span className="text-lg font-medium text-slate-900">
                      관세사무소
                    </span>
                  </Link>

                  <nav className="flex items-center gap-10 text-[15px] font-medium text-slate-600">
                    <Link
                      href="/"
                      className="hover:text-slate-900 transition-colors"
                    >
                      HOME
                    </Link>

                    {/* 회사소개 드롭다운 */}
                    <div className="relative group h-full flex items-center">
                      <button className="flex items-center gap-1 hover:text-slate-900 transition-colors py-4">
                        회사소개
                        <svg
                          className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:rotate-180 transition-transform duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0">
                        <div className="pt-3">
                          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl ring-1 ring-black/5">
                            <div className="p-2 space-y-1">
                              <Link
                                href="/about"
                                className="block rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                              >
                                <span className="block font-semibold">
                                  회사소개
                                </span>
                                <span className="text-xs text-slate-400 font-normal">
                                  프로스의 철학
                                </span>
                              </Link>
                              <Link
                                href="/about/location"
                                className="block rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                              >
                                <span className="block font-semibold">
                                  오시는 길
                                </span>
                                <span className="text-xs text-slate-400 font-normal">
                                  위치 안내
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/services"
                      className="hover:text-slate-900 transition-colors"
                    >
                      업무영역
                    </Link>
                    <Link
                      href="https://blog.naver.com/dream1403"
                      className="hover:text-slate-900 transition-colors"
                    >
                      블로그
                    </Link>
                  </nav>

                  <Link
                    href="https://open.kakao.com/o/sfMApAbi"
                    className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    상담 신청
                  </Link>
                </div>
              </header>
            )}
          </>
        )}

        {/* Page Content */}
        <main className="flex-1 bg-white">{children}</main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-slate-50 py-16">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 mb-10">
              {/* 왼쪽: 로고 및 사업자 정보 */}
              <div>
                <img
                  src="https://ai.esmplus.com/secretbro/rect2.png"
                  alt="PROS"
                  className="h-6 opacity-80 grayscale mb-6"
                />
                <div className="space-y-2 text-sm text-slate-500 leading-relaxed">
                  <p>
                    <span className="font-semibold text-slate-700 mr-2">
                      대표자
                    </span>{' '}
                    김준성
                    <span className="mx-2 text-slate-300">|</span>
                    <span className="font-semibold text-slate-700 mr-2">
                      사업자등록번호
                    </span>{' '}
                    244-25-02033
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700 mr-2">
                      주소
                    </span>
                    서울특별시 중구 서소문로 89, 17층 BD-1710호
                  </p>
                </div>
              </div>

              {/* 오른쪽: 연락처 정보 */}
              <div className="md:text-right flex flex-col justify-end">
                <div className="space-y-1 text-sm text-slate-500">
                  <p>
                    <span className="font-semibold text-slate-700 w-12 inline-block md:text-right mr-2">
                      TEL
                    </span>
                    0505-055-2324
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700 w-12 inline-block md:text-right mr-2">
                      FAX
                    </span>
                    0505-065-2324
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700 w-12 inline-block md:text-right mr-2">
                      Email
                    </span>
                    keunbro@customs.pro
                  </p>
                </div>
              </div>
            </div>

            {/* 하단: Copyright 및 약관 링크 */}
            <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <div>© 2024 프로스 관세사무소. All rights reserved.</div>
              <div className="flex gap-6">
                <Link
                  href="#"
                  className="hover:text-slate-600 transition-colors"
                >
                  개인정보처리방침
                </Link>
                <Link
                  href="#"
                  className="hover:text-slate-600 transition-colors"
                >
                  이용약관
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function cn(...s: (string | false | null | undefined)[]) {
  return s.filter(Boolean).join(' ');
}

// Intersection Observer 훅
function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isInView };
}

export default function DesktopLanding() {
  const heroRef = useInView();
  const servicesRef = useInView();
  const processRef = useInView();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [showProgress, setShowProgress] = useState(true);

  // 3D 애니메이션 (부드러운 떠다니는 효과)
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const cards = scene.querySelectorAll('.floating-card');

    const animateCards = () => {
      cards.forEach((card, index) => {
        const element = card as HTMLElement;
        const time = Date.now() * 0.0008;
        const offset = index * 0.5;

        // 부드러운 3D 효과 (간격 조정됨)
        const x = Math.sin(time + offset) * 55;
        const y = Math.cos(time + offset * 1.2) * 35;
        const rotateX = Math.sin(time + offset) * 15;
        const rotateY = Math.cos(time + offset * 0.8) * 20;
        const scale = 1 + Math.sin(time + offset * 0.5) * 0.08;

        element.style.transform = `
          translate3d(${x}px, ${y}px, 0)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale(${scale})
        `;
      });

      requestAnimationFrame(animateCards);
    };

    animateCards();
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div
          ref={heroRef.ref}
          className="container mx-auto px-6"
          style={{
            opacity: heroRef.isInView ? 1 : 0,
            transform: heroRef.isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          {/* Badge */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm text-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
              Customs by Professional Standards
            </div>
          </div>

          {/* Title with Gradient */}
          <h1 className="mx-auto max-w-4xl text-center text-5xl md:text-6xl lg:text-7xl font-medium leading-tight md:leading-[1.3] tracking-tight mb-8">
            <div>관세·무역 실무</div>
            <div className="mt-2 md:mt-4">
              <span className="bg-gradient-to-r from-slate-900 via-slate-500 to-slate-300 bg-clip-text text-transparent">
                프로답게
              </span>{' '}
              해결합니다
            </div>
          </h1>

          {/* Description - Korean */}
          <p className="mx-auto max-w-2xl text-center text-lg text-slate-600 mb-2 leading-relaxed">
            처음 수입을 시작하는 개인사업자부터
            <br />
            수출입 구조를 정비하려는 중견기업까지.
            <br />
            규모와 상황에 맞춘 실무 대응.
          </p>

          {/* Description - English */}
          <p className="mx-auto max-w-2xl text-center text-sm text-slate-500 mb-10 leading-relaxed">
            From individual importers to mid-sized enterprises.
            <br />
            Tailored customs solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link
              href="https://open.kakao.com/o/sfMApAbi"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 transition-all"
            >
              상담 신청하기
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50 transition-all"
            >
              업무영역 보기
            </Link>
          </div>

          {/* 3D Graphics Scene */}
          <div className="relative mx-auto max-w-5xl h-96 lg:h-[500px] mb-12 flex items-center justify-center">
            <div
              ref={sceneRef}
              className="relative w-full h-full transform-gpu origin-center transition-transform duration-300 scale-[0.8] sm:scale-[0.8] md:scale-[0.9] lg:scale-[1]"
              style={{ perspective: '1000px' }}
            >
              {/* Central Hub - PROS 로고 */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 lg:z-20">
                {/* Outer Glow Rings */}
                <div
                  className="absolute inset-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-pulse-slow"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(148, 163, 184, 0.4) 0%, rgba(148, 163, 184, 0.2) 30%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />

                {/* Logo Container */}
                <div
                  className="relative w-36 h-36 rounded-[2.5rem] flex items-center justify-center transition-all duration-500 hover:scale-105 group"
                  style={{
                    background:
                      'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
                  }}
                >
                  {/* P Logo */}
                  <div className="w-20 h-20 relative">
                    <img
                      src="https://ai.esmplus.com/secretbro/rect3.png"
                      alt="PROS"
                      className="w-full h-full object-contain relative z-10"
                      style={{
                        filter: `
                          brightness(1.3)
                          contrast(1.1)
                          drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))
                          drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))
                          drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))
                          drop-shadow(0 0 16px rgba(59, 130, 246, 0.2))
                          drop-shadow(0 0 24px rgba(59, 130, 246, 0.1))
                        `,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Floating Service Cards */}
              {/* 수출입 통관 */}
              <div className="floating-card z-10 absolute top-8 left-8 w-40 h-28 bg-white border border-slate-200 rounded-2xl shadow-lg p-4 transform-gpu overflow-hidden hover:shadow-2xl hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-slate-100 to-transparent rounded-bl-3xl opacity-50"></div>
                <div className="relative text-sm font-medium mb-1 text-slate-900">
                  수출입 통관
                </div>
                <div className="relative text-xs text-slate-500 leading-relaxed">
                  리스크 진단 우선
                </div>
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                </div>
              </div>

              {/* 품목분류(HS) */}
              <div className="floating-card z-10 absolute top-16 right-8 w-36 h-28 bg-white border border-slate-200 rounded-2xl shadow-lg p-4 transform-gpu overflow-hidden hover:shadow-2xl hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer">
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-slate-50 to-transparent rounded-full opacity-60"></div>
                <div className="relative text-sm font-medium mb-1 text-slate-900">
                  품목분류(HS)
                </div>
                <div className="relative text-xs text-slate-500 leading-relaxed">
                  사전 검토 필수
                </div>
                <div className="absolute bottom-2 left-2 h-0.5 w-8 bg-gradient-to-r from-slate-400 to-transparent"></div>
              </div>

              {/* FTA 컨설팅 */}
              <div className="floating-card z-10 absolute bottom-8 left-4 w-44 h-32 bg-white border border-slate-200 rounded-2xl shadow-lg p-4 transform-gpu overflow-hidden hover:shadow-2xl hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer">
                <div className="absolute top-2 right-2 w-12 h-12 border border-slate-100 rounded-full opacity-40"></div>
                <div className="relative text-sm font-medium mb-1 text-slate-900">
                  FTA 컨설팅
                </div>
                <div className="relative text-xs text-slate-500 leading-relaxed">
                  원산지 판정부터 검증 대응까지
                </div>
                <div className="absolute bottom-2 right-2 grid grid-cols-2 gap-1">
                  <div className="w-2 h-2 bg-slate-200 rounded"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded"></div>
                </div>
              </div>

              {/* 관세 환급 */}
              <div className="floating-card z-10 absolute bottom-12 right-8 w-38 h-32 bg-white border border-slate-200 rounded-2xl shadow-lg p-4 transform-gpu overflow-hidden hover:shadow-2xl hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer">
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-tl from-slate-100 to-transparent rounded-full opacity-40"></div>
                <div className="relative text-sm font-medium mb-1 text-slate-900">
                  관세 환급
                </div>
                <div className="relative text-xs text-slate-500 leading-relaxed">
                  가능성 검토부터 서류 준비까지
                </div>
                <div className="absolute top-2 right-2 text-xs text-slate-300 font-bold">
                  ₩
                </div>
              </div>

              {/* 관세조사 대응 */}
              <div className="floating-card z-10 absolute top-12 right-1/4 w-40 h-32 bg-white border border-slate-200 rounded-2xl shadow-lg p-4 transform-gpu overflow-hidden hover:shadow-2xl hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                <div className="relative text-sm font-medium mb-1 text-slate-900">
                  관세조사 대응
                </div>
                <div className="relative text-xs text-slate-500 leading-relaxed">
                  통보 즉시 리스크 진단
                </div>
                <div className="absolute bottom-2 left-2 flex gap-1">
                  <div className="w-1 h-3 bg-slate-200 rounded"></div>
                  <div className="w-1 h-4 bg-slate-300 rounded"></div>
                  <div className="w-1 h-2 bg-slate-200 rounded"></div>
                </div>
              </div>

              {/* 전자상거래 */}
              <div className="floating-card z-10 absolute bottom-16 left-1/4 w-36 h-28 bg-white border border-slate-200 rounded-2xl shadow-lg p-4 transform-gpu overflow-hidden hover:shadow-2xl hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer">
                <div className="absolute top-2 left-2 w-8 h-8 border-2 border-slate-100 rounded-lg opacity-30"></div>
                <div className="relative text-sm font-medium mb-1 text-slate-900">
                  전자상거래
                </div>
                <div className="relative text-xs text-slate-500 leading-relaxed">
                  온라인 판매 수입 지원
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-0.5 bg-slate-300 rounded"></div>
              </div>

              {/* 10년+ 경험 */}
              <div className="floating-card z-10 absolute top-1/3 left-1/4 w-32 h-24 bg-white border border-slate-200 rounded-2xl shadow-lg p-4 transform-gpu overflow-hidden hover:shadow-2xl hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-50"></div>
                <div className="relative text-lg font-bold text-slate-900">
                  10+년
                </div>
                <div className="relative text-xs text-slate-500">실무 경험</div>
                <div className="absolute bottom-1 right-1 text-2xl text-slate-100 font-bold">
                  +
                </div>
              </div>

              {/* 24시간 대응 */}
              <div className="floating-card z-10 absolute top-6 right-1/3 w-36 h-24 bg-white border border-slate-200 rounded-2xl shadow-lg p-4 transform-gpu overflow-hidden hover:shadow-2xl hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-slate-100 to-transparent opacity-60"></div>
                <div className="relative text-sm font-medium mb-1 text-slate-900">
                  24h 이내
                </div>
                <div className="relative text-xs text-slate-500">
                  1차 회신 보장
                </div>
                <div className="absolute bottom-2 left-2 flex gap-0.5">
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-1 h-1 bg-slate-300 rounded-full animate-pulse"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-slate-200 rounded-full animate-pulse"
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                </div>
              </div>

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient
                    id="lineGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <line
                  x1="50%"
                  y1="50%"
                  x2="20%"
                  y2="20%"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="80%"
                  y2="30%"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="25%"
                  y2="75%"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="75%"
                  y2="80%"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="35%"
                  y2="45%"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="65%"
                  y2="15%"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="30%"
                  y2="60%"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="70%"
                  y2="70%"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  opacity="0.4"
                />
              </svg>

              {/* Background Particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-slate-300 rounded-full opacity-50"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `float ${
                        2 + Math.random() * 3
                      }s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 진행 현황판 - 스티키 우상단 */}
          {showProgress && (
            <div className="fixed top-0 right-6 z-40 w-96 animate-in slide-in-from-right duration-500 hidden md:block">
              <div className="rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-sm shadow-2xl p-6">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-base font-semibold text-slate-900">
                        진행 현황
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        리스크 체크 · 다음 액션
                      </div>
                    </div>
                    <div className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      Live
                    </div>
                  </div>
                  <button
                    onClick={() => setShowProgress(false)}
                    className="rounded-lg p-1.5 hover:bg-slate-100 transition-colors flex-shrink-0"
                    aria-label="닫기"
                  >
                    <svg
                      className="w-4 h-4 text-slate-500"
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

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-4">
                    <div className="text-xs text-slate-500 mb-2">현재 이슈</div>
                    <div className="text-sm font-semibold text-slate-900 mb-3">
                      HS 분류 사전검토
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 transition-all duration-1000 ease-out"
                        style={{
                          width: heroRef.isInView ? '75%' : '0%',
                        }}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-4">
                    <div className="text-xs text-slate-500 mb-2">다음 액션</div>
                    <div className="text-sm font-semibold text-slate-900 mb-3">
                      증빙 목록 정리
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      <span className="rounded-md bg-gradient-to-r from-slate-900 to-slate-700 px-2 py-1 text-xs font-semibold text-white shadow-sm">
                        서류
                      </span>
                      <span className="rounded-md bg-gradient-to-r from-slate-700 to-slate-600 px-2 py-1 text-xs font-semibold text-white shadow-sm">
                        원산지
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-4 mb-4">
                  <div className="text-xs text-slate-500 mb-2">대응 방식</div>
                  <div className="text-sm text-slate-700 leading-relaxed">
                    리스크 진단 → 대응 설계 → 문서 정리로{' '}
                    <span className="font-semibold text-slate-900">
                      반복 비용 누수
                    </span>
                    를 줄입니다.
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg border border-slate-200 bg-white p-3 text-center hover:border-slate-900 hover:shadow-md hover:scale-105 transition-all duration-300 group cursor-default">
                    <svg
                      className="w-5 h-5 mx-auto mb-1 text-slate-700 group-hover:text-slate-900 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <div className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors">
                      24h 이내 1차 회신
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-3 text-center hover:border-slate-900 hover:shadow-md hover:scale-105 transition-all duration-300 group cursor-default">
                    <svg
                      className="w-5 h-5 mx-auto mb-1 text-slate-700 group-hover:text-slate-900 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors">
                      근거 기반 의견
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-3 text-center hover:border-slate-900 hover:shadow-md hover:scale-105 transition-all duration-300 group cursor-default">
                    <svg
                      className="w-5 h-5 mx-auto mb-1 text-slate-700 group-hover:text-slate-900 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors">
                      문서로 기록
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Summary */}
      <section ref={servicesRef.ref} className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              프로스 관세사무소
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-2">
              10년 이상의 실무 경험을 바탕으로 빠르고 정확한 대응을 제공합니다.
            </p>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Fast and accurate response based on over 10 years of practical
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-slate-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: '빠른 대응',
                subtitle: 'Quick Response',
                desc: '문의 후 24시간 이내 1차 회신\n긴급 사안 당일 대응\n실시간 진행 상황 공유',
                badge: 'Core',
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-slate-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                ),
                title: '전문 분야',
                subtitle: 'Expertise',
                desc: '화장품·건기식·전자제품\n까다로운 품목 다수 경험\n중견기업 FTA 자문 다수',
                badge: 'Pro',
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-slate-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                ),
                title: '체계적 관리',
                subtitle: 'Systematic',
                desc: '사전 리스크 진단\n체계적인 문서 관리\n재발 방지 시스템',
                badge: 'Core',
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                className="group relative p-8 rounded-2xl border border-slate-200 bg-white hover:shadow-xl transition-all duration-500 cursor-default overflow-hidden"
                style={{
                  opacity: servicesRef.isInView ? 1 : 0,
                  transform: servicesRef.isInView
                    ? 'translateY(0)'
                    : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${idx * 150}ms`,
                }}
              >
                <div className="absolute top-4 right-4 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {item.badge}
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-slate-50 group-hover:bg-slate-100 transition-all duration-500">
                    <div className="text-slate-900 transition-colors duration-500">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-slate-900 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs text-slate-400 mb-3 font-medium tracking-wider uppercase">
                    {item.subtitle}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {item.desc}
                  </p>
                </div>

                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">업무영역</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-2">
              수출입부터 사후관리까지, 필요한 시점에 필요한 만큼.
            </p>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              From import/export to post-management, as needed when needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: '수출입 통관',
                desc: '처음 수입부터 정기 거래까지, 품목과 거래 구조에 맞춘 통관 설계',
                slug: 'customs-clearance',
                icon: (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                ),
              },
              {
                title: '품목분류(HS)',
                desc: '사전 검토로 리스크 제거, 분쟁 시 논리적 대응과 유권해석 신청',
                slug: 'hs-classification',
                icon: (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                ),
              },
              {
                title: 'FTA 컨설팅',
                desc: '원산지 판정부터 검증 대응, 사후관리 체계 구축까지',
                slug: 'fta-consulting',
                icon: (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: '관세 환급',
                desc: '환급 가능성 검토부터 서류 준비까지 일괄 지원',
                slug: 'customs-refund',
                icon: (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: '관세조사 대응',
                desc: '통보 즉시 리스크 진단, 대응 시나리오와 자료 정리',
                slug: 'customs-audit',
                icon: (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
              },
              {
                title: '전자상거래 자문',
                desc: '온라인 판매 수입부터 해외진출까지 통관 구조 사전 설계',
                slug: 'ecommerce-consulting',
                icon: (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                ),
              },
            ].map((service, idx) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-2xl transition-all duration-500 overflow-hidden"
                style={{
                  opacity: servicesRef.isInView ? 1 : 0,
                  transform: servicesRef.isInView ? 'scale(1)' : 'scale(0.9)',
                  transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                    idx * 100
                  }ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/0 to-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute -right-8 -top-8 w-32 h-32 bg-slate-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150 blur-2xl" />

                <div className="relative">
                  <div className="inline-flex p-3 rounded-xl bg-slate-50 text-slate-700 group-hover:bg-slate-900 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-slate-900 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 group-hover:text-slate-900 group-hover:gap-3 transition-all">
                    자세히 보기
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef.ref} className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">진행방식</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-2">
              모든 업무는 4단계로 진행됩니다.
              <br />
              불필요한 과정 없이, 필요한 것만 명확하게.
            </p>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Every task proceeds in 4 stages. No unnecessary steps, only what's
              essential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-slate-200">
              <div
                className="h-full bg-slate-900"
                style={{
                  width: processRef.isInView ? '100%' : '0%',
                  transition: 'width 2s ease-out 0.3s',
                }}
              />
            </div>

            {[
              {
                step: '01',
                title: '상황 파악',
                desc: '품목·거래구조·현재 이슈를 듣고 핵심 리스크를 판단합니다',
                icon: (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                ),
              },
              {
                step: '02',
                title: '대응 설계',
                desc: '법령 근거와 실무 경험을 바탕으로 해결 방향을 제시합니다',
                icon: (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                ),
              },
              {
                step: '03',
                title: '실행 지원',
                desc: '서류 준비부터 세관 대응까지 필요한 단계를 직접 진행합니다',
                icon: (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
              },
              {
                step: '04',
                title: '결과 정리',
                desc: '완료 내역을 문서로 남기고 다음을 대비한 포인트를 전달합니다',
                icon: (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-lg transition-all"
                style={{
                  opacity: processRef.isInView ? 1 : 0,
                  transform: processRef.isInView
                    ? 'translateY(0)'
                    : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${idx * 200 + 500}ms`,
                }}
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 relative z-10 mb-4">
                  {item.icon}
                </div>
                <div className="text-sm font-medium text-slate-500 mb-2">
                  {item.step}
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-white to-slate-50">
        <div className="container mx-auto px-6">
          <div
            className="rounded-2xl border border-slate-200 bg-white shadow-xl p-8 md:p-10"
            style={{
              opacity: heroRef.isInView ? 1 : 0,
              transform: heroRef.isInView ? 'scale(1)' : 'scale(0.95)',
              transition: 'all 0.6s ease-out',
            }}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-3xl font-medium tracking-tight mb-3">
                  상담 신청
                </h2>
                <p className="text-slate-600 mb-6">
                  상황을 간단히 남겨주시면{' '}
                  <span className="font-medium text-slate-900">
                    24시간 이내 회신
                  </span>
                  드립니다.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['수출입 통관', 'FTA/원산지', '조사 대응', '전자상거래'].map(
                    (tag, idx) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:shadow-sm transition-all cursor-default"
                        style={{
                          opacity: heroRef.isInView ? 1 : 0,
                          transform: heroRef.isInView
                            ? 'translateY(0)'
                            : 'translateY(10px)',
                          transition: `all 0.4s ease-out ${idx * 100 + 300}ms`,
                        }}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="grid gap-3">
                <Link
                  className="group relative rounded-lg bg-slate-900 px-6 py-4 text-center text-sm font-medium text-white hover:bg-slate-800 transition-all hover:shadow-lg overflow-hidden"
                  href="https://open.kakao.com/o/sfMApAbi"
                >
                  <span
                    className="absolute inset-0 bg-white/10 pointer-events-none"
                    style={{
                      animation: 'shimmer 3s ease-in-out infinite',
                    }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    상담 문의하기
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
                  </span>
                </Link>
                <Link
                  className="rounded-lg border-2 border-slate-200 bg-white px-6 py-4 text-center text-sm font-medium text-slate-900 hover:bg-slate-50 hover:border-slate-900 transition-all hover:shadow-md"
                  href="/about"
                >
                  회사소개 보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

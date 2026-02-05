'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Intersection Observer 훅 (PC 버전에서 가져옴)
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

export default function MobileLanding() {
  const heroRef = useInView();
  const servicesRef = useInView();
  const aboutRef = useInView();
  const processRef = useInView();
  const ctaRef = useInView();

  return (
    <main className="min-h-screen bg-white text-slate-900 pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white px-5 py-12">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 via-transparent to-slate-100/50 animate-pulse-slow" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-slate-300 rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div
          ref={heroRef.ref}
          className="relative z-10 max-w-lg mx-auto text-center"
          style={{
            opacity: heroRef.isInView ? 1 : 0,
            transform: heroRef.isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-2 text-xs font-medium text-slate-700 mb-6 shadow-sm"
            style={{
              opacity: heroRef.isInView ? 1 : 0,
              transform: heroRef.isInView ? 'scale(1)' : 'scale(0.9)',
              transition: 'all 0.6s ease-out 0.2s',
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900 animate-pulse" />
            Customs by Professional Standards
          </div>

          {/* Title */}
          <h1 className="text-4xl font-semibold leading-tight tracking-tight mb-4">
            <div
              style={{
                opacity: heroRef.isInView ? 1 : 0,
                transform: heroRef.isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s ease-out 0.3s',
              }}
            >
              관세·무역 실무
            </div>
            <div
              className="mt-2"
              style={{
                opacity: heroRef.isInView ? 1 : 0,
                transform: heroRef.isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s ease-out 0.4s',
              }}
            >
              <span className="bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400 bg-clip-text text-transparent">
                프로답게
              </span>{' '}
              해결합니다
            </div>
          </h1>

          {/* Description */}
          <p
            className="text-sm text-slate-600 leading-relaxed mb-8"
            style={{
              opacity: heroRef.isInView ? 1 : 0,
              transform: heroRef.isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s ease-out 0.5s',
            }}
          >
            처음 수입을 시작하는 개인사업자부터
            <br />
            수출입 구조를 정비하려는 중견기업까지.
            <br />
            규모와 상황에 맞춘 실무 대응.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col gap-3 mb-12"
            style={{
              opacity: heroRef.isInView ? 1 : 0,
              transform: heroRef.isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s ease-out 0.6s',
            }}
          >
            <Link
              href="https://open.kakao.com/o/sfMApAbi"
              className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all overflow-hidden"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{
                  animation: 'shimmer 3s ease-in-out infinite',
                }}
              />
              <span className="relative">상담 신청하기</span>
              <svg
                className="relative h-4 w-4 transition-transform group-hover:translate-x-1"
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
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all"
            >
              업무영역 보기
            </Link>
          </div>

          {/* Logo Graphic with Floating Cards */}
          <div className="relative w-full h-80 mx-auto flex items-center justify-center">
            {/* Center Logo - Now in the back with lower z-index */}
            <div className="relative z-0">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
                  animation: 'float 4s ease-in-out infinite',
                }}
              >
                <img
                  src="https://ai.esmplus.com/secretbro/rect3.png"
                  alt="PROS"
                  className="w-14 h-14 object-contain"
                  style={{
                    filter: `
                      brightness(1.3)
                      contrast(1.1)
                      drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))
                      drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))
                      drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))
                    `,
                  }}
                />
              </div>

              {/* Glow effect */}
              <div
                className="absolute inset-0 -z-10 w-48 h-48 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                style={{
                  background: 'radial-gradient(circle at center, rgba(148, 163, 184, 0.3) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  animation: 'pulse-slow 4s ease-in-out infinite',
                }}
              />
            </div>

            {/* Floating Keyword Cards - Now with higher z-index */}
            {[
              { text: '수출입\n통관', top: '15%', left: '10%', delay: 0 },
              { text: 'HS\n분류', top: '10%', right: '15%', delay: 0.5 },
              { text: 'FTA', top: '35%', left: '5%', delay: 1 },
              { text: '관세\n환급', top: '60%', left: '8%', delay: 1.5 },
              { text: '조사\n대응', top: '25%', right: '8%', delay: 2 },
              { text: '전자\n상거래', top: '65%', right: '10%', delay: 2.5 },
              { text: '10+년', top: '50%', left: '15%', delay: 3 },
              { text: '24h', top: '45%', right: '20%', delay: 3.5 },
            ].map((card, idx) => (
              <div
                key={idx}
                className="floating-mini-card absolute z-20 bg-white rounded-xl shadow-lg border border-slate-200 px-3 py-2 text-center hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-default"
                style={{
                  top: card.top,
                  left: card.left,
                  right: card.right,
                  animation: `floatMini ${3 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${card.delay}s`,
                }}
              >
                <div className="text-xs font-semibold text-slate-900 whitespace-pre-line leading-tight">
                  {card.text}
                </div>
              </div>
            ))}

            {/* Background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-slate-300 rounded-full opacity-40"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef.ref} className="py-16 px-5 bg-white">
        <div className="max-w-lg mx-auto">
          {/* Section Header */}
          <div
            className="text-center mb-10"
            style={{
              opacity: servicesRef.isInView ? 1 : 0,
              transform: servicesRef.isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease-out',
            }}
          >
            <h2 className="text-3xl font-semibold mb-3">업무영역</h2>
            <p className="text-sm text-slate-600">
              수출입부터 사후관리까지
              <br />
              필요한 시점에 필요한 만큼
            </p>
          </div>

          {/* Service Cards */}
          <div className="space-y-4">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                title: '수출입 통관',
                desc: '처음 수입부터 정기 거래까지, 품목과 거래 구조에 맞춘 통관 설계',
                color: 'from-slate-50 to-white',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: '품목분류(HS)',
                desc: '사전 검토로 리스크 제거, 분쟁 시 논리적 대응과 유권해석 신청',
                color: 'from-slate-50 to-white',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'FTA 컨설팅',
                desc: '원산지 판정부터 검증 대응, 사후관리 체계 구축까지',
                color: 'from-slate-50 to-white',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: '관세 환급',
                desc: '환급 가능성 검토부터 서류 준비까지 일괄 지원',
                color: 'from-slate-50 to-white',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: '관세조사 대응',
                desc: '통보 즉시 리스크 진단, 대응 시나리오와 자료 정리',
                color: 'from-slate-50 to-white',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                ),
                title: '전자상거래 자문',
                desc: '온라인 판매 수입부터 해외진출까지 통관 구조 사전 설계',
                color: 'from-slate-50 to-white',
              },
            ].map((service, idx) => (
              <div
                key={service.title}
                className={`group relative p-5 rounded-2xl border border-slate-200 bg-gradient-to-br ${service.color} hover:shadow-xl transition-all duration-500 overflow-hidden`}
                style={{
                  opacity: servicesRef.isInView ? 1 : 0,
                  transform: servicesRef.isInView ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.5s ease-out ${idx * 100 + 200}ms`,
                }}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center border border-slate-100 group-hover:scale-110 group-hover:border-slate-900 transition-all duration-300">
                    {service.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold mb-1.5 group-hover:text-slate-900 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all"
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
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef.ref} className="py-16 px-5 bg-slate-50">
        <div className="max-w-lg mx-auto">
          {/* Section Header */}
          <div
            className="text-center mb-10"
            style={{
              opacity: aboutRef.isInView ? 1 : 0,
              transform: aboutRef.isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease-out',
            }}
          >
            <h2 className="text-2xl font-semibold mb-2">프로스 관세사무소</h2>
            <p className="text-sm text-slate-600">
              10년 이상의 실무 경험을 바탕으로
              <br />
              빠르고 정확한 대응을 제공합니다
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: '빠른 대응',
                subtitle: 'Quick Response',
                points: ['24시간 이내 1차 회신', '긴급 사안 당일 대응', '실시간 진행 상황 공유'],
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                title: '전문 분야',
                subtitle: 'Expertise',
                points: ['화장품·건기식·전자제품', '까다로운 품목 다수 경험', '중견기업 FTA 자문 다수'],
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: '체계적 관리',
                subtitle: 'Systematic',
                points: ['사전 리스크 진단', '체계적인 문서 관리', '재발 방지 시스템'],
              },
            ].map((feature, idx) => (
              <div
                key={feature.title}
                className="relative p-5 rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group"
                style={{
                  opacity: aboutRef.isInView ? 1 : 0,
                  transform: aboutRef.isInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease-out ${idx * 150 + 200}ms`,
                }}
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Icon */}
                  <div className="inline-flex p-2.5 rounded-xl bg-slate-50 text-slate-900 mb-3 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold mb-0.5">{feature.title}</h3>
                  <div className="text-xs text-slate-400 font-medium tracking-wider uppercase mb-3">
                    {feature.subtitle}
                  </div>

                  {/* Points */}
                  <ul className="space-y-1.5">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="flex-shrink-0 w-1 h-1 rounded-full bg-slate-400 mt-1.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef.ref} className="py-16 px-5 bg-white">
        <div className="max-w-lg mx-auto">
          {/* Section Header */}
          <div
            className="text-center mb-10"
            style={{
              opacity: processRef.isInView ? 1 : 0,
              transform: processRef.isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease-out',
            }}
          >
            <h2 className="text-3xl font-semibold mb-3">진행방식</h2>
            <p className="text-sm text-slate-600">
              모든 업무는 4단계로 진행됩니다
              <br />
              불필요한 과정 없이, 필요한 것만 명확하게
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200">
              <div
                className="h-full bg-slate-900 origin-top"
                style={{
                  transform: processRef.isInView ? 'scaleY(1)' : 'scaleY(0)',
                  transition: 'transform 1.5s ease-out 0.3s',
                }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {[
                {
                  num: '01',
                  title: '상황 파악',
                  desc: '품목·거래구조·현재 이슈를 듣고 핵심 리스크를 판단합니다',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                },
                {
                  num: '02',
                  title: '대응 설계',
                  desc: '법령 근거와 실무 경험을 바탕으로 해결 방향을 제시합니다',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  ),
                },
                {
                  num: '03',
                  title: '실행 지원',
                  desc: '서류 준비부터 세관 대응까지 필요한 단계를 직접 진행합니다',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
                {
                  num: '04',
                  title: '결과 정리',
                  desc: '완료 내역을 문서로 남기고 다음을 대비한 포인트를 전달합니다',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map((step, idx) => (
                <div
                  key={step.num}
                  className="relative flex gap-6"
                  style={{
                    opacity: processRef.isInView ? 1 : 0,
                    transform: processRef.isInView ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.5s ease-out ${idx * 200 + 500}ms`,
                  }}
                >
                  {/* Number Badge */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="text-xs font-medium text-slate-500 mb-1">{step.num}</div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef.ref} className="py-16 px-5 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-lg mx-auto">
          <div
            className="rounded-2xl border border-slate-200 bg-white shadow-xl p-8 text-center"
            style={{
              opacity: ctaRef.isInView ? 1 : 0,
              transform: ctaRef.isInView ? 'scale(1)' : 'scale(0.95)',
              transition: 'all 0.6s ease-out',
            }}
          >
            <h2 className="text-2xl font-semibold mb-3">상담 신청</h2>
            <p className="text-sm text-slate-600 mb-6">
              상황을 간단히 남겨주시면{' '}
              <span className="font-semibold text-slate-900">24시간 이내 회신</span>
              드립니다
            </p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['수출입 통관', 'FTA/원산지', '조사 대응', '전자상거래'].map((tag, idx) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
                  style={{
                    opacity: ctaRef.isInView ? 1 : 0,
                    transform: ctaRef.isInView ? 'translateY(0)' : 'translateY(10px)',
                    transition: `all 0.4s ease-out ${idx * 100 + 300}ms`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                />
                <span className="relative">상담 문의하기</span>
                <svg
                  className="relative h-4 w-4 transition-transform group-hover:translate-x-1"
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
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all"
              >
                회사소개 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes floatMini {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
          }
          25% {
            transform: translateY(-8px) translateX(4px) scale(1.05);
          }
          50% { 
            transform: translateY(-12px) translateX(0px) scale(1);
          }
          75% {
            transform: translateY(-8px) translateX(-4px) scale(1.05);
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }

        @keyframes pulse-slow {
          0%, 100% {
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

        .floating-mini-card {
          backdrop-filter: blur(8px);
        }
      `}</style>
    </main>
  );
}

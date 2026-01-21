'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';

// --- 커스텀 아이콘 (Slate 스타일 적용) ---
const ShipIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.9 5.8 2.38 8" />
    <path d="M12 10V4" />
    <path d="M8 8v1" />
    <path d="M16 8v1" />
    <rect x="10" y="2" width="4" height="2" />
  </svg>
);

const PlaneIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 12h20" />
    <path d="M13 2 9 22" />
    <path d="m15.5 15.5-3-9.5-2 2" />
    <path d="M5.5 15.5 2 12l3.5-3.5" />
    <path d="m20.5 8.5-3 9.5-2-2" />
  </svg>
);

const FileSearchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M4.5 16.5a10.6 10.6 0 0 1 0-8" />
    <path d="M18 16.5a10.6 10.6 0 0 0 0-8" />
    <path d="M4 22V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H4Z" />
    <circle cx="11.5" cy="12.5" r="2.5" />
    <path d="m13.5 14.5 2 2" />
  </svg>
);

const ScaleIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);

const GlobeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const ShieldAlertIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
// -----------------------------------------------------------

// 애니메이션 훅
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.2, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

// 스크롤 스파이 훅
function useScrollSpy(ids, offset = 150) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveId(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset]);

  return activeId;
}

export default function ServicesPage() {
  const services = [
    {
      id: 'import',
      title: '수입통관 컨설팅',
      engTitle: 'Import Clearance',
      icon: <ShipIcon className="w-6 h-6" />,
      desc: '복잡한 수입 요건 검토부터 세액 산출, 통관 이후의 관리까지 수입 프로세스의 전 과정을 완벽하게 지원합니다.',
      details: [
        '수입 신고 전 요건 구비(식품, 전기, 전파 등) 및 사전 세액 심사',
        '거래 단계별 과세가격 적정성 검토 및 잠정/확정 신고 대행',
        '긴급 화물을 위한 입항 전 신고 및 보세구역 도착 전 신고 처리',
        '수입 이후 관세조사 대비를 위한 서류 보관 및 데이터 정합성 관리',
        '다국적 기업의 특수관계자 간 거래 가격(TP) 적정성 검토',
      ],
    },
    {
      id: 'export',
      title: '수출통관 및 환급',
      engTitle: 'Export & Drawback',
      icon: <PlaneIcon className="w-6 h-6" />,
      desc: '신속한 수출 신고 처리와 더불어 관세 환급을 통한 기업의 제조 원가 절감 솔루션을 제공합니다.',
      details: [
        '수출 신고 필증 발급 및 선적 일정에 맞춘 신속 통관 처리',
        '간이정액환급 및 개별환급 시뮬레이션을 통한 환급액 극대화 전략 수립',
        '원상태 수출, 위탁 가공 무역 등 특수 거래 형태에 따른 맞춤형 신고',
        '재수입 면세 요건 검토 및 사후 관리 지원',
        '수출 실적 인정 범위 검토 및 무역 금융 연계 지원',
      ],
    },
    {
      id: 'hscode',
      title: 'HS CODE 품목분류',
      engTitle: 'HS Classification',
      icon: <FileSearchIcon className="w-6 h-6" />,
      desc: '관세 행정의 핵심인 정확한 품목분류를 통해 세율 오류로 인한 추징 리스크를 사전에 차단합니다.',
      details: [
        '신규 취급 품목에 대한 사전 HS CODE 정밀 분석 및 분류',
        '관세평가분류원 품목분류 사전심사 신청 대행 및 의견서 작성',
        'WCO(세계관세기구) 등 국제 분쟁 사례 분석을 통한 논리 개발',
        'FTA 협정별 품목분류 상이점에 따른 최적 세율 도출',
        '오류 품목분류 수정 신고 및 경정 청구 진행',
      ],
    },
    {
      id: 'consulting',
      title: '관세 · 외환 심사 자문',
      engTitle: 'Customs Valuation & Audit',
      icon: <ScaleIcon className="w-6 h-6" />,
      desc: '관세평가(Valuation)와 외환거래법 이슈를 종합적으로 진단하여 기업의 컴플라이언스 리스크를 해소합니다.',
      details: [
        'ACVA(특수관계자 과세가격 사전약정) 컨설팅 및 승인 대행',
        '로열티, 생산지원비 등 가산 요소 누락 방지를 위한 과세가격 검토',
        '외국환거래법상 자본거래, 상계, 제3자 지급 등 신고 의무 검토',
        '비가산 요소(이자비용, 구매수수료 등) 입증을 통한 관세 절감',
        '정기 법인 심사 및 기획 심사 사전 진단 (Mock Audit)',
      ],
    },
    {
      id: 'fta',
      title: 'FTA 및 원산지 관리',
      engTitle: 'FTA & Origin Management',
      icon: <GlobeIcon className="w-6 h-6" />,
      desc: '자유무역협정(FTA)의 혜택을 극대화하고, 원산지 검증 리스크에 대비하는 체계적인 시스템을 구축합니다.',
      details: [
        '품목별/협정별 원산지 결정 기준(PSR) 충족 여부 판정',
        '원산지 증명서(C/O) 발급 대행 및 인증수출자 취득 컨설팅',
        '협력업체 원산지 확인서 유통망 관리 및 교육 지원',
        '상대국 세관의 원산지 사후 검증 시 대응 논리 개발 및 소명',
        'RCEP 등 메가 FTA 활용 실익 분석 및 공급망 재편 자문',
      ],
    },
    {
      id: 'risk',
      title: '권리구제 및 리스크 대응',
      engTitle: 'Risk Management',
      icon: <ShieldAlertIcon className="w-6 h-6" />,
      desc: '부당한 과세 처분에 대한 불복 절차와 관세 형사 사건 등 위기 상황에서 고객의 권익을 보호합니다.',
      details: [
        '과세전적부심사 청구 및 심판청구 대리',
        '관세법 위반 조사 시 조사 입회 및 의견 진술',
        '밀수입, 관세포탈, 부정수입 등 관세 형사 사건 자문',
        '세관의 기업 심사 대응 전략 수립 및 현장 대응 지원',
        '행정 소송 전 단계에서의 논리 개발 및 파트너 변호사 연계',
      ],
    },
  ];

  const activeSectionId = useScrollSpy(services.map((s) => s.id));

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css"
        />
      </Head>

      <main className="bg-white text-slate-900 font-['Pretendard']">
        {/* --- 1. Header Section (메인 페이지 스타일: 이미지 배경 + 어두운 오버레이) --- */}
        {/* --- 1. Header Section (고급 그라데이션 배경) --- */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          {/* 1️⃣ 배경 이미지 (질감만 남김) */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://ai.esmplus.com/secretbro/hero-bg.jpg')",
              filter: 'grayscale(60%) contrast(105%) brightness(85%)',
              opacity: 1,
            }}
          />

          {/* 2️⃣ 메인 그라데이션 */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/85 to-slate-900/95" />

          {/* 3️⃣ 중앙 소프트 라이트 (첨부 이미지 느낌) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 50% at 50% 40%, rgba(255,255,255,0.06), transparent 70%)',
            }}
          />

          {/* 4️⃣ 하단 딥 섀도우 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.45), transparent 40%)',
            }}
          />

          {/* 기존 텍스트 컨텐츠는 그대로 */}

          {/* 배경 입자 애니메이션 (은은하게) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${
                    3 + Math.random() * 4
                  }s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-500/50 bg-slate-900/50 backdrop-blur-md">
              <span className="text-sm font-medium text-slate-300 tracking-wide uppercase">
                Our Services
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              관세 무역의{' '}
              <span className="text-slate-300 border-b-4 border-slate-600">
                모든 솔루션
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              정확한 진단과 선제적인 대응으로 귀사의 비즈니스 리스크를
              <br className="hidden md:block" />
              최소화하고 이익을 극대화합니다.
            </p>
          </div>
        </section>

        {/* --- 2. Main Content --- */}
        <div className="container mx-auto px-6 py-24">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left: Sticky Navigation (Slate 테마 적용) */}
            <aside className="hidden lg:block w-1/4 relative">
              <div className="sticky top-32 space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 px-4">
                  Service List
                </h3>
                <nav className="space-y-1 relative border-l border-slate-200 ml-4">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`#${service.id}`}
                      className={`block px-6 py-3 text-[15px] transition-all duration-300 relative ${
                        activeSectionId === service.id
                          ? 'text-slate-900 font-bold translate-x-1'
                          : 'text-slate-500 hover:text-slate-800 font-medium'
                      }`}
                    >
                      {/* Active Indicator Line */}
                      {activeSectionId === service.id && (
                        <span className="absolute left-[-1px] top-0 bottom-0 w-1 bg-slate-900 rounded-r-full" />
                      )}
                      {service.title}
                    </Link>
                  ))}
                </nav>

                {/* Contact Box (Slate Style) */}
                <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center shadow-sm">
                  <p className="text-sm text-slate-500 mb-2 font-medium">
                    바로 상담이 필요하신가요?
                  </p>
                  <p className="font-bold text-slate-900 text-xl mb-6 font-mono">
                    0505-055-2324
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full bg-slate-900 text-white py-4 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    문의하기
                  </Link>
                </div>
              </div>
            </aside>

            {/* Right: Detail Content List */}
            <div className="w-full lg:w-3/4 space-y-32">
              {services.map((service, index) => {
                const { ref, isInView } = useInView({ threshold: 0.2 });

                return (
                  <div
                    key={service.id}
                    id={service.id}
                    ref={ref}
                    className={`scroll-mt-32 transition-all duration-1000 ease-out transform ${
                      isInView
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-20'
                    }`}
                  >
                    {/* Header: Icon & Title */}
                    <div className="flex items-start gap-6 mb-8 group">
                      <div className="p-4 bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white group-hover:shadow-lg group-hover:shadow-slate-200">
                        {service.icon}
                      </div>
                      <div className="pt-1">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
                          {service.title}
                        </h2>
                        <p className="text-slate-400 font-medium text-sm tracking-widest uppercase">
                          {service.engTitle}
                        </p>
                      </div>
                    </div>

                    {/* Content Box */}
                    <div className="pl-0 md:pl-[5.5rem]">
                      {/* Description - 강조된 인용구 스타일 */}
                      <p className="text-xl text-slate-700 leading-relaxed mb-10 font-normal border-l-4 border-slate-900 pl-6 py-2 bg-gradient-to-r from-slate-50 to-transparent rounded-r-lg">
                        {service.desc}
                      </p>

                      {/* Details - 고급스러운 카드 스타일 */}
                      <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-100/50 hover:border-slate-300 transition-colors duration-300">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                          {service.details.map((detail, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-4 text-slate-700 group/item"
                            >
                              <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center transition-all group-hover/item:bg-slate-900 group-hover/item:text-white">
                                <CheckIcon className="w-3 h-3" />
                              </div>
                              <span className="text-[16px] leading-relaxed font-medium text-slate-600 group-hover/item:text-slate-900 transition-colors">
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- 3. Bottom CTA (Slate Theme) --- */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          {/* 배경 장식: 회전하는 원 (은은하게) */}
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] border border-slate-700/30 rounded-full animate-spin-slow"></div>
          <div
            className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] border border-slate-700/30 rounded-full animate-spin-slow"
            style={{ animationDirection: 'reverse' }}
          ></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
              시작부터 끝까지,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                흔들림 없는 파트너
              </span>
            </h3>
            <p className="text-slate-400 mb-12 text-lg max-w-xl mx-auto font-light">
              복잡한 관세 업무는 프로스에게 맡기시고,
              <br />
              귀사는 핵심 비즈니스의 성장에 집중하십시오.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-10 py-5 text-slate-900 text-lg font-bold hover:bg-slate-100 transition-all shadow-2xl hover:shadow-white/10 hover:-translate-y-1 transform"
            >
              전문가와 상담하기
              <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* 애니메이션 스타일 정의 */}
        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </main>
    </>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';

// --- 커스텀 아이콘 (Slate 스타일 적용) ---
const ShipIcon = ({ className }: { className?: string }) => (
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

const PlaneIcon = ({ className }: { className?: string }) => (
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

const FileSearchIcon = ({ className }: { className?: string }) => (
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

const ScaleIcon = ({ className }: { className?: string }) => (
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

const GlobeIcon = ({ className }: { className?: string }) => (
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

const ShieldAlertIcon = ({ className }: { className?: string }) => (
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

const CheckIcon = ({ className }: { className?: string }) => (
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

const ArrowRightIcon = ({ className }: { className?: string }) => (
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
function useInView(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.2, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

// 스크롤 스파이 훅
function useScrollSpy(ids: string[], offset: number = 150) {
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
      engTitle: 'Export Clearance & Refund',
      icon: <PlaneIcon className="w-6 h-6" />,
      desc: '수출통관부터 관세 환급, 상계 처리까지 전 과정을 한 번에 해결합니다.',
      details: [
        '수출 신고(일반, 간이, 위탁 등)와 관련 세관 인증 (AEO, 수출우수업체)',
        '수출용 원재료의 관세 환급/사후관리/상계 신고 및 심사 대응',
        '과세가격 신고 오류, 수출실적/내국신용장 허위 사용 등 조사 대응',
        '재수출면세, 가공무역, 용도세율 신고 등 특수통관 형태 실무 대행',
        'FTA 원산지증명서 발급 및 사후 검증 대비 교육, 컨설팅',
      ],
    },
    {
      id: 'fta',
      title: 'FTA 원산지 종합 서비스',
      engTitle: 'FTA Origin Management',
      icon: <GlobeIcon className="w-6 h-6" />,
      desc: 'FTA 혜택을 극대화하고 원산지 검증 리스크를 최소화합니다.',
      details: [
        'FTA 협정별 원산지 판정(PSR) 및 세이프가드 세율 심사',
        '품목별 특혜관세율 적용 가능 여부 검토 및 실익 분석',
        '원산지 증명서류 작성 대행 (C/O, 자율증명, 전자원산지증명서 발급)',
        '사후 세관 검증 대응(원산지 확인서, 협정별 대응 전략 수립)',
        '공급망 전반의 원산지 관리 매뉴얼 작성, 내부 교육 및 진단 컨설팅',
      ],
    },
    {
      id: 'inspection',
      title: '관세조사 & 세무조사 대응',
      engTitle: 'Tax Audit Support',
      icon: <FileSearchIcon className="w-6 h-6" />,
      desc: '관세조사와 세무조사에 대비하고, 조사 시 전문적으로 대응합니다.',
      details: [
        '세관 정기/수시조사(통관/수출입·외환/관세 재조사) 대응',
        '과세가격 조정, 품목분류 변경, 과소신고 등 비위 사안 전략 수립',
        '국세청 특별세무조사, 부가가치세/소득세 연계 조사 대응',
        '관세범칙조사와 형사입건 위험도 평가 및 변론 자료 준비',
        '관세청, 국세청 소송(조세심판원, 행정소송) 지원 및 법무법인 연계',
      ],
    },
    {
      id: 'hsCode',
      title: '품목분류 및 관세율 최적화',
      engTitle: 'HS Code Classification',
      icon: <ScaleIcon className="w-6 h-6" />,
      desc: '정확한 품목분류와 최적의 관세율 적용으로 비용을 절감합니다.',
      details: [
        'HS Code 정확 분류 및 사전심사 신청, 유권해석 확보',
        '관세율(기본/WTO/FTA/할당) 비교 분석 및 절세 전략 수립',
        '품목분류 오류 적발 시 경정청구(세금 환급) 대행',
        '대체물품, 부분품, 조립품, 완제품 등 기술적 분석 지원',
        '유사 품목 판례 및 해석 사례 분석, 통관 리스크 최소화',
      ],
    },
    {
      id: 'compliance',
      title: '관세법 준법지원 & 내부관리',
      engTitle: 'Customs Compliance',
      icon: <ShieldAlertIcon className="w-6 h-6" />,
      desc: '지속적인 관세법 준수 체계를 구축하고 내부 관리를 강화합니다.',
      details: [
        'AEO 인증 획득/유지 컨설팅, 준법시스템 구축 및 내부심사 대행',
        '수출입 프로세스 진단, 관세법령 위반 리스크 점검',
        '공급망 특수관계자 거래 현황 분석 및 과세가격 사전 대응',
        '신규 통관업무 담당자 교육, 매뉴얼 작성, 사내 세미나 진행',
        '관세법·FTA·외환법 등 통합 컴플라이언스 체계 구축 지원',
      ],
    },
  ];

  const activeSectionId = useScrollSpy(
    services.map((s) => s.id),
    150
  );

  return (
    <>
      <Head>
        <title>서비스 안내 - 프로스관세사</title>
      </Head>

      <main className="bg-white">
        {/* --- 1. Hero Section (Slate Style) --- */}
        <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* 1️⃣ 베이스 노이즈 텍스처 */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
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
                    href="https://open.kakao.com/o/sfMApAbi"
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

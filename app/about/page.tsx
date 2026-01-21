'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// 스크롤 시 요소가 화면에 나타나는지 감지하는 훅
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsInView(true),
      { threshold: 0.1, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

export default function AboutPage() {
  const heroRef = useInView();
  const cardRef = useInView();

  return (
    <main className="bg-slate-50">
      {/* --- 1. Hero Section (배경 이미지 적용됨) --- */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          // 보내주신 호스팅 이미지 URL 적용
          backgroundImage:
            "url('https://ai.esmplus.com/secretbro/hero-bg.jpg')",
        }}
      >
        {/* 오버레이: 배경 위에 어두운 막을 씌워 글씨가 잘 보이게 함 */}
        <div className="absolute inset-0 bg-slate-900/60" />

        <div
          ref={heroRef.ref}
          className="relative text-center px-6 container mx-auto mt-[-10vh]"
          style={{
            opacity: heroRef.isInView ? 1 : 0,
            transform: heroRef.isInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1)',
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            고객의 비즈니스를
            <br className="md:hidden" /> 지키는 원칙
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-light">
            프로스 관세사무소는 정확한 판단과
            <br className="md:hidden" /> 깊이 있는 전문성으로
            <br />
            귀하의 무역 비즈니스에 확실한 답을 드립니다.
          </p>
        </div>
      </section>

      {/* --- 2. Overlapping Content Card (겹침 효과 섹션) --- */}
      <section className="relative z-10 px-6 -mt-32 md:-mt-40 pb-24">
        <div
          ref={cardRef.ref}
          className="container mx-auto max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          style={{
            opacity: cardRef.isInView ? 1 : 0,
            transform: cardRef.isInView ? 'translateY(0)' : 'translateY(60px)',
            transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* 왼쪽: 텍스트 영역 */}
            <div className="lg:col-span-7 p-10 md:p-16 lg:pr-20 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 relative">
                대표 관세사 인사말
                <span className="absolute bottom-[-12px] left-0 w-12 h-1 bg-slate-900"></span>
              </h2>

              <div className="text-slate-700 leading-loose whitespace-pre-line text-lg space-y-8 font-light">
                <p>
                  {`안녕하십니까.
                  프로스 관세사무소입니다.

                  복잡해지는 글로벌 무역 환경 속에서 관세사는 단순한 신고 대행자를 넘어, 기업의 리스크를 관리하고 이익을 극대화하는 전략적 파트너가 되어야 합니다.`}
                </p>
                <p>
                  {`저희는 오랜 실무 경험과 데이터 분석을 통해, 고객의 비즈니스 구조에 최적화된 솔루션을 선제적으로 제시합니다.

                  문제를 해결하는 것을 넘어, 문제가 발생하지 않는 구조를 만드는 것. 그것이 프로스가 추구하는 전문가의 자세입니다.`}
                </p>
                <p className="font-medium text-slate-900 text-xl pt-4">
                  고객의 성공적인 비즈니스 파트너가 되겠습니다.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-slate-500 text-sm mb-2">프로스 관세사무소</p>
                <p className="text-2xl font-serif font-bold text-slate-900">
                  대표관세사 김 준 성 올림
                </p>
              </div>
            </div>

            {/* 오른쪽: 이미지 영역 */}
            <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-full h-full bg-slate-100">
              {/* 프로필용 이미지 (서류 검토/만년필 느낌)
               * 추후 이 이미지도 호스팅 서버에 올리시면 src를 교체해주세요.
               */}
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
                alt="전문적인 업무 처리"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* 이미지 위에 은은한 그라데이션 (텍스트 영역과 자연스럽게 연결) */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white/10 lg:to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. CTA Section (상담 신청) --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* 배경 장식용 원 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-800/50 rounded-full blur-3xl -z-1"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            전문적인 관세·무역 상담이
            <br /> 필요하신가요?
          </h3>
          <p className="text-slate-300 mb-12 text-lg max-w-xl mx-auto">
            현재 마주하신 상황을 간단히 남겨주세요.
            <br />
            전담 관세사가 내용을 검토 후 24시간 이내에 신속히 회신드립니다.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-slate-900 text-lg font-bold hover:bg-slate-200 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            상담 신청하기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                fillRule="evenodd"
                d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 0 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}

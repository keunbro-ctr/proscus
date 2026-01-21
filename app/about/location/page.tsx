export default function LocationPage() {
  return (
    <main className="py-20 bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="text-3xl font-medium text-center mb-10">오시는 길</h1>

        <div className="mb-6">
          <p className="font-semibold">프로스 관세사무소</p>
          <p>서울특별시 중구 서소문로 89, 17층</p>
        </div>

        {/* 구글 지도 */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <div className="relative w-full aspect-[16/9]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.673334251394!2d126.96818177714539!3d37.56275942434263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca28bd1b5822f%3A0x47b9cb5b4bbd3b68!2z7ISc7Jq47Yq567OE7IucIOykkeq1rCDshJzshozrrLjroZwgODkgMTfsuLU!5e0!3m2!1sko!2skr!4v1768805883870!5m2!1sko!2skr"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* 교통 안내 */}
        <div className="mt-6 text-sm text-slate-600">
          <p>🚇 지하철 : 시청역 / 서대문역 인근</p>
          <p>🚗 주차 : 건물 내 주차 가능 (방문 전 문의)</p>
        </div>
      </div>
    </main>
  );
}

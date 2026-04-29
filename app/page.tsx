export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      
      {/* 헤더 */}
      <div className="px-6 pt-12 pb-6">
        <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">Daily Essay</p>
        <h1 className="text-2xl font-bold text-stone-800">Murmur</h1>
      </div>

      {/* 소개 이미지 */}
      <div className="mx-6 rounded-2xl overflow-hidden bg-stone-200 h-56 flex items-center justify-center">
        <p className="text-stone-400 text-sm">🌿 오늘의 이미지</p>
      </div>

      {/* 앱 소개 */}
      <div className="px-6 py-8 flex flex-col gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-base font-semibold text-stone-700 mb-2">이 앱은 무엇인가요?</h2>
          <p className="text-sm text-stone-500 leading-relaxed">
            읽은 사람만 들어올 수 있어요!<br/>
            매일 3개의 질문이 주어져요.<br/>
            말 많이 안 해도 괜찮아요.<br/>
            한 편 읽고 들어오는 조용한 대화 공간이에요. 🌿
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-base font-semibold text-stone-700 mb-2">어떻게 사용하나요?</h2>
          <p className="text-sm text-stone-500 leading-relaxed">
            Step 1. Essay 메뉴에서 오늘의 글을 확인해요<br/>
            Step 2. 글을 읽은 분들에게는 세션 참여 기회가 주어져요<br/>
            Step 3. Session에 참여해서 함께 생각을 나눠봐요
          </p>
        </div>

        <div className="bg-stone-800 rounded-2xl p-5">
          <p className="text-sm text-stone-300 leading-relaxed italic">
            "감정은 표현될 때 비로소 이해된다"
          </p>
        </div>
      </div>

    </div>
  )
}
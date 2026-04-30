export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="relative h-full flex flex-col">
        {/* 배경 이미지 */}
        <img src="/home.jpg" alt="배경" className="w-full h-full object-cover absolute inset-0" />
        <div className="absolute inset-0 bg-black/30" />

        {/* 헤더 */}
        <div className="relative z-10 px-6 pt-12 pb-4">
          <p className="text-xs text-white/70 tracking-widest uppercase mb-1">Daily Essay</p>
          <h1 className="text-2xl font-bold text-white">Murmur</h1>
        </div>

        {/* 카드들 */}
        <div className="relative z-10 px-6 pb-20 flex flex-col gap-2 mt-70">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <h2 className="text-sm font-semibold text-white mb-1">Murmur은 어떤 공간인가요?</h2>
            <p className="text-xs text-white/80 leading-relaxed">
              바쁜 하루 속, 잠깐 생각이 머무는 공간입니다.<br/>
              오늘의 에세이를 읽고 주어진 질문에 잠시 멈춰 생각해봐요.<br/>
              대화를 통해 휴식을 얻는 조용한 대화 공간이에요. 🌿<br/> 
                          </p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <h2 className="text-sm font-semibold text-white mb-1">이렇게 진행돼요</h2>
            <p className="text-xs text-white/80 leading-relaxed">
              Step 1. Essay에서 오늘의 글을 읽어요<br/>
              Step 2. 글을 읽은 분은 세션 참여가 가능해요<br/>
              Step 3. Session에서 함께 생각을 이야기해요
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3">
            <p className="text-xs text-white/80 leading-relaxed">
              "오늘의 글을 읽고 조용히 이어지는 대화<br/>
              혼자 남겨두기엔 좋은 생각들이 있어요"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
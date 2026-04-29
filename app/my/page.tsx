export default function MyPage() {
  return (
    <div className="min-h-screen bg-stone-50">

      {/* 헤더 */}
      <div className="px-6 pt-12 pb-6">
        <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">My</p>
        <h1 className="text-2xl font-bold text-stone-800">마이페이지</h1>
      </div>

      {/* 프로필 카드 */}
      <div className="mx-6 bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
        <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center text-2xl">
          🌿
        </div>
        <div>
          <p className="font-semibold text-stone-800">Guest</p>
          <p className="text-sm text-stone-400">로그인이 필요해요</p>
        </div>
      </div>

      {/* 메뉴 */}
      <div className="mx-6 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <p className="text-stone-700">내 에세이</p>
          <span className="text-stone-300">›</span>
        </div>
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <p className="text-stone-700">알림 설정</p>
          <span className="text-stone-300">›</span>
        </div>
        <div className="px-6 py-4 flex items-center justify-between">
          <p className="text-stone-700">앱 정보</p>
          <span className="text-stone-300">›</span>
        </div>
      </div>

      {/* 로그인 버튼 */}
      <div className="mx-6 mt-4">
        <button className="w-full bg-stone-800 hover:bg-stone-700 text-white font-semibold py-4 rounded-xl transition">
          로그인 / 회원가입
        </button>
      </div>

      {/* 앱 정보 */}
      <div className="mx-6 mt-4 text-center">
        <p className="text-xs text-stone-300">Murmur v1.0</p>
      </div>

    </div>
  )
}
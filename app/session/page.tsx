'use client'

import { useEffect, useState } from 'react'

export default function SessionPage() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const sessionDate = new Date('2026-04-29T20:00:00')
  const isSessionTime = now >= sessionDate

  const formatDate = (date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토']
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}(${days[date.getDay()]}) 저녁 8시`
  }

  return (
    <div className="min-h-screen bg-stone-50">

      {/* 헤더 */}
      <div className="px-6 pt-12 pb-6">
        <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">Session</p>
        <h1 className="text-2xl font-bold text-stone-800">오늘의 세션</h1>
      </div>

      {/* 세션 카드 */}
      <div className="mx-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          
          {/* 상단 컬러 바 */}
          <div className={`h-2 ${isSessionTime ? 'bg-green-400' : 'bg-stone-300'}`}/>

          <div className="p-6">
            {/* 에세이 제목 */}
            <p className="text-xs text-stone-400 mb-1">오늘의 에세이 주제</p>
            <h2 className="text-lg font-bold text-stone-800 mb-4">
              오늘 당신의 감정은 어떤가요?
            </h2>

            {/* 날짜 */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">🗓️</span>
              <p className="text-stone-600 text-sm">{formatDate(sessionDate)}</p>
            </div>

            {/* 상태 */}
            {isSessionTime ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
                  <p className="text-green-600 text-sm font-semibold">세션이 진행 중이에요</p>
                </div>
                <button className="w-full bg-stone-800 hover:bg-stone-700 text-white font-semibold py-4 rounded-xl transition">
                  🎙️ 세션 입장하기
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-stone-300 rounded-full"/>
                  <p className="text-stone-400 text-sm">세션 시작 전이에요</p>
                </div>
                <button disabled className="w-full bg-stone-100 text-stone-400 font-semibold py-4 rounded-xl cursor-not-allowed">
                  🎙️ 곧 시작돼요
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 안내 */}
        <div className="mt-4 bg-stone-100 rounded-2xl p-5">
          <p className="text-sm text-stone-500 leading-relaxed">
            💬 세션은 매일 저녁 8시에 열려요.<br/>
            에세이를 읽고 함께 이야기 나눠봐요.
          </p>
        </div>
      </div>

    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const ADMIN_PASSWORD = 'murmur2024'

export default function SessionPage() {
  const [session, setSession] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminPw, setAdminPw] = useState('')
  const [newLink, setNewLink] = useState('')
  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    fetchSession()
  }, [])

  const fetchSession = async () => {
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .limit(1)
      .single()
    if (data) setSession(data)
  }

  const handleAdminLogin = () => {
    if (adminPw === ADMIN_PASSWORD) {
      setIsAdmin(true)
      setShowAdminLogin(false)
    } else {
      alert('비밀번호가 틀렸어요!')
    }
  }

  const handleToggleSession = async () => {
    const { error } = await supabase
      .from('sessions')
      .update({ is_open: !session.is_open })
      .eq('id', session.id)
    if (!error) fetchSession()
  }

  const handleUpdateSession = async () => {
    if (!newLink || !newTitle) return alert('제목과 링크를 입력해주세요!')
    const { error } = await supabase
      .from('sessions')
      .update({ link: newLink, title: newTitle })
      .eq('id', session.id)
    if (error) {
      alert('저장 실패: ' + error.message)
    } else {
      alert('저장됐어요!')
      setNewLink('')
      setNewTitle('')
      fetchSession()
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="px-6 pt-12 pb-6 flex justify-between items-start">
        <div>
          <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">Session</p>
          <h1 className="text-2xl font-bold text-stone-800">오늘의 세션</h1>
        </div>
        <button onClick={() => setShowAdminLogin(!showAdminLogin)} className="text-xs text-stone-300 mt-2">
          관리
        </button>
      </div>

      {showAdminLogin && !isAdmin && (
        <div className="mx-6 mb-4 bg-white rounded-2xl p-4 shadow-sm flex gap-2">
          <input
            type="password"
            className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
            placeholder="관리자 비밀번호"
            value={adminPw}
            onChange={(e) => setAdminPw(e.target.value)}
          />
          <button onClick={handleAdminLogin} className="bg-stone-800 text-white text-sm px-4 rounded-xl">
            확인
          </button>
        </div>
      )}

      {isAdmin && session && (
        <div className="mx-6 mb-4 bg-stone-100 rounded-2xl p-4 border border-stone-300 flex flex-col gap-3">
          <p className="text-xs font-semibold text-stone-500">세션 관리</p>
          <button
            onClick={handleToggleSession}
            className={`w-full py-2 rounded-xl text-sm font-semibold text-white ${session.is_open ? 'bg-red-500' : 'bg-green-500'}`}
          >
            {session.is_open ? '세션 닫기' : '세션 열기'}
          </button>
          <div className="bg-white rounded-xl p-3 flex flex-col gap-2">
            <p className="text-xs text-stone-400 font-medium">세션 정보 수정</p>
            <input
              className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
              placeholder="세션 제목"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
              placeholder="링크 (예: https://zoom.us/j/...)"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
            />
            <button onClick={handleUpdateSession} className="w-full bg-stone-800 text-white text-sm py-2 rounded-xl">
              저장
            </button>
          </div>
        </div>
      )}

      <div className="mx-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className={`h-2 ${session?.is_open ? 'bg-green-400' : 'bg-stone-300'}`} />
          <div className="p-6">
            <p className="text-xs text-stone-400 mb-1">오늘의 세션</p>
            <h2 className="text-lg font-bold text-stone-800 mb-6">
              {session?.title || '오늘의 세션'}
            </h2>
            <div className="flex flex-col gap-3">
              {session?.is_open ? (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-green-600 text-sm font-semibold">세션이 열려있어요!</p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-stone-300 rounded-full" />
                  <p className="text-stone-400 text-sm">현재 세션이 닫혀있어요</p>
                </div>
              )}
              {session?.is_open ? (
              <a  
                  href={session.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-stone-800 text-white font-semibold py-4 rounded-xl text-center block"
                >
                  세션 입장하기
                </a>
              ) : (
                <button
                  disabled
                  className="w-full bg-stone-100 text-stone-400 font-semibold py-4 rounded-xl cursor-not-allowed"
                >
                  곧 시작돼요
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 bg-stone-100 rounded-2xl p-5">
          <p className="text-sm text-stone-500 leading-relaxed">
            세션은 관리자가 열면 참여할 수 있어요.
            에세이를 읽고 함께 이야기 나눠봐요.
          </p>
        </div>
      </div>
    </div>
  )
}
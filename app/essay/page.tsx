'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

const ADMIN_PASSWORD = 'murmur2024'

export default function EssayPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [todayEssay, setTodayEssay] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [commentText, setCommentText] = useState('')
  const [commentSubmitted, setCommentSubmitted] = useState(false)

  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminPw, setAdminPw] = useState('')

  const [newQuestion, setNewQuestion] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [newInviteCode, setNewInviteCode] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
    fetchTodayEssay()
    fetchComments()
  }, [])

  const fetchTodayEssay = async () => {
    const { data } = await supabase
      .from('today_essay')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    if (data) setTodayEssay(data)
  }

  const fetchComments = async () => {
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('essay_date', today)
      .order('created_at', { ascending: true })
    if (data) setComments(data)
  }

  const handleCommentSubmit = async () => {
    if (!user) return router.push('/auth')
    if (!commentText) return alert('댓글을 입력해주세요!')
    const today = new Date().toISOString().split('T')[0]
    const { error } = await supabase.from('comments').insert([
      { essay_date: today, nickname: user.email, content: commentText }
    ])
    if (error) return alert('오류: ' + error.message)
    setCommentSubmitted(true)
    setCommentText('')
    fetchComments()
  }

  const handleAdminLogin = () => {
    if (adminPw === ADMIN_PASSWORD) {
      setIsAdmin(true)
      setShowAdminLogin(false)
    } else {
      alert('비밀번호가 틀렸어요!')
    }
  }

  const handleAdminUpload = async () => {
    if (!newQuestion || !imageFile) return alert('질문과 이미지를 선택해주세요!')
    setUploading(true)

    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const { error: uploadError } = await supabase.storage
      .from('essay-images')
      .upload(fileName, imageFile)

    if (uploadError) {
      alert('이미지 업로드 실패: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('essay-images')
      .getPublicUrl(fileName)

    const { error } = await supabase.from('today_essay').insert([
      { question: newQuestion, image_url: urlData.publicUrl }
    ])

    if (error) {
      alert('저장 실패: ' + error.message)
    } else {
      alert('업로드 완료!')
      setNewQuestion('')
      setImageFile(null)
      fetchTodayEssay()
    }
    setUploading(false)
  }

  const handleInviteCodeUpdate = async () => {
    if (!newInviteCode) return alert('새 초대코드를 입력해주세요!')
    await supabase.from('invite_codes').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    const { error } = await supabase.from('invite_codes').insert([{ code: newInviteCode }])
    if (error) {
      alert('변경 실패: ' + error.message)
    } else {
      alert(`초대코드가 "${newInviteCode}" 로 변경됐어요!`)
      setNewInviteCode('')
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-24">

      {/* 헤더 */}
      <div className="px-6 pt-12 pb-4 flex justify-between items-start">
        <div>
          <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">Essay for Today</p>
          <h1 className="text-2xl font-bold text-stone-800">오늘의 에세이</h1>
        </div>
        <div className="flex gap-3 items-center mt-2">
          {user ? (
            <button
              onClick={async () => { await supabase.auth.signOut(); setUser(null) }}
              className="text-xs text-stone-300"
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={() => router.push('/auth')}
              className="text-xs text-stone-400 underline"
            >
              로그인
            </button>
          )}
          <button
            onClick={() => setShowAdminLogin(!showAdminLogin)}
            className="text-xs text-stone-300"
          >
            관리
          </button>
        </div>
      </div>

      {/* 관리자 로그인 */}
      {showAdminLogin && !isAdmin && (
        <div className="mx-6 mb-4 bg-white rounded-2xl p-4 shadow-sm flex gap-2">
          <input
            type="password"
            className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
            placeholder="관리자 비밀번호"
            value={adminPw}
            onChange={(e) => setAdminPw(e.target.value)}
          />
          <button
            onClick={handleAdminLogin}
            className="bg-stone-800 text-white text-sm px-4 rounded-xl"
          >
            확인
          </button>
        </div>
      )}

      {/* 관리자 패널 */}
      {isAdmin && (
        <div className="mx-6 mb-4 bg-stone-100 rounded-2xl p-4 border border-stone-300 flex flex-col gap-3">
          <p className="text-xs font-semibold text-stone-500">🔧 관리자 패널</p>

          {/* 에세이 업로드 */}
          <div className="bg-white rounded-xl p-3 flex flex-col gap-2">
            <p className="text-xs text-stone-400 font-medium">오늘의 에세이 업로드</p>
            <input
              className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
              placeholder="오늘의 질문"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-stone-500"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            <button
              onClick={handleAdminUpload}
              disabled={uploading}
              className="w-full bg-stone-800 text-white text-sm py-2 rounded-xl disabled:opacity-50"
            >
              {uploading ? '업로드 중...' : '업로드'}
            </button>
          </div>

          {/* 초대코드 변경 */}
          <div className="bg-white rounded-xl p-3 flex flex-col gap-2">
            <p className="text-xs text-stone-400 font-medium">초대코드 변경</p>
            <input
              className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
              placeholder="새 초대코드 입력"
              value={newInviteCode}
              onChange={(e) => setNewInviteCode(e.target.value.toUpperCase())}
            />
            <button
              onClick={handleInviteCodeUpdate}
              className="w-full bg-stone-600 text-white text-sm py-2 rounded-xl"
            >
              코드 변경
            </button>
          </div>
        </div>
      )}

      {/* 오늘의 이미지 */}
      <div className="mx-6 rounded-2xl overflow-hidden bg-stone-200 h-56 flex items-center justify-center">
        {todayEssay?.image_url ? (
          <img src={todayEssay.image_url} alt="오늘의 이미지" className="w-full h-full object-cover" />
        ) : (
          <p className="text-stone-400 text-sm">🌿 오늘의 이미지</p>
        )}
      </div>

      {/* 오늘의 질문 */}
      <div className="mx-6 mt-4 bg-white rounded-2xl p-5 shadow-sm">
        <p className="text-xs text-stone-400 mb-1">오늘의 질문</p>
        <p className="text-lg font-semibold text-stone-800">
          {todayEssay?.question || '오늘 당신의 감정은 어떤가요?'}
        </p>
      </div>

      {/* 댓글 목록 */}
      <div className="mx-6 mt-4">
        <p className="text-xs text-stone-400 mb-2">💬 {comments.length}개의 댓글</p>
        <div className="flex flex-col gap-2">
          {comments.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-xs font-semibold text-stone-500 mb-1">{c.nickname}</p>
              <p className="text-sm text-stone-700">{c.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 댓글 작성 */}
      <div className="mx-6 mt-4 flex flex-col gap-3">
        {!user ? (
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <p className="text-sm text-stone-500 mb-3">로그인 후 댓글을 남길 수 있어요 🌿</p>
            <button
              onClick={() => router.push('/auth')}
              className="bg-stone-800 text-white text-sm px-6 py-3 rounded-xl"
            >
              로그인하기
            </button>
          </div>
        ) : !commentSubmitted ? (
          <>
            <p className="text-xs text-stone-400">{user.email} 으로 남기기</p>
            <textarea
              className="bg-white border border-stone-200 rounded-xl p-4 text-stone-800 h-32 resize-none text-sm focus:outline-none focus:border-stone-400"
              placeholder="오늘의 글을 읽고 느낀 점을 남겨보세요..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-stone-800 text-white font-semibold py-4 rounded-xl"
            >
              생각 남기기 🌿
            </button>
          </>
        ) : (
          <div className="bg-stone-800 rounded-2xl p-6 text-center">
            <p className="text-white text-lg mb-1">🌿 감사해요!</p>
            <p className="text-stone-400 text-sm">오늘의 생각을 남겨주셨어요</p>
            <button onClick={() => setCommentSubmitted(false)} className="mt-4 text-stone-300 text-sm underline">
              또 남기기
            </button>
          </div>
        )}
      </div>

    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function EssayPage() {
  const [todayImage, setTodayImage] = useState(null)
  const [question, setQuestion] = useState('오늘 당신의 감정은 어떤가요?')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetchTodayEssay()
  }, [])

  const fetchTodayEssay = async () => {
    const { data } = await supabase
      .from('today_essay')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (data) {
      setQuestion(data.question)
      setTodayImage(data.image_url)
    }
  }

  const handleSubmit = async () => {
    if (!title || !content) return alert('제목과 내용을 입력해주세요!')

    const { error } = await supabase.from('essays').insert([
      { title, content, question }
    ])

    if (error) {
      alert('저장 실패: ' + error.message)
    } else {
      setSubmitted(true)
      setTitle('')
      setContent('')
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">

      <div className="px-6 pt-12 pb-4">
        <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">Essay for Today</p>
        <h1 className="text-2xl font-bold text-stone-800">오늘의 에세이</h1>
      </div>

      <div className="mx-6 rounded-2xl overflow-hidden bg-stone-200 h-56 flex items-center justify-center">
        {todayImage ? (
          <img src={todayImage} alt="오늘의 이미지" className="w-full h-full object-cover" />
        ) : (
          <p className="text-stone-400 text-sm">🌿 오늘의 이미지</p>
        )}
      </div>

      <div className="mx-6 mt-4 bg-white rounded-2xl p-5 shadow-sm">
        <p className="text-xs text-stone-400 mb-1">오늘의 질문</p>
        <p className="text-lg font-semibold text-stone-800">{question}</p>
      </div>

      {submitted ? (
        <div className="mx-6 mt-4 bg-stone-800 rounded-2xl p-6 text-center">
          <p className="text-white text-lg mb-1">🌿 저장됐어요!</p>
          <p className="text-stone-400 text-sm">오늘의 감정을 기록했어요</p>
          <button onClick={() => setSubmitted(false)} className="mt-4 text-stone-300 text-sm underline">
            다시 쓰기
          </button>
        </div>
      ) : (
        <div className="mx-6 mt-4 flex flex-col gap-3 pb-8">
          <input
            className="bg-white border border-stone-200 rounded-xl p-4 text-stone-800 focus:outline-none focus:border-stone-400"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="bg-white border border-stone-200 rounded-xl p-4 text-stone-800 h-48 resize-none focus:outline-none focus:border-stone-400"
            placeholder="오늘의 감정을 자유롭게 써보세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-stone-800 hover:bg-stone-700 text-white font-semibold py-4 rounded-xl transition"
          >
            에세이 저장하기 🌿
          </button>
        </div>
      )}

    </div>
  )
}
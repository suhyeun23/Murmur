'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    if (!email || !password) return setMessage('이메일과 비밀번호를 입력해주세요!')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage('로그인 실패: 이메일 또는 비밀번호를 확인해주세요.')
    } else {
      router.push('/essay')
    }
    setLoading(false)
  }

  const handleSignup = async () => {
    if (!email || !password || !name || !phone || !inviteCode) {
      return setMessage('모든 항목을 입력해주세요!')
    }
    setLoading(true)

    const { data: codeData, error: codeError } = await supabase
      .from('invite_codes')
      .select('*')
      .eq('code', inviteCode.toUpperCase())
      .eq('active', true)
      .single()

    if (codeError || !codeData) {
      setMessage('유효하지 않은 초대코드예요!')
      setLoading(false)
      return
    }

    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signupError || !signupData.user) {
      setMessage('가입 실패: ' + signupError?.message)
      setLoading(false)
      return
    }

    await supabase.from('profiles').insert([
      { id: signupData.user.id, name, phone }
    ])

    setMessage('📧 이메일을 확인해주세요! 인증 링크를 보냈어요.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-center px-6">
      <div className="mb-10">
        <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">Welcome to</p>
        <h1 className="text-3xl font-bold text-stone-800">Murmur</h1>
        <p className="text-sm text-stone-400 mt-2">조용히 감정을 나누는 공간</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="flex bg-stone-100 rounded-xl p-1">
          <button
            onClick={() => { setIsLogin(true); setMessage('') }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              isLogin ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400'
            }`}
          >
            로그인
          </button>
          <button
            onClick={() => { setIsLogin(false); setMessage('') }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              !isLogin ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400'
            }`}
          >
            회원가입
          </button>
        </div>

        {!isLogin && (
          <>
            <input
              type="text"
              className="border border-stone-200 rounded-xl p-4 text-sm text-stone-800 focus:outline-none focus:border-stone-400"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="tel"
              className="border border-stone-200 rounded-xl p-4 text-sm text-stone-800 focus:outline-none focus:border-stone-400"
              placeholder="핸드폰 번호 (예: 01012345678)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              className="border border-stone-200 rounded-xl p-4 text-sm text-stone-800 focus:outline-none focus:border-stone-400"
              placeholder="초대코드"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
            />
          </>
        )}

        <input
          type="email"
          className="border border-stone-200 rounded-xl p-4 text-sm text-stone-800 focus:outline-none focus:border-stone-400"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border border-stone-200 rounded-xl p-4 text-sm text-stone-800 focus:outline-none focus:border-stone-400"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {message && (
          <p className="text-sm text-stone-500 text-center">{message}</p>
        )}

        <button
          onClick={isLogin ? handleLogin : handleSignup}
          disabled={loading}
          className="bg-stone-800 text-white font-semibold py-4 rounded-xl disabled:opacity-50"
        >
          {loading ? '처리 중...' : isLogin ? '로그인' : '회원가입'}
        </button>
      </div>
    </div>
  )
}
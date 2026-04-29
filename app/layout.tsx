import './globals.css'

export const metadata = {
  title: 'Murmur',
  description: '오늘의 감정을 글로 남겨보세요',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-stone-50 max-w-md mx-auto min-h-screen relative">
        <main className="pb-20">
          {children}
        </main>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-stone-200 flex justify-around items-center h-16 z-50">
          <a href="/" className="flex flex-col items-center gap-1 text-stone-400 hover:text-stone-700">
            <span className="text-xl">🏠</span>
            <span className="text-xs">홈</span>
          </a>
          <a href="/essay" className="flex flex-col items-center gap-1 text-stone-400 hover:text-stone-700">
            <span className="text-xl">🌿</span>
            <span className="text-xs">Essay</span>
          </a>
          <a href="/session" className="flex flex-col items-center gap-1 text-stone-400 hover:text-stone-700">
            <span className="text-xl">🎙️</span>
            <span className="text-xs">Session</span>
          </a>
          <a href="/my" className="flex flex-col items-center gap-1 text-stone-400 hover:text-stone-700">
            <span className="text-xl">👤</span>
            <span className="text-xs">My</span>
          </a>
        </nav>
      </body>
    </html>
  )
}
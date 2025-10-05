"use client"

import Link from "next/link"

const IFRAME_SRC = "/deep-zoom/viewer.html"
const VIEWPORT_OFFSET = 112 // header height (px)

export default function ViewerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="flex items-center justify-between bg-black/80 px-6 py-4 backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-wide text-white/50">Deep Zoom Viewer</p>
          <h1 className="text-lg font-semibold">NASA Snapshot Explorer</h1>
        </div>
        <Link href="/" className="text-sm text-white/70 transition hover:text-white">
          ← Back to WeatherWise
        </Link>
      </header>

      <main className="flex-1">
        <iframe
          src={IFRAME_SRC}
          title="NASA Deep Zoom Viewer"
          className="h-[calc(100vh-112px)] w-full border-0"
          allowFullScreen
        />
      </main>
    </div>
  )
}

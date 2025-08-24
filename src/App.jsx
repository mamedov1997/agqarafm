import React, { useEffect, useMemo, useState } from 'react'
import { Search, Filter } from 'lucide-react'
import data from './data/videos.json'
import VideoCard from './components/VideoCard.jsx'
import PlayerModal from './components/PlayerModal.jsx'

const KEY = 'agqarafm_stats_v1'

function loadStats() {
  const raw = localStorage.getItem(KEY)
  if (!raw) return {}
  try { return JSON.parse(raw) } catch { return {} }
}

function saveStats(stats) {
  localStorage.setItem(KEY, JSON.stringify(stats))
}

function ensure(stats, id) {
  if (!stats[id]) stats[id] = { views: 0, likes: 0, dislikes: 0 }
}

export default function App() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('new')
  const [openId, setOpenId] = useState(null)
  const [stats, setStats] = useState(() => loadStats())

  const current = useMemo(() => data.find(v => v.id === openId), [openId])
  const currentStats = current ? stats[current.id] : null

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = data.filter(v => v.title.toLowerCase().includes(q))
    switch (sort) {
      case 'popular': list = [...list].sort((a,b) => (stats[b.id]?.views||0) - (stats[a.id]?.views||0)); break
      case 'liked': list = [...list].sort((a,b) => (stats[b.id]?.likes||0) - (stats[a.id]?.likes||0)); break
      default: list = list // 'new' — keep JSON order (admin controls order)
    }
    return list
  }, [query, sort, stats])

  const onOpen = (id) => setOpenId(id)
  const onClose = () => setOpenId(null)

  const update = (id, field) => {
    setStats(prev => {
      const next = { ...prev }
      ensure(next, id)
      next[id][field] += 1
      saveStats(next)
      return next
    })
  }

  const onViewed = (id) => update(id, 'views')
  const onLike = (id) => update(id, 'likes')
  const onDislike = (id) => update(id, 'dislikes')

  useEffect(() => {
    // ensure keys exist for all videos
    setStats(prev => {
      const next = { ...prev }
      for (const v of data) ensure(next, v.id)
      saveStats(next)
      return next
    })
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
        <div className="container py-3 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <div className="brand">AGQARAFM</div>
            <span className="badge hidden md:inline">Video</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input className="search pl-10" placeholder="Axtarış..." value={query} onChange={e=>setQuery(e.target.value)} />
            </div>

            <select className="btn" value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="new">Yeni</option>
              <option value="popular">Populyar</option>
              <option value="liked">Ən çox Like</option>
            </select>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="container py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map(v => (
            <VideoCard
              key={v.id}
              video={v}
              stats={stats[v.id]}
              onOpen={onOpen}
              onLike={onLike}
              onDislike={onDislike}
            />
          ))}
        </div>
      </main>

      <PlayerModal
        open={!!openId}
        video={current}
        stats={currentStats}
        onClose={onClose}
        onLike={onLike}
        onDislike={onDislike}
        onViewed={onViewed}
      />

      {/* Footer */}
      <footer className="container py-10 text-center text-white/60">
        © AGQARAFM — yalnız admin əlavə edir. İstifadəçi qeydiyyatı yoxdur.
      </footer>
    </div>
  )
}

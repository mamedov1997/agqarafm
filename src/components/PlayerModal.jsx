import React, { useEffect, useRef } from 'react'
import { X, ThumbsUp, ThumbsDown, Eye } from 'lucide-react'

export default function PlayerModal({ open, video, stats, onClose, onLike, onDislike, onViewed }) {
  const ref = useRef(null)

  useEffect(() => {
    if (open && ref.current) {
      ref.current.currentTime = 0
      onViewed(video.id)
    }
  }, [open])

  if (!open || !video) return null

  const { title, src, description } = video
  const { views, likes, dislikes } = stats || { views: 0, likes: 0, dislikes: 0 }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur grid place-items-center p-4">
      <div className="w-full max-w-4xl bg-black border border-white/10 rounded-3xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="font-semibold">{title}</h3>
          <button className="icon-btn" onClick={onClose}><X className="w-5 h-5" /></button>
        </div>

        <div className="w-full bg-black">
          <video ref={ref} src={src} className="w-full aspect-video" controls />
        </div>

        <div className="p-4 flex flex-col gap-3">
          <p className="text-white/80">{description}</p>

          <div className="flex items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1"><Eye className="w-4 h-4" /> {views}</span>
            <button className="btn" onClick={() => onLike(video.id)}><ThumbsUp className="w-5 h-5" /> Like ({likes})</button>
            <button className="btn" onClick={() => onDislike(video.id)}><ThumbsDown className="w-5 h-5" /> Dislike ({dislikes})</button>
          </div>
        </div>
      </div>
    </div>
  )
}

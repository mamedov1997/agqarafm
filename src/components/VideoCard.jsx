import React from 'react'
import { ThumbsUp, ThumbsDown, Eye } from 'lucide-react'

export default function VideoCard({ video, stats, onOpen, onLike, onDislike }) {
  const { id, title, poster, duration } = video
  const { views, likes, dislikes } = stats || { views: 0, likes: 0, dislikes: 0 }

  const likeRatio = likes + dislikes > 0 ? Math.round((likes / (likes + dislikes)) * 100) : 0

  return (
    <div className="card">
      <button className="w-full relative group" onClick={() => onOpen(id)}>
        {poster ? (
          <img src={poster} alt={title} className="w-full aspect-video object-cover" />
        ) : (
          <div className="w-full aspect-video bg-white/10 grid place-items-center">Poster yoxdur</div>
        )}
        <span className="absolute bottom-2 right-2 badge">{duration || ''}</span>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
      </button>

      <div className="p-4 flex flex-col gap-3">
        <h3 className="font-semibold line-clamp-2">{title}</h3>

        <div className="flex items-center gap-3 text-sm text-white/70">
          <span className="inline-flex items-center gap-1"><Eye className="w-4 h-4" /> {views}</span>
          <span className="inline-flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {likes}</span>
          <span className="inline-flex items-center gap-1"><ThumbsDown className="w-4 h-4" /> {dislikes}</span>
        </div>

        <div className="ratio"><i style={{ width: `${likeRatio}%` }} /></div>

        <div className="flex items-center gap-2">
          <button className="btn" onClick={() => onOpen(id)}>İzlə</button>
          <button className="icon-btn" title="Like" onClick={() => onLike(id)}><ThumbsUp className="w-5 h-5" /></button>
          <button className="icon-btn" title="Dislike" onClick={() => onDislike(id)}><ThumbsDown className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  )
}

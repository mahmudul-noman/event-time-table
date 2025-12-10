"use client"

import type { Event } from "@/types/scheduler"
import { cn } from "@/lib/utils"
import { formatTimeTo12Hour } from "@/lib/scheduler-utils"

interface EventCardProps {
  event: Event
  top: number
  height: number
  width: number
  onClick?: (event: Event) => void
}

/**
 * EventCard Component
 *
 * Displays a single event within the scheduler timeline.
 * The card is positioned based on time, sized by duration,
 * and supports click interactions for viewing or editing events.
 */
export function EventCard({ event, top, height, width, onClick }: EventCardProps) {
  return (
    <div
      className={cn(
        "absolute left-0 right-0 rounded-xs px-2 py-1 overflow-hidden cursor-pointer",
        "shadow-sm hover:shadow-md transition-shadow",
        "border border-white/20",
      )}
      style={{
        top,
        height: Math.max(height, 20),
        width: width,
        backgroundColor: event.color || "#3b82f6",
      }}
      onClick={() => onClick?.(event)}
    >
      <div className="text-white text-xs font-medium truncate">{event.title}</div>

      {height > 40 && (
        <div className="text-white/80 text-[10px] truncate">
          {formatTimeTo12Hour(event.startTime)} - {formatTimeTo12Hour(event.endTime)}
        </div>
      )}
    </div>
  )
}

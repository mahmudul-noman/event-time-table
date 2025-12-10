"use client"

import { formatTimeTo12Hour } from "@/lib/scheduler-utils"

interface TimeColumnProps {
  timeSlots: string[]
  slotHeight: number
}

export function TimeColumn({ timeSlots, slotHeight }: TimeColumnProps) {
  return (
    <div className="flex flex-col">
      {timeSlots.map((time, index) => (
        <div
          key={time}
          className="relative flex items-start justify-end pr-2 text-xs text-muted-foreground border-b border-border/50"
          style={{ height: slotHeight }}
        >
          {index > 0 && (
            <span className="absolute -top-2 right-2 text-[11px] font-medium bg-background px-0.5">
              {formatTimeTo12Hour(time)}
            </span>
          )}
          {index === 0 && <span className="text-[11px] font-medium">{formatTimeTo12Hour(time)}</span>}
        </div>
      ))}
    </div>
  )
}

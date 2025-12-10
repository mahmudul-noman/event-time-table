"use client"

import { formatTimeTo12Hour } from "@/lib/scheduler-utils"

interface TimeColumnProps {
  timeSlots: string[]
  slotHeight: number
}

/**
 * TimeColumn Component
 * 
 * Displays a vertical column of time slots for the scheduler.
 * Shows formatted time labels and aligns with event grid rows.
 */
export function TimeColumn({ timeSlots, slotHeight }: TimeColumnProps) {
  return (
    <div className="flex flex-col">
      {timeSlots.map((time, index) => (
        <div
          key={time}
          className="relative flex items-start justify-end pr-2 text-xs text-muted-foreground border-b border-border/50"
          style={{ height: slotHeight }}
        >
          {/* Time label: first row displays normally, others slightly offset */}
          {index > 0 && (
            <span className="absolute -top-2 right-2 text-[11px] font-medium bg-background px-0.5">
              {formatTimeTo12Hour(time)}
            </span>
          )}
          {index === 0 && (
            <span className="text-[11px] font-medium">{formatTimeTo12Hour(time)}</span>
          )}
        </div>
      ))}
    </div>
  )
}

"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { getDayName, formatDate } from "@/lib/scheduler-utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DayTabsProps {
  days: Date[]
  selectedDate: string
  onSelectDate: (date: string) => void
}

export function DayTabs({ days, selectedDate, onSelectDate }: DayTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Scroll selected tab into view on mount
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative flex items-center border-b border-border bg-card">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 z-10 flex h-full w-10 items-center justify-center bg-gradient-to-r from-card to-transparent hover:from-muted"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-5 w-5 text-muted-foreground" />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto px-10"
        // className="flex overflow-x-auto scrollbar-hide px-10"
      >
        {days.map((day) => {
          const dateStr = formatDate(day)
          const isSelected = dateStr === selectedDate

          return (
            <button
              key={dateStr}
              ref={isSelected ? selectedRef : null}
              onClick={() => onSelectDate(dateStr)}
              className={cn(
                "flex min-w-[160px] flex-col items-center px-4 py-3 transition-colors",
                "border-b-2 whitespace-nowrap",
                isSelected
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span className="text-sm font-medium">{getDayName(day)}</span>
              <span className="text-xs opacity-80">{dateStr}</span>
            </button>
          )
        })}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 z-10 flex h-full w-10 items-center justify-center bg-gradient-to-l from-card to-transparent hover:from-muted"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </button>
    </div>
  )
}

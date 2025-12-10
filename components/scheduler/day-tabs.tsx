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

/**
 * DayTabs Component
 *
 * Horizontally scrollable tab navigation for selecting dates.
 * Features auto-scroll to center the selected date, left/right
 * navigation buttons, and visual highlighting for the active date.
 */
export function DayTabs({ days, selectedDate, onSelectDate }: DayTabsProps) {
  // Reference to the horizontal scroll container
  const scrollRef = useRef<HTMLDivElement>(null)

  // Reference to the currently selected date tab
  const selectedRef = useRef<HTMLButtonElement>(null)

  // Auto-scroll the selected tab into view on initial mount
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      })
    }
  }, [])

  // Handles left/right scrolling of the tab container
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
      {/* Left scroll button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 z-10 flex h-full w-10 items-center justify-center bg-gradient-to-r from-card to-transparent hover:from-muted"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-5 w-5 text-muted-foreground" />
      </button>

      {/* Scrollable tabs container */}
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
              {/* Day name (e.g. Monday) */}
              <span className="text-sm font-medium">{getDayName(day)}</span>

              {/* Formatted date string */}
              <span className="text-xs opacity-80">{dateStr}</span>
            </button>
          )
        })}
      </div>

      {/* Right scroll button */}
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

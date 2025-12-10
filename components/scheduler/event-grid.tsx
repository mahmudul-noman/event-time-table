"use client"

import type { Event, Venue } from "@/types/scheduler"
import { EventCard } from "./event-card"
import { calculateEventPosition, calculateEventHeight } from "@/lib/scheduler-utils"

interface EventGridProps {
  venues: Venue[]
  events: Event[]
  timeSlots: string[]
  columnWidth: number
  slotHeight: number
  selectedDate: string
  onEventClick?: (event: Event) => void
}

/**
 * EventGrid Component
 * 
 * Renders a vertical grid of time slots for multiple venues and places events in their respective positions.
 * Supports multi-venue events, dynamic slot height, and custom column width.
 */
export function EventGrid({
  venues,
  events,
  timeSlots,
  columnWidth,
  slotHeight,
  selectedDate,
  onEventClick,
}: EventGridProps) {
  const firstSlotTime = timeSlots[0] || "09:00"
  const gridHeight = timeSlots.length * slotHeight

  return (
    <div className="flex" style={{ height: gridHeight }}>
      {venues.map((venue) => {
        // Filter events for this venue and selected date
        const venueEvents = events.filter((e) => {
          const matchesDate = e.date === selectedDate
          const matchesVenue = e.venueId === venue.id || (e.venueIds && e.venueIds.includes(venue.id))
          return matchesDate && matchesVenue
        })

        return (
          <div
            key={venue.id}
            className="relative flex-shrink-0 border-r border-border"
            style={{ width: columnWidth, height: gridHeight }}
          >
            {/* Time slot grid lines */}
            {timeSlots.map((_, index) => (
              <div
                key={index}
                className="absolute left-0 right-0 border-b border-border/30"
                style={{ top: index * slotHeight, height: slotHeight }}
              />
            ))}

            {/* Render events in calculated positions */}
            {venueEvents.map((event) => {
              const top = calculateEventPosition(event.startTime, firstSlotTime, slotHeight)
              const height = calculateEventHeight(event.startTime, event.endTime, slotHeight)

              return (
                <EventCard
                  key={event.id}
                  event={event}
                  top={top}
                  height={height}
                  width={columnWidth}
                  onClick={onEventClick}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

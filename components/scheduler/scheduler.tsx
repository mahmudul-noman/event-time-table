"use client"

import { useState, useRef } from "react"
import type { Event } from "@/types/scheduler"
import { useScheduler } from "@/hooks/use-scheduler"
import { getWeekDays, formatDate, generateTimeSlots } from "@/lib/scheduler-utils"
import { DayTabs } from "./day-tabs"
import { VenueHeader } from "./venue-header"
import { TimeColumn } from "./time-column"
import { EventGrid } from "./event-grid"
import { EventDialog } from "./event-dialog"
import { VenueDialog } from "./venue-dialog"
import MuiButton from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"

const COLUMN_WIDTH = 160
const SLOT_HEIGHT = 40
const TIME_COLUMN_WIDTH = 70

export function Scheduler() {
  const { events, venues, isLoaded, addEvent, updateEvent, deleteEvent, addVenue, deleteVenue } = useScheduler()
  const [selectedDate, setSelectedDate] = useState(() => formatDate(new Date()))
  const [dialogOpen, setDialogOpen] = useState(false)
  const [venueDialogOpen, setVenueDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const venueHeaderRef = useRef<HTMLDivElement>(null)
  const weekDays = getWeekDays()
  const timeSlots = generateTimeSlots(9, 18)

  const totalWidth = (venues.length + 1) * COLUMN_WIDTH

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setDialogOpen(true)
  }

  const handleAddEvent = () => {
    setSelectedEvent(null)
    setDialogOpen(true)
  }

  const handleSaveEvent = (eventData: Omit<Event, "id"> | Event) => {
    if ("id" in eventData) {
      updateEvent(eventData.id, eventData)
    } else {
      addEvent(eventData)
    }
  }

  const handleAddVenue = (name: string) => {
    addVenue(name)
  }

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading scheduler...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header with day tabs */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <h1 className="text-xl font-semibold">Event Scheduler</h1>
        <MuiButton
          onClick={handleAddEvent}
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none" }}
        >
          Add Event
        </MuiButton>
      </div>

      {/* Day tabs - horizontally scrollable */}
      <DayTabs days={weekDays} selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed time column */}
        <div className="flex-shrink-0 border-r border-border bg-card" style={{ width: TIME_COLUMN_WIDTH }}>
          {/* Empty space for venue header alignment */}
          <div className="h-[45px] border-b border-border bg-muted" />
          {/* Time slots */}
          <div className="overflow-hidden h-[calc(100%-45px)]">
            <div
              style={{
                transform: `translateY(-${scrollContainerRef.current?.scrollTop || 0}px)`,
              }}
            >
              <TimeColumn timeSlots={timeSlots} slotHeight={SLOT_HEIGHT} />
            </div>
          </div>
        </div>

        {/* Scrollable area (venue headers + events) */}
        <div className="flex-1 overflow-hidden">
          {/* Sticky venue header */}
          <div className="overflow-x-hidden overflow-y-hidden h-[45px]" style={{ scrollbarWidth: "none" }}>
            <div ref={venueHeaderRef} className="flex whitespace-nowrap" style={{ minWidth: totalWidth }}>
              <VenueHeader
                venues={venues}
                columnWidth={COLUMN_WIDTH}
                onAddVenue={() => setVenueDialogOpen(true)}
                onDeleteVenue={deleteVenue}
              />
            </div>
          </div>

          {/* Event grid with synchronized scroll */}
          <div
            ref={scrollContainerRef}
            className="h-[calc(100%-45px)] overflow-auto bg-muted/30"
            onScroll={() => {
              const el = scrollContainerRef.current
              if (el) {
                const timeCol = el.parentElement?.previousElementSibling?.querySelector(
                  "div:last-child > div",
                ) as HTMLElement
                if (timeCol) {
                  timeCol.style.transform = `translateY(-${el.scrollTop}px)`
                }
                if (venueHeaderRef.current) {
                  venueHeaderRef.current.style.transform = `translateX(-${el.scrollLeft}px)`
                }
              }
            }}
          >
            <div style={{ minWidth: totalWidth }}>
              <EventGrid
                venues={venues}
                events={events}
                timeSlots={timeSlots}
                columnWidth={COLUMN_WIDTH}
                slotHeight={SLOT_HEIGHT}
                selectedDate={selectedDate}
                onEventClick={handleEventClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Event dialog */}
      <EventDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        event={selectedEvent}
        venues={venues}
        selectedDate={selectedDate}
        onSave={handleSaveEvent}
        onDelete={deleteEvent}
      />

      <VenueDialog open={venueDialogOpen} onOpenChange={setVenueDialogOpen} onSave={handleAddVenue} />
    </div>
  )
}

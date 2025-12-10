"use client"

import { useState, useEffect, useCallback } from "react"
import type { Event, Venue, SchedulerData } from "@/types/scheduler"
import { loadSchedulerData, saveSchedulerData, generateId } from "@/lib/scheduler-utils"

export function useScheduler() {
  const [data, setData] = useState<SchedulerData>({ events: [], venues: [] })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loaded = loadSchedulerData()
    setData(loaded)
    setIsLoaded(true)
  }, [])

  const updateData = useCallback((newData: SchedulerData) => {
    setData(newData)
    saveSchedulerData(newData)
  }, [])

  const addEvent = useCallback(
    (event: Omit<Event, "id">) => {
      const newEvent: Event = { ...event, id: generateId() }
      const newData = { ...data, events: [...data.events, newEvent] }
      updateData(newData)
      return newEvent
    },
    [data, updateData],
  )

  const updateEvent = useCallback(
    (id: string, updates: Partial<Event>) => {
      const newEvents = data.events.map((event) => (event.id === id ? { ...event, ...updates } : event))
      updateData({ ...data, events: newEvents })
    },
    [data, updateData],
  )

  const deleteEvent = useCallback(
    (id: string) => {
      const newEvents = data.events.filter((event) => event.id !== id)
      updateData({ ...data, events: newEvents })
    },
    [data, updateData],
  )

  const addVenue = useCallback(
    (name: string) => {
      const newVenue: Venue = { id: generateId(), name }
      const newData = { ...data, venues: [...data.venues, newVenue] }
      updateData(newData)
      return newVenue
    },
    [data, updateData],
  )

  const deleteVenue = useCallback(
    (id: string) => {
      const newVenues = data.venues.filter((venue) => venue.id !== id)
      // Update events: remove venue from venueIds or delete event if it only has this venue
      const newEvents = data.events
        .map((event) => {
          if (event.venueIds && event.venueIds.includes(id)) {
            const updatedVenueIds = event.venueIds.filter((vId) => vId !== id)
            if (updatedVenueIds.length === 0) return null // Delete event if no venues left
            return { ...event, venueIds: updatedVenueIds, venueId: updatedVenueIds[0] }
          }
          if (event.venueId === id) return null // Delete single-venue event
          return event
        })
        .filter((event): event is Event => event !== null)
      updateData({ ...data, venues: newVenues, events: newEvents })
    },
    [data, updateData],
  )

  const getEventsForDateAndVenue = useCallback(
    (date: string, venueId: string) => {
      return data.events.filter((event) => event.date === date && event.venueId === venueId)
    },
    [data.events],
  )

  return {
    events: data.events,
    venues: data.venues,
    isLoaded,
    addEvent,
    updateEvent,
    deleteEvent,
    addVenue,
    deleteVenue,
    getEventsForDateAndVenue,
  }
}

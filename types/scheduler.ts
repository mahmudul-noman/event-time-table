export interface Event {
  id: string
  title: string
  venueId: string // For backward compatibility and single venue events
  venueIds?: string[] // For multi-venue events
  date: string // YYYY-MM-DD format
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  color?: string
}

export interface Venue {
  id: string
  name: string
}

export interface SchedulerData {
  events: Event[]
  venues: Venue[]
}

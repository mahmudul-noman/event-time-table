import type { Event, Venue, SchedulerData } from "@/types/scheduler"

const STORAGE_KEY = "scheduler-data"

// Default venues
const defaultVenues: Venue[] = [
  { id: "venue-1", name: "Venue 1" },
  { id: "venue-2", name: "Venue 2" },
  { id: "venue-3", name: "Venue 3" },
  { id: "venue-4", name: "Venue 4" },
  { id: "venue-5", name: "Venue 5" },
  { id: "venue-6", name: "Venue 6" },
  { id: "venue-7", name: "Venue 7" },
  { id: "venue-8", name: "Venue 8" },
  { id: "venue-9", name: "Venue 9" },
  { id: "venue-10", name: "Venue 10" },
]

// Sample events for demonstration
const generateSampleEvents = (): Event[] => {
  const today = new Date()
  const dateStr = formatDate(today)

  return [
    {
      id: "event-1",
      title: "Team Meeting",
      venueId: "venue-1",
      date: dateStr,
      startTime: "09:00",
      endTime: "10:00",
      color: "#3b82f6",
    },
    {
      id: "event-2",
      title: "Workshop",
      venueId: "venue-2",
      date: dateStr,
      startTime: "09:30",
      endTime: "11:00",
      color: "#10b981",
    },
    {
      id: "event-3",
      title: "Presentation",
      venueId: "venue-3",
      date: dateStr,
      startTime: "10:00",
      endTime: "10:45",
      color: "#f59e0b",
    },
    {
      id: "event-4",
      title: "Training Session",
      venueId: "venue-1",
      date: dateStr,
      startTime: "11:00",
      endTime: "12:30",
      color: "#ef4444",
    },
    {
      id: "event-5",
      title: "Lunch Meeting",
      venueId: "venue-4",
      date: dateStr,
      startTime: "12:00",
      endTime: "13:00",
      color: "#8b5cf6",
    },
    {
      id: "event-6",
      title: "Client Call",
      venueId: "venue-5",
      date: dateStr,
      startTime: "14:00",
      endTime: "15:30",
      color: "#ec4899",
    },
  ]
}

export function loadSchedulerData(): SchedulerData {
  if (typeof window === "undefined") {
    return { events: [], venues: defaultVenues }
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      // If parsing fails, return defaults with sample data
    }
  }

  // Initialize with default data
  const initialData: SchedulerData = {
    events: generateSampleEvents(),
    venues: defaultVenues,
  }
  saveSchedulerData(initialData)
  return initialData
}

export function saveSchedulerData(data: SchedulerData): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function getWeekDays(baseDate: Date = new Date()): Date[] {
  const days: Date[] = []
  const startOfWeek = new Date(baseDate)
  const dayOfWeek = startOfWeek.getDay()
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // Adjust to Monday
  startOfWeek.setDate(startOfWeek.getDate() + diff)

  for (let i = 0; i < 14; i++) {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    days.push(day)
  }

  return days
}

export function getDayName(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" })
}

export function generateTimeSlots(startHour = 9, endHour = 18): string[] {
  const slots: string[] = []
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      if (hour === endHour && minute > 0) break
      slots.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`)
    }
  }
  return slots
}

export function formatTimeTo12Hour(time: string): string {
  const [hours, minutes] = time.split(":").map(Number)
  const period = hours >= 12 ? "PM" : "AM"
  const hour12 = hours % 12 || 12
  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

export function calculateEventPosition(startTime: string, firstSlotTime: string, slotHeight: number): number {
  const startMinutes = timeToMinutes(startTime)
  const firstSlotMinutes = timeToMinutes(firstSlotTime)
  return ((startMinutes - firstSlotMinutes) / 15) * slotHeight
}

export function calculateEventHeight(startTime: string, endTime: string, slotHeight: number): number {
  const startMinutes = timeToMinutes(startTime)
  const endMinutes = timeToMinutes(endTime)
  const durationMinutes = endMinutes - startMinutes
  return (durationMinutes / 15) * slotHeight
}

export function generateId(): string {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

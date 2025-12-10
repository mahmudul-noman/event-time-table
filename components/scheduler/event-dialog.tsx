"use client"

import { useState, useEffect } from "react"
import type { Event, Venue } from "@/types/scheduler"
import MuiDialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import MuiButton from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MuiSelect from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Checkbox from "@mui/material/Checkbox"
import ListItemText from "@mui/material/ListItemText"
import Chip from "@mui/material/Chip"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { formatTimeTo12Hour } from "@/lib/scheduler-utils"

interface EventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event: Event | null
  venues: Venue[]
  selectedDate: string
  onSave: (event: Omit<Event, "id"> | Event) => void
  onDelete?: (id: string) => void
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"]

function generateTimeOptions(): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
      options.push({ value, label: formatTimeTo12Hour(value) })
    }
  }
  return options
}

const TIME_OPTIONS = generateTimeOptions()

export function EventDialog({ open, onOpenChange, event, venues, selectedDate, onSave, onDelete }: EventDialogProps) {
  const [title, setTitle] = useState("")
  const [venueIds, setVenueIds] = useState<string[]>([])
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("10:00")
  const [color, setColor] = useState(COLORS[0])

  useEffect(() => {
    if (event) {
      setTitle(event.title)
      // Support both single venue and multi-venue events
      setVenueIds(event.venueIds || [event.venueId])
      setStartTime(event.startTime)
      setEndTime(event.endTime)
      setColor(event.color || COLORS[0])
    } else {
      setTitle("")
      setVenueIds(venues[0]?.id ? [venues[0].id] : [])
      setStartTime("09:00")
      setEndTime("10:00")
      setColor(COLORS[Math.floor(Math.random() * COLORS.length)])
    }
  }, [event, venues, open])

  const handleSave = () => {
    if (!title.trim() || venueIds.length === 0) return

    const eventData = {
      ...(event && { id: event.id }),
      title: title.trim(),
      venueId: venueIds[0], // Primary venue for backward compatibility
      venueIds: venueIds,
      date: event?.date || selectedDate,
      startTime,
      endTime,
      color,
    }

    onSave(eventData as Event)
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id)
      onOpenChange(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <MuiDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{event ? "Edit Event" : "New Event"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
          <TextField
            autoFocus
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
          />

          <FormControl fullWidth>
            <InputLabel id="venue-label">Venues</InputLabel>
            <MuiSelect
              labelId="venue-label"
              id="venue"
              multiple
              value={venueIds}
              label="Venues"
              onChange={(e) => setVenueIds(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const venue = venues.find(v => v.id === value)
                    return <Chip key={value} label={venue?.name || value} size="small" />
                  })}
                </Box>
              )}
            >
              {venues.map((venue) => (
                <MenuItem key={venue.id} value={venue.id}>
                  <Checkbox checked={venueIds.indexOf(venue.id) > -1} />
                  <ListItemText primary={venue.name} />
                </MenuItem>
              ))}
            </MuiSelect>
          </FormControl>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="start-time-label">Start Time</InputLabel>
              <MuiSelect
                labelId="start-time-label"
                id="startTime"
                value={startTime}
                label="Start Time"
                onChange={(e) => setStartTime(e.target.value)}
                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
              >
                {TIME_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="end-time-label">End Time</InputLabel>
              <MuiSelect
                labelId="end-time-label"
                id="endTime"
                value={endTime}
                label="End Time"
                onChange={(e) => setEndTime(e.target.value)}
                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
              >
                {TIME_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
              Color
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {COLORS.map((c) => (
                <Box
                  key={c}
                  component="button"
                  type="button"
                  onClick={() => setColor(c)}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: c,
                    border: "none",
                    cursor: "pointer",
                    transition: "transform 0.15s, box-shadow 0.15s",
                    transform: color === c ? "scale(1.15)" : "scale(1)",
                    boxShadow: color === c ? `0 0 0 2px white, 0 0 0 4px ${c}` : "none",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, justifyContent: "space-between" }}>
        <Box>
          {event && onDelete && (
            <MuiButton onClick={handleDelete} variant="contained" color="error">
              Delete
            </MuiButton>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <MuiButton onClick={handleClose} variant="outlined" color="inherit">
            Cancel
          </MuiButton>
          <MuiButton onClick={handleSave} variant="contained" disabled={!title.trim() || venueIds.length === 0}>
            Save
          </MuiButton>
        </Box>
      </DialogActions>
    </MuiDialog>
  )
}

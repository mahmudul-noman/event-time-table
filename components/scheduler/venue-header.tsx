"use client"

import type { Venue } from "@/types/scheduler"
import MuiButton from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"

interface VenueHeaderProps {
  venues: Venue[]
  columnWidth: number
  onAddVenue?: () => void
  onDeleteVenue?: (id: string) => void
}

export function VenueHeader({ venues, columnWidth, onAddVenue, onDeleteVenue }: VenueHeaderProps) {
  return (
    <div className="inline-flex flex-nowrap">
      {venues.map((venue) => (
        <div
          key={venue.id}
          className="group relative border-r border-b border-border bg-muted px-2 py-3 text-center font-medium text-sm"
          style={{ width: columnWidth, minWidth: columnWidth, maxWidth: columnWidth }}
        >
          <span className="truncate block whitespace-nowrap">{venue.name}</span>
          {onDeleteVenue && (
            <IconButton
              onClick={() => onDeleteVenue(venue.id)}
              size="small"
              sx={{
                padding: "2px",
                position: "absolute",
                top: 4,
                right: 4,
                opacity: 0,
                transition: "opacity 0.2s",
                ".group:hover &": { opacity: 1 },
                "&:hover": { color: "error.main", backgroundColor: "error.light" },
              }}
            >
              <CloseIcon sx={{ fontSize: 14 }} />
            </IconButton>
          )}
        </div>
      ))}
      {onAddVenue && (
        <div
          className="border-r border-b border-border bg-muted/50 flex items-center justify-center"
          style={{ width: columnWidth, minWidth: columnWidth, maxWidth: columnWidth }}
        >
          <MuiButton
            variant="text"
            size="small"
            onClick={onAddVenue}
            startIcon={<AddIcon />}
            sx={{ textTransform: "none", color: "text.secondary" }}
          >
            Add Venue
          </MuiButton>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import MuiDialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import MuiButton from "@mui/material/Button"
import TextField from "@mui/material/TextField"

interface VenueDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (name: string) => void
}

export function VenueDialog({ open, onOpenChange, onSave }: VenueDialogProps) {
  const [name, setName] = useState("")

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim())
      setName("")
      onOpenChange(false)
    }
  }

  const handleClose = () => {
    setName("")
    onOpenChange(false)
  }

  return (
    <MuiDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Venue</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="venue-name"
          label="Venue Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter venue name..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave()
          }}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <MuiButton onClick={handleClose} variant="outlined" color="inherit">
          Cancel
        </MuiButton>
        <MuiButton onClick={handleSave} variant="contained" disabled={!name.trim()}>
          Add Venue
        </MuiButton>
      </DialogActions>
    </MuiDialog>
  )
}

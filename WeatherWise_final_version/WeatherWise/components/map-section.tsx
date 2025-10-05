"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin } from "lucide-react"
import { format } from "date-fns"

interface MapSectionProps {
  location: { lat: number; lon: number }
  setLocation: (location: { lat: number; lon: number }) => void
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
  onCalculate: () => void
}

export function MapSection({ location, setLocation, selectedDate, setSelectedDate, onCalculate }: MapSectionProps) {
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Convert click position to approximate lat/lon
    const lon = (x / rect.width) * 360 - 180
    const lat = 90 - (y / rect.height) * 180

    setLocation({
      lat: Math.round(lat * 10000) / 10000,
      lon: Math.round(lon * 10000) / 10000,
    })
  }

  return (
    <div className="space-y-4">
      {/* Interactive Map */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Select Location
        </h3>
        <div
          className="relative w-full aspect-[4/3] bg-secondary rounded-lg overflow-hidden cursor-crosshair border border-border"
          onClick={handleMapClick}
        >
          <img src="/world-map-dark-theme-nasa-style.jpg" alt="World Map" className="w-full h-full object-cover opacity-70" />
          <div
            className="absolute w-4 h-4 bg-accent rounded-full border-2 border-accent-foreground shadow-lg"
            style={{
              left: `${((location.lon + 180) / 360) * 100}%`,
              top: `${((90 - location.lat) / 180) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        </div>
        <div className="mt-3 p-3 bg-secondary/50 rounded-md">
          <p className="text-sm font-mono">
            <span className="text-muted-foreground">Coordinates:</span>{" "}
            <span className="text-foreground font-semibold">
              Lat: {location.lat.toFixed(4)}, Lon: {location.lon.toFixed(4)}
            </span>
          </p>
        </div>
      </Card>

      {/* Date Selector */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary" />
          Select Date
        </h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
          </PopoverContent>
        </Popover>
      </Card>

      {/* Calculate Button */}
      <Button
        onClick={onCalculate}
        className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90"
        size="lg"
      >
        Calculate Probabilities
      </Button>
    </div>
  )
}

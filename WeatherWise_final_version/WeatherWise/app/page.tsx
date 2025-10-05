"use client"

import { useState } from "react"
import { MapSection } from "@/components/map-section"
import { ResultsPanel } from "@/components/results-panel"
import { TrendPanel } from "@/components/trend-panel"
import { Satellite } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [location, setLocation] = useState({ lat: 37.7749, lon: -122.4194 })
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showResults, setShowResults] = useState(false)
  const [probabilities, setProbabilities] = useState({
    hot: 65,
    cold: 10,
    windy: 25,
    humid: 40,
    uncomfortable: 55,
  })

  const handleCalculate = () => {
    // Simulate calculation with random values
    setProbabilities({
      hot: Math.floor(Math.random() * 80) + 10,
      cold: Math.floor(Math.random() * 40) + 5,
      windy: Math.floor(Math.random() * 60) + 10,
      humid: Math.floor(Math.random() * 70) + 15,
      uncomfortable: Math.floor(Math.random() * 70) + 20,
    })
    setShowResults(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Satellite className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-balance">WeatherWise</h1>
                <p className="text-xs text-muted-foreground">Know Before You Go</p>
              </div>
            </div>
            <Link
              href="/viewer"
              className="inline-flex items-center rounded-md border border-primary/40 px-3 py-1 text-sm font-medium text-primary transition hover:border-primary hover:text-primary"
            >
              NASA Deep Zoom
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-balance">Historical Extreme Weather Probability</h2>
          <p className="text-muted-foreground text-pretty">
            Explore historical climate data from NASA Earth observations to understand extreme weather patterns at any
            location
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Map and Controls */}
          <MapSection
            location={location}
            setLocation={setLocation}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onCalculate={handleCalculate}
          />

          {/* Right Column - Results */}
          <ResultsPanel
            location={location}
            selectedDate={selectedDate}
            probabilities={probabilities}
            showResults={showResults}
          />
        </div>

        {/* Trend Panel */}
        {showResults && (
          <div className="mt-6">
            <TrendPanel location={location} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Prototype built for NASA Space Apps Challenge – WeatherWise © 2025
        </div>
      </footer>
    </div>
  )
}

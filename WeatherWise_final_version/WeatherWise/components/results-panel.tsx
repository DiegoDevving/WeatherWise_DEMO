"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame, Snowflake, Wind, Droplets, Frown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { RadarChart } from "@/components/radar-chart"

interface ResultsPanelProps {
  location: { lat: number; lon: number }
  selectedDate: Date | undefined
  probabilities: {
    hot: number
    cold: number
    windy: number
    humid: number
    uncomfortable: number
  }
  showResults: boolean
}

const conditions = [
  {
    key: "hot" as const,
    label: "Very Hot",
    icon: Flame,
    color: "text-[oklch(0.60_0.20_25)]",
    bgColor: "bg-[oklch(0.60_0.20_25)]/10",
    progressColor: "bg-[oklch(0.60_0.20_25)]",
  },
  {
    key: "cold" as const,
    label: "Very Cold",
    icon: Snowflake,
    color: "text-[oklch(0.60_0.15_240)]",
    bgColor: "bg-[oklch(0.60_0.15_240)]/10",
    progressColor: "bg-[oklch(0.60_0.15_240)]",
  },
  {
    key: "windy" as const,
    label: "Very Windy",
    icon: Wind,
    color: "text-[oklch(0.55_0.05_240)]",
    bgColor: "bg-[oklch(0.55_0.05_240)]/10",
    progressColor: "bg-[oklch(0.55_0.05_240)]",
  },
  {
    key: "humid" as const,
    label: "Very Humid",
    icon: Droplets,
    color: "text-[oklch(0.65_0.15_200)]",
    bgColor: "bg-[oklch(0.65_0.15_200)]/10",
    progressColor: "bg-[oklch(0.65_0.15_200)]",
  },
  {
    key: "uncomfortable" as const,
    label: "Very Uncomfortable",
    icon: Frown,
    color: "text-[oklch(0.65_0.18_35)]",
    bgColor: "bg-[oklch(0.65_0.18_35)]/10",
    progressColor: "bg-[oklch(0.65_0.18_35)]",
  },
]

export function ResultsPanel({ location, selectedDate, probabilities, showResults }: ResultsPanelProps) {
  if (!showResults) {
    return (
      <Card className="p-8 flex items-center justify-center min-h-[600px]">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Flame className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Ready to Analyze</h3>
          <p className="text-muted-foreground text-pretty max-w-sm">
            Select a location on the map and choose a date to calculate historical extreme weather probabilities
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Results</h3>
            <p className="text-sm text-muted-foreground">
              {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Date not selected"} at{" "}
              <span className="font-mono">
                {location.lat.toFixed(2)}°, {location.lon.toFixed(2)}°
              </span>
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
        </div>
      </Card>

      {/* Probability Cards */}
      <div className="grid grid-cols-1 gap-3">
        {conditions.map((condition) => {
          const Icon = condition.icon
          const probability = probabilities[condition.key]

          return (
            <Card key={condition.key} className={`p-4 ${condition.bgColor} border-border`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-background/50`}>
                    <Icon className={`h-5 w-5 ${condition.color}`} />
                  </div>
                  <span className="font-semibold">{condition.label}</span>
                </div>
                <span className="text-2xl font-bold">{probability}%</span>
              </div>
              <Progress value={probability} className="h-2" />
            </Card>
          )
        })}
      </div>

      {/* Radar Chart */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Probability Comparison</h3>
        <RadarChart probabilities={probabilities} />
      </Card>

      {/* Explanation */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <p className="text-sm text-muted-foreground text-pretty">
          <span className="font-semibold text-foreground">Data Source:</span> These probabilities are based on
          historical NASA POWER data (2000–2024) for the selected point and date.
        </p>
      </Card>
    </div>
  )
}

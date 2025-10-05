"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

interface TrendPanelProps {
  location: { lat: number; lon: number }
}

export function TrendPanel({ location }: TrendPanelProps) {
  // Generate sample historical trend data
  const data = Array.from({ length: 20 }, (_, i) => ({
    year: 2005 + i,
    probability: 45 + Math.random() * 25 + i * 0.8, // Simulated upward trend
  }))

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Historical Trend Analysis
          </h3>
          <p className="text-sm text-muted-foreground text-pretty">
            20-year trend of extreme heat events at this location
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.03 240)" />
          <XAxis dataKey="year" stroke="oklch(0.65 0.02 240)" tick={{ fill: "oklch(0.65 0.02 240)", fontSize: 11 }} />
          <YAxis
            stroke="oklch(0.65 0.02 240)"
            tick={{ fill: "oklch(0.65 0.02 240)", fontSize: 11 }}
            domain={[0, 100]}
            label={{ value: "Probability (%)", angle: -90, position: "insideLeft", fill: "oklch(0.65 0.02 240)" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(0.18 0.03 240)",
              border: "1px solid oklch(0.28 0.03 240)",
              borderRadius: "8px",
              color: "oklch(0.98 0 0)",
            }}
          />
          <Line
            type="monotone"
            dataKey="probability"
            stroke="oklch(0.60 0.20 25)"
            strokeWidth={2}
            dot={{ fill: "oklch(0.60 0.20 25)", r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Trend Analysis:</span> Increase of 12% in extreme heat events during June over
          the last 20 years at this location.
        </p>
      </div>
    </Card>
  )
}

"use client"

import {
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts"

interface RadarChartProps {
  probabilities: {
    hot: number
    cold: number
    windy: number
    humid: number
    uncomfortable: number
  }
}

export function RadarChart({ probabilities }: RadarChartProps) {
  const data = [
    { condition: "Hot", value: probabilities.hot },
    { condition: "Cold", value: probabilities.cold },
    { condition: "Windy", value: probabilities.windy },
    { condition: "Humid", value: probabilities.humid },
    { condition: "Uncomfortable", value: probabilities.uncomfortable },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsRadar data={data}>
        <PolarGrid stroke="oklch(0.28 0.03 240)" />
        <PolarAngleAxis dataKey="condition" tick={{ fill: "oklch(0.98 0 0)", fontSize: 12 }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "oklch(0.65 0.02 240)", fontSize: 10 }} />
        <Radar
          name="Probability"
          dataKey="value"
          stroke="oklch(0.45 0.15 250)"
          fill="oklch(0.45 0.15 250)"
          fillOpacity={0.6}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  )
}

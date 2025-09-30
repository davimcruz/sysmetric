"use client"

import { ReactNode } from "react"

type SectionProps = {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({ title, description, children, className }: SectionProps) {
  return (
    <div className={`space-y-4 ${className || ''}`}>
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {description && (
          <p className="text-sm text-gray-700 mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}

type SectionCardProps = {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function SectionCard({ title, description, children, className }: SectionCardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-700 mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}
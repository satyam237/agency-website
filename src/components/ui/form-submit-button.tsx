"use client"

import React from "react"
import { ConfettiButton, confettiPresets } from "@/components/ui/confetti"
import type { ButtonProps } from "@/components/ui/button"

interface FormSubmitButtonProps extends ButtonProps {
  successMessage?: string
  confettiType?: 'success' | 'celebration' | 'gentle'
  onSuccess?: () => void
}

export function FormSubmitButton({ 
  successMessage = "Message sent successfully!",
  confettiType = 'success',
  onSuccess,
  children,
  ...props 
}: FormSubmitButtonProps) {
  const handleConfettiComplete = () => {
    if (successMessage) {
      // You could show a toast notification here
      console.log(successMessage)
    }
    onSuccess?.()
  }

  return (
    <ConfettiButton
      options={confettiPresets[confettiType]}
      onConfettiComplete={handleConfettiComplete}
      {...props}
    >
      {children}
    </ConfettiButton>
  )
}

interface MeetingButtonProps extends ButtonProps {
  onMeetingScheduled?: () => void
}

export function MeetingButton({ 
  onMeetingScheduled,
  children,
  ...props 
}: MeetingButtonProps) {
  const handleConfettiComplete = () => {
    console.log("Meeting scheduled successfully!")
    onMeetingScheduled?.()
  }

  return (
    <ConfettiButton
      options={confettiPresets.meeting}
      onConfettiComplete={handleConfettiComplete}
      {...props}
    >
      {children}
    </ConfettiButton>
  )
}
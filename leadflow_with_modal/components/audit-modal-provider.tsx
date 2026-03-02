'use client'

import { useEffect, useState } from 'react'
import { AuditModal } from '@/components/audit-modal'

declare global {
  interface WindowEventMap {
    'open-audit-modal': CustomEvent
  }
}

export function AuditModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener('open-audit-modal', handler)
    return () => window.removeEventListener('open-audit-modal', handler)
  }, [])

  return (
    <>
      {children}
      <AuditModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export function openAuditModal() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('open-audit-modal'))
}

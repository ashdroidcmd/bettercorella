'use client'

import { useEffect, useState } from 'react'
import { createBudgetClient } from '../../shared/budget-api/client'
import { resolveProjects, type ProjectsResult } from '../../shared/budget-api/scope'

export type LiveState = { status: 'snapshot' } | { status: 'live'; checkedAt: string }

/**
 * Starts from the committed snapshot (prerendered, works offline), then asks the Budget API for the
 * same FY2027 lines. On success the fresh list replaces the snapshot; on any failure the snapshot
 * stays and nothing is shown. The GAA history is enacted law and does not change, so it is not refetched.
 */
export function useLiveBudget(snapshot: ProjectsResult): { data: ProjectsResult; live: LiveState } {
  const [state, setState] = useState<{ data: ProjectsResult; live: LiveState }>({
    data: snapshot,
    live: { status: 'snapshot' },
  })

  useEffect(() => {
    let active = true
    resolveProjects(createBudgetClient())
      .then((data) => {
        if (active) setState({ data, live: { status: 'live', checkedAt: new Date().toISOString() } })
      })
      .catch(() => {
        /* Offline or API down: keep the snapshot. */
      })
    return () => {
      active = false
    }
  }, [])

  return state
}

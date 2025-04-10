'use client'

import { useEffect, useState } from 'react'
import { LeadsTable } from "@/components/dashboard/leads-table"
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    convertedLeads: 0,
  })
  const [recentLeads, setRecentLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all leads for stats
        const { data: allLeads, error: allLeadsError } = await supabase
          .from('leads')
          .select('*')

        if (allLeadsError) {
          console.error('Error fetching all leads:', allLeadsError)
          return
        }

        // Calculate stats
        const newStats = {
          totalLeads: allLeads?.length || 0,
          newLeads: allLeads?.filter(lead => lead.status === 'NEW').length || 0,
          qualifiedLeads: allLeads?.filter(lead => lead.status === 'QUALIFIED').length || 0,
          convertedLeads: allLeads?.filter(lead => lead.status === 'CONVERTED').length || 0,
        }
        setStats(newStats)

        // Fetch recent leads
        const { data: recentData, error: recentError } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10)

        if (recentError) {
          console.error('Error fetching recent leads:', recentError)
          return
        }

        setRecentLeads(recentData || [])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-gray-500">Welcome to your QuoteLinker dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Leads</p>
              <p className="text-2xl font-bold">{stats.totalLeads}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm font-medium text-gray-500">New Leads</p>
              <p className="text-2xl font-bold text-green-600">{stats.newLeads}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Qualified Leads</p>
              <p className="text-2xl font-bold text-blue-600">{stats.qualifiedLeads}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Converted</p>
              <p className="text-2xl font-bold text-purple-600">{stats.convertedLeads}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Recent Leads</h3>
          <a
            href="/dashboard/leads"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all leads
          </a>
        </div>
        <LeadsTable leads={recentLeads} />
      </div>
    </div>
  )
} 
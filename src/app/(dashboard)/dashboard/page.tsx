import { PrismaClient } from "@prisma/client"
import { LeadsTable } from "@/components/dashboard/leads-table"

const prisma = new PrismaClient()

async function getStats() {
  const [totalLeads, newLeads, qualifiedLeads, convertedLeads] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.lead.count({ where: { status: "QUALIFIED" } }),
    prisma.lead.count({ where: { status: "CONVERTED" } }),
  ])

  return {
    totalLeads,
    newLeads,
    qualifiedLeads,
    convertedLeads,
  }
}

async function getRecentLeads() {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  })
}

export default async function DashboardPage() {
  const stats = await getStats()
  const recentLeads = await getRecentLeads()

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
        <LeadsTable data={recentLeads} />
      </div>
    </div>
  )
} 
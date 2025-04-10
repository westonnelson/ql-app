import { PrismaClient } from "@prisma/client"
import { LeadsTable } from "@/components/dashboard/leads-table"
import { Button } from "@/components/ui/button"

const prisma = new PrismaClient()

async function getLeads() {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      assignedAgent: true,
    },
  })
}

export default async function LeadsPage() {
  const leads = await getLeads()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
          <p className="text-gray-500">Manage and track your insurance leads</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => {
              const csv = [
                // CSV Headers
                [
                  "Date",
                  "First Name",
                  "Last Name",
                  "Email",
                  "Phone",
                  "Coverage Amount",
                  "Insurance Type",
                  "Status",
                  "Lead Score",
                  "Source",
                ].join(","),
                // CSV Data
                ...leads.map((lead) => [
                  new Date(lead.createdAt).toLocaleDateString(),
                  lead.firstName,
                  lead.lastName,
                  lead.email,
                  lead.phone,
                  lead.coverageAmount,
                  lead.insuranceType,
                  lead.status,
                  lead.leadScore,
                  lead.source,
                ].join(",")),
              ].join("\n")

              const blob = new Blob([csv], { type: "text/csv" })
              const url = window.URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.setAttribute("hidden", "")
              a.setAttribute("href", url)
              a.setAttribute(
                "download",
                `leads-${new Date().toISOString().split("T")[0]}.csv`
              )
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
            }}
          >
            Export to CSV
          </Button>
          <Button>Assign Leads</Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm font-medium text-gray-500">New Leads</p>
                <p className="text-2xl font-bold text-green-600">
                  {leads.filter((lead) => lead.status === "NEW").length}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Contacted</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {leads.filter((lead) => lead.status === "CONTACTED").length}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Qualified</p>
                <p className="text-2xl font-bold text-blue-600">
                  {leads.filter((lead) => lead.status === "QUALIFIED").length}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Converted</p>
                <p className="text-2xl font-bold text-purple-600">
                  {leads.filter((lead) => lead.status === "CONVERTED").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <LeadsTable data={leads} />
      </div>
    </div>
  )
} 
import { UserButton, useUser } from "@clerk/nextjs"

export function UserNav() {
  const { user } = useUser()

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{user?.fullName}</p>
        <p className="text-xs leading-none text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
} 
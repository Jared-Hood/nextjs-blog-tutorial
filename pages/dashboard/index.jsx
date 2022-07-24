import Layout from "../../components/layout";
import { useSession, getSession } from "next-auth/react"

export default function Dashboard() {
  const { data: session, status } = useSession()

  return (
    <Layout>
      {session && (
        <h2>{session.user.name}'s Dashboard</h2>
      )}
      {!session && (
        <div>Login to view your dashboard</div>
      )}
    </Layout>
  )
}

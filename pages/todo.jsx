import Layout from "../components/layout"
import Todo from "../components/todo"

const items = [
  {
    name: "Add user authentication and access based routes",
    completed: false,
  },
  {
    name: "Convert this list to a hosted database with CRUD operations",
    completed: false,
  },
  {
    name: "Save user data and load into personal dashboard",
    completed: false,
  },
]

export default function About() {
  return (
    <Layout>
      <h1>
        Todo
      </h1>
      <div>
        Things to work on for this site
      </div>
      <ul>
        {items.map(item => <Todo name={item.name} completed={item.completed} />)}
      </ul>
    </Layout>
  )
}
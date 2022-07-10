export default function Todo({name, completed}) {
  return (
    <li key="name">
      <div style={{color: completed ? "green" : "red"}}>
        {name}
      </div>
    </li>
  )
}

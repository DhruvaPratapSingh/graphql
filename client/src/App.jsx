import './App.css'
import { useQuery, gql } from '@apollo/client';
function App() {
  return (
   <>
    <div>
    <h2>My first Apollo app 🚀</h2>
      <br/>
      <DisplayLocations />
    </div>
   </>
  )
}

export default App;

const GET_LOCATIONS=gql
`
query getAllTodos{
  getTodos {
    title
    completed
    user {
        name
        email
        phone
      }
    }
}`
;

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
       <table>
        <thead>
          <tr>
            <th className='bg-blue-900'>name</th>
            <th>title</th>
            <th>status</th>
            <th>mobile</th>
          </tr>
        </thead>
        <tbody>
        {data.getTodos.map(({ title, completed, user }) => (
     <tr key={user.phone}>
      <th>{user.name}</th>
     <th>About this task:</th>
     <th>{title}</th>
    <th>Completed: {completed ? "Yes" : "No"}</th>
     <th>Email: {user.email}</th>    
     </tr>
        ))}
        </tbody>
      </table>
    </>
  )

}
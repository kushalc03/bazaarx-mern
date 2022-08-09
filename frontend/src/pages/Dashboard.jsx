import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SaleForm from '../components/SaleForm'
import SaleItem from '../components/SaleItem'
import Spinner from '../components/Spinner'
import { getSales, reset } from '../features/sales/saleSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { sales, isLoading, isError, message } = useSelector(
    (state) => state.sales
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getSales())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Sales Dashboard</p>
      </section>

      <SaleForm />

      <section className='content'>
        {sales.length > 0 ? (
          <div className='sales'>
            {sales.map((sale) => (
              <SaleItem key={sale._id} sale={sale} />
            ))}
          </div>
        ) : (
          <h3>You have not set any sales</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard

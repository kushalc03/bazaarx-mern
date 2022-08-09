import { useDispatch } from 'react-redux'
import { deleteSale } from '../features/sales/saleSlice'

function SaleItem({ sale }) {
  const dispatch = useDispatch()

  return (
    <div className='sale'>
      <div>{new Date(sale.createdAt).toLocaleString('en-US')}</div>
      <h2>{sale.text}</h2>
      <button onClick={() => dispatch(deleteSale(sale._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default SaleItem

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createSale } from '../features/sales/saleSlice'

function SaleForm() {

  const [formData, setFormData] = useState({
    text: '',
    address: '',
  })

  const { text, address } = formData


  const dispatch = useDispatch()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createSale({ text, address }))
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Name of Item</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Address</label>
          <input
            type='address'
            name='address'
            id='address'
            value={address}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Sale
          </button>
        </div>
      </form>
    </section>
  )
}

export default SaleForm

import type { AddressData } from "./AddressForm"


const AddressCard = ({addr}: {addr: AddressData}) => {
  return (
    <div >
      <div className='border rounded-lg p-4'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='font-semibold text-lg'>{addr.locality}</h3>
         
            </div>
        <p className='text-gray-600 text-sm'>{addr.address}</p>
        <p className='text-gray-600 text-sm'>{addr.state}</p>
        <p className='text-gray-600 text-sm'>{addr.pinCode}</p>
          </div>


    </div>
  )
}

export default AddressCard
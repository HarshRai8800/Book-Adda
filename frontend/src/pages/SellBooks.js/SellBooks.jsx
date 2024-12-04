import React from 'react'
import { useForm } from 'react-hook-form'
import { AuthService } from '../../Axios.js/AuthService';
function SellBooks() {
const {register,handleSubmit}=useForm()
  const onSubmit =async (data) => {
    console.log("Form Data:", data);

try {
  const res = await AuthService.listBook(data)
  if(res){
    console.log(res)
    alert(`book uploaded successfully with title ${data.title} description ${data.description } quality ${data.quality} price ${data.price}`)
  }else{
    alert("try again something went wrong")
  }
} catch (error) {
  alert("Either duplicate book or Description is too long")
}

  };


return (
  <div className="w-screen h-[90vh] bg-black flex justify-center items-center text-white">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-[90%] max-w-[600px] bg-gray-800 p-6 rounded-md shadow-lg"
  >
    <h2 className="text-2xl font-bold mb-6 text-center">List Book For Sale</h2>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 text-sm">Title</label>
        <select
  name="title"
  {...register("title", {
    required: true,
  })}
  className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
>
 
  <option value="quantum_soft_skill">QUANTUM SOFT SKILL</option>
  <option value="quantum_physics">QUANTUM PHYSICS</option>
  <option value="quantum_chemistry">QUANTUM CHEMISTRY</option>
  <option value="quantum_electronics">QUANTUM ELECTRONICS</option>
  <option value="quantum_electrical">QUANTUM ELECTRICAL ENGINEERING</option>
  <option value="quantum_data_structures">QUANTUM DATA STRUCTURES AND ALGORITHMS</option>
  <option value="quantum_discrete_structures">QUANTUM DISCRETE STRUCTURES</option>
  <option value="quantum_maths_1_aktu">QUANTUM MATHS 1 (AKTU)</option>
  <option value="quantum_maths_2_aktu">QUANTUM MATHS 2 (AKTU)</option>
  <option value="quantum_maths_3_aktu">QUANTUM MATHS 3 (AKTU)</option>
  <option value="quantum_physics_aktu">QUANTUM PHYSICS (AKTU)</option>
  <option value="quantum_chemistry_aktu">QUANTUM CHEMISTRY (AKTU)</option>
  <option value="quantum_electronics_aktu">QUANTUM ELECTRONICS (AKTU)</option>
  <option value="quantum_electrical_aktu">QUANTUM ELECTRICAL ENGINEERING (AKTU)</option>
  <option value="quantum_data_structures_aktu">QUANTUM DATA STRUCTURES (AKTU)</option>
  <option value="quantum_discrete_structures_aktu">QUANTUM DISCRETE STRUCTURES NAD ALGORITHM (AKTU)</option>
  <option value="quantum_computer_organization_aktu">QUANTUM OF COMPUTER ORGANIZATION AND ARCHITECTURE (AKTU)</option>
  
</select>
      </div>

      <div>
        <label className="block mb-1 text-sm">Quality Rating Of Book</label>
        <select
          name="quality"
          {...register("quality",{
            required:true
          })}
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
        >
          {[...Array(10)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <label className="block mb-1 text-sm">Avatar</label>
        <input
          type="file"
          name="avatar"
          {...register("avatar",{
            required:true
          })}
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">Price</label>
        <input
          type="number"
          name="price"
          
          {...register("price",{
            required:true,
            min:20,
            max:70,
            pattern:/^[1-9]\d*$/

          })}
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>

    <div className="mt-4">
      <label className="block mb-1 text-sm">Description</label>
      <textarea
        name="description"
        {...register("description",{
          required:true,
          max:121,
          min:10,
          
        })}
        className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
        rows="3"
      ></textarea>
    </div>

    <div className="mt-6 text-center">
      <button
        type="submit"
        
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Submit
      </button>
    </div>
  </form>
</div>
);
}

export default SellBooks
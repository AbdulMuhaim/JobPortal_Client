import { useState } from "react";
import { useEffect } from "react";
import { addNewCategory, fetchCategories, editCategory } from "../../../api/AdminApi";
import  {toast}  from "react-hot-toast";


function CategoryTable() {

  const [newCategory, setNewCategory] = useState("");
  const [allCategories,setAllCategories] = useState([]);
  const [addCategoryInput, setAddCategoryInput] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempCategory,setTempCategory] = useState('')

     
  useEffect(()=>{
    fetchCategories()
    .then((res)=>{
      setAllCategories(res.data.categories)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

 

 
  


  const handleAddCategory = async () => {
    // Remove all white spaces from the new category name and convert to lowercase
    const normalizedCategory = newCategory.replace(/\s+/g, '').toLowerCase();
  
    // Check if the new category name already exists locally
    const isCategoryUnique = !allCategories.some(
      (category) =>
        category.categoryName.replace(/\s+/g, '').toLowerCase() ===
        normalizedCategory
    );
  
    // Check if the category name is empty or contains only whitespace
    const isWhitespaceOnly = /^\s*$/.test(newCategory);
  
    if (!isCategoryUnique) {
      toast.error("Category already exists.");
    } else if (isWhitespaceOnly) {
      toast.error("Category name cannot be empty or contain only whitespace.");
    } else {
      const response = await addNewCategory(newCategory);
      if (!response.data.err) {
        setAllCategories([...allCategories, { categoryName: newCategory}]);
        setAddCategoryInput(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  };




  const showEditModal = async (oldCategory)=>{
    setIsModalVisible(true)
    setTempCategory(oldCategory)
  }






  const handleEditCategory = async () => {
    // Remove all white spaces from the new category name and convert to lowercase
    const normalizedCategory = newCategory.replace(/\s+/g, '').toLowerCase();
  
    // Check if the new category name already exists locally
    const isCategoryUnique = !allCategories.some(
      (category) =>
        category.categoryName.replace(/\s+/g, '').toLowerCase() ===
        normalizedCategory
    );
  
    // Check if the category name is empty or contains only whitespace
    const isWhitespaceOnly = /^\s*$/.test(newCategory);
  
    if (!isCategoryUnique) {
      toast.error("Category already exists.");
    } else if (isWhitespaceOnly) {
      toast.error("Category name cannot be empty or contain only whitespace.");
    } else {
      const response = await editCategory(newCategory, tempCategory);
      if (!response.data.err) {
        const updatedCategories = allCategories.map(category => {
          if (category.categoryName === tempCategory) {
            return {
              categoryName: newCategory,
            };
          }
          return category;
        });

        setAllCategories(updatedCategories);
        setIsModalVisible(false);
        toast.success(response.data.message);

      } else {
        toast.error(response.data.message);
      }
    }
  };
  





    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between py-4 bg-blue-900 dark:bg-gray-900 ">
          <div>
            <button
              className="inline-flex items-center justify-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => setAddCategoryInput(true)}
            >
              Add Category
              <svg viewBox="0 0 10 6"></svg>
            </button>
          </div>
        </div>


        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No
              </th>
              <th scope="col" className="px-6 py-3">
                Category Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
  
          <tbody>
  {allCategories.map((data,index)=>(

<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
  {index+1}
</td>
<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
  {data.categoryName}
</td>
<td className="px-6 py-4">
  <a onClick={()=>showEditModal(data.categoryName)}
    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
  >
    Edit
  </a>
</td>
</tr>

))}

</tbody>
  </table>



  {isModalVisible && (
        <div
          id="defaultModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed flex justify-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <button
                  onClick={()=>setIsModalVisible(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-6 space-y-6">

              <input
              type="text"
              placeholder={tempCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />   
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={handleEditCategory}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  data-modal-hide="defaultModal"
                >
                  Modify Category
                </button>
              
              </div>
            </div>
          </div>
        </div>
      )}

  
        {addCategoryInput ? (
          <div>
            <input
              type="text"
              placeholder="New Category"
              onChange={(e) => setNewCategory(e.target.value)}
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="flex gap-4">
              <button
                onClick={handleAddCategory}
                className="block mt-2 w-30 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Add Category
              </button>
              <button
                onClick={()=>setAddCategoryInput(false)}
                className="block mt-2 px-4 w-30 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
  
  export default CategoryTable;
  




 
     


import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function Example(props) {
  const resumeRef = useRef()
  const letterRef = useRef()
  const [open, setOpen] = useState(true)
  const [resumeName,setResumeName] = useState('')

  const cancelButtonRef = useRef(null)

  const handleResumeUpload=()=>{
    resumeRef.current.click()
  }

  function handleFileSelect() {
    if (resumeRef.current && resumeRef.current.files.length > 0) {
        const selectedFile = resumeRef.current.files[0];
        setResumeName(selectedFile.name)
    }
}

  function submitModal(){
    props.submitFunction(resumeRef.current.files[0],letterRef.current.value)
    setOpen(false)
  }
  function cancelModal(){
    props.cancelFunction()
    setOpen(false)
  }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                <div className='w-full h-8  text-black px-4 mt-4 border-b-2'>Apply for the job</div>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-3  sm:pb-2">
                  <p>Resume</p>
                  <p className='text-xs'>Be sure to include an updated resume</p>
                  <div className="sm:flex sm:items-start">
                    <div className='card bg-slate-100 w-full px-1'>

                   
                       {resumeName && <div className='w-full h-14 my-1 rounded-lg bg-red-700 flex'>
    <div className='w-14 bg-red-700 h-full rounded-lg text-sm text-white flex justify-center items-center'>PDF</div>
    <div className='flex justify-between items-center px-3 bg-white h-full w-full'>
        <label>{resumeName}</label>    
    </div>
</div> }

                  </div>
                  </div>
                    <div className='w-full flex'>
                      <div onClick={()=>handleResumeUpload()} className='bg-white border border-blue-700 rounded-lg px-2 py-1 m-1 cursor-pointer hover:border-red-500 text-blue-700 text-sm '>
                      upload resume
                      </div>
                      <input type="file" name='newCV' className='hidden' ref={resumeRef} onChange={handleFileSelect}  />
                      </div>
                  <hr className='my-2 text-gray-100'/>
                  <div>Add a cover letter</div>
                  <textarea required name="coverLetter" id="" ref={letterRef} cols="62" rows="3" className='border w-full'></textarea>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={()=>submitModal(resumeRef.current.files[0],letterRef.current.value)}
                  >
                    Submit application
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={cancelModal}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>

          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

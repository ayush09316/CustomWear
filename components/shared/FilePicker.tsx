import React from 'react'
import {CustomButton} from '@/components';
import { DecalTypes } from '@/config/constants';


interface FilePickerProps{
  file:File | undefined;
  setFile:(file:File)=>void;
  readFile:(type:keyof typeof DecalTypes)=>void;
}

const FilePicker = ({file,setFile,readFile}:FilePickerProps) => {

  const fileUpload= (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }

  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input id='file-upload' type='file' accept='image/*' onChange={fileUpload}/>
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload File
        </label>
        <p className='mt-2 text-gray-500 text-xs truncate'>
          {file ? file.name : 'No file selected'}
        </p>
      </div>
      <div className='mt-4 flex flex-wrap gap-3'>
        <CustomButton type={'outline'} title={'Logo'} handleClick={()=>readFile('logo')} customStyles={'text-xs'}/>
        <CustomButton type={'filled'} title={'Full'} handleClick={()=>readFile('full')} customStyles={'text-xs'}/>
      </div>
    </div>
  )
}

export default FilePicker
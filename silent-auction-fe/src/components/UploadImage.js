import React, { useState } from 'react'

import '../App.css';
/** IF the current Image upload process not working then this should work */
function UploadImage(props) {
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
  //  data.append('upload_preset', 'darwin')
    setLoading(true)
    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/dihifeicm/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    console.log(file);

    setImage(file.secure_url)
    props.setitem({...props.item,imageUrl:file.secure_url})
    setLoading(false)
  }

  return (
    <div className="App">
      
      <input
        type="file"
        name="file"
        placeholder="Upload an image"
        onChange={uploadImage}
      />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} style={{ width: '300px' }} />
      )}
    </div>
  )
}

export default UploadImage;
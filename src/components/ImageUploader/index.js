import React, { useEffect, useState } from 'react';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import { fetchPhotos, openUploadWidget } from './CloudinaryService'

const ImageUploader = () => {
    const [images, setImages] = useState([]);
    const cloudinaryUrl = 'https://res.cloudinary.com/durbvhf8g/image/upload/v1/';

    const beginUpload = (e) => {
        e.preventDefault();
        const uploadOptions = {
            cloudName: "durbvhf8g",
            uploadPreset: "lj0cilml"
        };
        
        openUploadWidget(uploadOptions, (error, photos) => {
            if (!error) {
            console.log(photos);
                if(photos.event === 'success'){
                    setImages([...images, photos.info.public_id])
                    console.log(photos.info.public_id)
                }
            } else {
            console.log(error);
            }
        })
    }
    
    return (
        <CloudinaryContext cloudName="durbvhf8g">
            <div className="Upload">
                <button onClick={(e) => beginUpload(e)}>Incarcare imagine</button>
                {images[0] && (
                    <section>
                        <img key={images[0]} src={`${cloudinaryUrl}${images[0]}.png`} alt="" />
                    </section>
                )}
            </div>
            {images[0] && (
                <input type="hidden" name="img" value={`${cloudinaryUrl}${images[0]}.png`}></input>
            )}
        </CloudinaryContext>
    )
}

export default ImageUploader;
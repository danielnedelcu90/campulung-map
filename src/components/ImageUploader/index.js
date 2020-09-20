import React, { useEffect, useState } from 'react';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import { fetchPhotos, openUploadWidget } from './CloudinaryService'

const ImageUploader = () => {
    const [images, setImages] = useState([]);

    const beginUpload = tag => {
        const uploadOptions = {
            cloudName: "durbvhf8g",
            tags: [tag],
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
                <button onClick={() => beginUpload()}>Incarcare imagine</button>
                <section>
                    {images.map(i => <img key={i} src={i} alt="" />)}
                </section>
            </div>
        </CloudinaryContext>
    )
}

export default ImageUploader;
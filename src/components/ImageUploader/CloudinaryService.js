import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';

export const url = (publicId, options) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  const cl = CoreCloudinary.new();
  return cl.url(publicId, scOptions);
};

export const openUploadWidget = (options, callback) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  window.cloudinary.openUploadWidget(scOptions, callback);
};

export async function  fetchPhotos  (imageTag, setter)  {
  const options = {
  cloudName: 'durbvhf8g',
  format: 'json',
  type: 'list',
  version: Math.ceil(new Date().getTime() / 1000),
};

const urlPath = url(imageTag.toString(), options);

fetch(urlPath)
.then(res => res.text())
.then(text => (text ? setter(JSON.parse(text).resources.map(image => image.public_id)) : []))
.then(console.log(urlPath))
.catch(err => console.log(err));
};
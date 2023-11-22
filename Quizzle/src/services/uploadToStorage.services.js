import { listAll, ref as sRef } from 'firebase/storage';
import { imageStorageDb } from '../config/firebase-config';
//import { v4 } from 'uuid';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
//import { toast } from 'react-toastify';


export const uploadToStorage = (photo) => {

  
  if (photo === null) return;

  const imageRef = sRef(imageStorageDb, `images/${photo.name}`);

  return uploadBytes(imageRef, photo)
    .then((snapshot) => {
      //toast.success('Image uploaded successfully');
      return getDownloadURL(snapshot.ref).then((url) => {
// console.log(url)
        return url
      });
    })
};


const imagesListRef = sRef(imageStorageDb, "images/");

export const listImg = () => {
  return listAll(imagesListRef)
}
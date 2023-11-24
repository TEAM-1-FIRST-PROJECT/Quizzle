import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { updateUserData } from "../../services/users.services";
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from "../../common/constants";
import { useNavigate } from "react-router-dom";
import { uploadToStorage } from "../../services/uploadToStorage.services";
import { deleteObject, ref as sRef } from "firebase/storage";
import { imageStorageDb } from "../../config/firebase-config";

const Settings = () => {

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const updateForm = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const handleUpload = () => {
    uploadToStorage(profilePhoto)
      .then((url) => {
        setData({ ...userData, value: url });
      })
  };
  
  const handleFileChange = (e) => {
    if (profilePhoto) {
      const photoRef = sRef(imageStorageDb, `images/${profilePhoto.name}`);
      deleteObject(photoRef)
        .then(() => {
          console.log("Previous image deleted");
        })
        .catch((error) => {
          console.error("Error deleting image: ", error);
        });
    }
    setProfilePhoto(e.target.files[0]);

    const url = URL.createObjectURL(e.target.files[0]);
    setPreviewUrl(url);
  };

  const handleUpdateUserData = (e) => {
    e.preventDefault();
    if (form.firstName) {
      if (
        form.firstName.length < MIN_NAME_LENGTH ||
        form.firstName.length > MAX_NAME_LENGTH
      ) {
        alert("First Name is required");
        return;
      }
    }
    if (form.lastName) {
      if (
        form.lastName.length < MIN_NAME_LENGTH ||
        form.lastName.length > MAX_NAME_LENGTH
      ) {
        alert("Last Name is required");
        return;
      }
    }
    if (!form.email) {
      alert("Email is required");
      return;
    }
   
    if (!form.firstName) form.firstName = userData.firstName;
    if (!form.lastName) form.lastName = userData.lastName;
    if (!form.email) form.email = userData.email;

    updateUserData(
      userData.username,
      form.firstName,
      form.lastName,
      form.email,
      data.value
    ).then(() => {
      alert("Profile updated successfully")
      navigate("/");
    }).catch((err) => {
      alert(err.message)
    });
  };
  return (
    <>
     <div className="h-screen bg-hero-pattern-2 bg-cover flex flex-col">
      <form className="p-20 ml-36 mt-32">
        <div className="space-y-12 bg-white opacity-80 rounded-lg">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Photo
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              <label className="cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <div className="h-20 w-20 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500">
                  {previewUrl ? (
                    <img src={previewUrl} className="h-20 w-20 rounded-full" />
                  ) : (
                    "+"
                  )}
                </div>
              </label>
              <button
                type="button"
                onClick={handleUpload}
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Upload
              </button>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    onChange={updateForm("firstName")}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={updateForm("lastName")}
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
           <div className="sm:col-span-3">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                  Address
                </label>
                <div className="mt-2">
                  <input
                    onChange={updateForm("address")}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    onChange={updateForm("email")}
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleUpdateUserData}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save Changes
          </button>
        </div>
      </form>
      </div>
    </>
  );
};
export default Settings
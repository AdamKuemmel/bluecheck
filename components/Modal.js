import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

function Modal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);
    //create a post and add to firestore
    //get the post id for the newly create post
    //upload image to firebase storage with post id
    //get a download url from firebase storage and update OG post with image

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    console.log("New doc added with ID", docRef.id);
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto z-100"
        onClose={() => setOpen(false)}
        open={open}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="inline-block w-full max-w-md px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 ">
            <div>
              {selectedFile ? (
                <img
                  className="object-contain w-full cursor-pointer"
                  src={selectedFile}
                  onClick={() => setSelectedFile(null)}
                />
              ) : (
                <div
                  onClick={() => filePickerRef.current.click()}
                  className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full cursor-pointer "
                >
                  <CameraIcon
                    className="w-6 h-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
              )}

              <div>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-center text-gray-900"
                >
                  Upload a Photo!
                </Dialog.Title>
                <div>
                  <input
                    ref={filePickerRef}
                    type="file"
                    hidden
                    onChange={addImageToPost}
                  />
                </div>

                <div className="mt-2">
                  <input
                    ref={captionRef}
                    className="w-full text-center border-none focus:ring-0"
                    type="text"
                    placeholder="Please enter a caption..."
                    onChange={addImageToPost}
                  />
                </div>
              </div>

              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  disabled={!selectedFile}
                  onClick={uploadPost}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                >
                  {loading ? "Uploading" : "Upload Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Modal;

import { FolderName } from '../enums';
import { API_BASE_URL, BEARER_PREFIX, ResSuccess } from '../redux/api/apiSlice';
import { store } from '../redux/store';

export type UploadImage = {
  image: File;
  folderName?: FolderName;
};

/**
 * A function that uploads an image file to a server using FormData and
 * fetch, with optional folder name and authentication token.
 * @property {File} image - The `image` property is of type `File`, which represents a file selected by
 * the user through an input field. It needs to be an image file.
 * @property {FolderName} folderName - The `folderName` property is an optional parameter that
 * specifies the name of the folder where the image will be uploaded. If no folder name is provided,
 * the image will be uploaded to the default folder.
 */
export const uploadImage = async ({ image, folderName }: UploadImage) => {
  const state = store.getState(); // Get the Redux state
  const { token } = state.auth;

  const formData = new FormData();
  if (folderName) {
    formData.append('dynamicPath', folderName);
  }
  formData.append('image', image);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      Authorization: `${BEARER_PREFIX} ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    // Handle HTTP error status
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const result: ResSuccess<string> = await res.json();
  return result;
};

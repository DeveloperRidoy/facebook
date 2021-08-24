import { cloneDeep } from "lodash";

const convertToFormData = (initialData) => {
  const data = new FormData();
  const cloneData = cloneDeep(initialData);
  delete cloneData.photos;
  delete cloneData.videos;

  for (let key in cloneData) data.append(key, JSON.stringify(cloneData[key]));

  if (initialData.photos?.length > 0) {
    initialData.photos.forEach((photo) => data.append("photo", photo.file));
  }
  if (initialData.videos?.length > 0) {
    initialData.videos.forEach((video) => data.append("video", video.file));
  }
  return data;
};

module.exports = convertToFormData;

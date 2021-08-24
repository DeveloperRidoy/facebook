import Reader from "../../global/functions/fileReader";
import catchAsync from "./catchAsync";

// function to upload files
const uploadFiles = ({e, setState, setData, types = ['image', 'video'], readUrl = false, limit = 10}) =>
  catchAsync(async () => {
    const files = Object.values(e.target.files);
    const photos = [];
    const videos = [];

    // allow limited number of files
    if (files.length > limit) {
      return setState((state) => ({
        ...state,
        alert: {
          show: true,
          type: "danger",
          text: "only 10 files are allowed",
        },
      }));
    }
    const arrayOfPromises = files.map(async (file) => {
      const type = file.type;

      // only allow specific files 
         const exp = new RegExp(`^(${types.join("|")})`, "i");
      if (!exp.test(type)) {
        return setState((state) => ({
          ...state,
          alert: {
            show: true,
            type: "danger",
            text: "only images and videos are allowed",
          },
        }));
        }
        if (readUrl) {
            const url = await new Reader(file).getUrl();
            const data = { file, url };
            return data
        } else {
            return {file}
        }
    });

    const allFiles = await Promise.all(arrayOfPromises);
    allFiles.forEach((item) =>
      item.file.type.startsWith("image") ? photos.push(item) : videos.push(item)
    );

    setData((data) => ({
      ...data,
      photos: [...data.photos, ...photos],
      videos: [...data.videos, ...videos],
    }));

    // reset event 
    e.target.value = '';
  }, setState);

export default uploadFiles;

import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaCircle, FaCommentDots, FaHeart, FaThumbsUp, FaUsers } from "react-icons/fa";
import Spacer from '../../components/Spacer';

const Post = (post) => {
    const { user, type, group, text, images, videos, hearts, likes, answers, createdAt } = post;
    let postImages = [];
  for (let i = 1; i <= 46; i++) postImages.push(i);
  
    const [showImages, setShowImages] = useState(postImages.length > 4 ? 4: postImages.length)
    useEffect(() => {
      const filteredImages = [];
      for (let i = 1; i <= showImages; i++) filteredImages.push(i);
      postImages = filteredImages;
    }, [showImages])
    
    return (
      <div className="shadow bg-white dark:bg-dark py-3 rounded-lg mb-5">
        <div className="flex items-start justify-between px-3">
          <div className="flex gap-x-2">
            <img
              src={
                user?.photo
                  ? `img/users/${user?.photo}`
                  : "img/users/default/user.jpeg"
              }
              alt={user?.name || "user"}
              className="h-10 w-10 rounded-full border-blue-500"
            />
            <div>
              <p className="mt-[-5px]">
                <span className="capitalize font-semibold">
                  {user?.name || "user"}{" "}
                </span>
                <span className="text-gray-400">
                  {type === "question" ? "asked a question " : "posted in "}
                </span>
                <span className="capitalize font-semibold">
                  {group?.name || "this group"}
                </span>
              </p>
              <div className="flex items-center text-gray-400 text-sm gap-x-1">
                <span>{createdAt || "25m"}</span>
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                <FaUsers className="bg-gray-400 text-gray-800 rounded-full" />
              </div>
            </div>
          </div>
          <button className="p-3 rounded-full shadow dark:bg-dark text-lg text-gray-400 transition dark:hover:bg-dark-400 dark:active:scale-95">
            <BsThreeDots />
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="px-3">
            Naruto er moto ar kono anime ki ase?? One piece , one punch man ,
            attack on titan try korsilam kntu ekta o valo lage nai shob gular 10
            20ta episode dekhsi
          </p>
          <div className="grid grid-cols-2">
            {postImages.map(
              (img) =>
                img <= showImages && (
                  <img
                    src="img/posts/default/picture.jpg"
                    alt="post"
                    className={
                      postImages.length > 2
                        ? img === 1
                          ? "col-span-2"
                          : "col-span-1"
                        : postImages.length === 2
                        ? "col-span-1"
                        : "col-span-2"
                    }
                    key={img}
                  />
                )
            )}
            {postImages.length > showImages && (
              <button className="col-span-1 dark:bg-dark transition dark:hover:bg-dark-400 active:scale-[98%]">
                show more
              </button>
            )}
          </div>
        </div>
        <div className="px-3 mt-2">
          <div className="flex justify-between items-center text-gray-400">
            <div className="flex items-center gap-x-[2px]">
              <button>
                <FaThumbsUp className="text-xs text-white bg-blue-500 p-[2px] h-4 w-4 rounded-full" />
              </button>
              <button>
                <FaHeart className="text-xs text-white bg-red-500 p-[2px] h-4 w-4 rounded-full" />
              </button>
              <span className="ml-2">5</span>
            </div>
            <p className="">4 Answers</p>
          </div>
          <Spacer />
          <div className="flex justify-around items-center">
              <button className="flex items-center gap-x-2">
              <FaThumbsUp />
              <span>Like</span>
              </button>
            <button className="flex items-center gap-x-2">
              <FaCommentDots />
              <span>Comment</span>
              </button>
          </div>
        </div>
      </div>
    );
}

export default Post

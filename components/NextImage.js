import Image from "next/image";

const NextImage = ({
  className,
  url = "default/user.jpg",
  onClick,
  absoluteUrl,
  photo,
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {photo ? (
        <Image
          src={photo.dataUrl || '/img/users/default/user.jpg'}
          layout="fill"
          className="object-cover"
          onClick={onClick}
          blurDataURL="/img/users/default/user.jpg"
          onClick={onClick}
        />
      ) : absoluteUrl ? (
        <Image
          src={absoluteUrl || `/img/users/${url}`}
          layout="fill"
          className="object-cover"
          onClick={onClick}
        />
      ) : (
        <Image
          src={`/img/users/${url}`}
          layout="fill"
          className="object-cover"
          placeholder="blur"
          blurDataURL="/img/users/default/user.jpg"
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default NextImage;

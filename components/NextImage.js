import Image from "next/image";

const NextImage = ({className, url = "default/user.jpg", onClick, absoluteUrl}) => {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {absoluteUrl ? (
          <Image
            src={absoluteUrl || `/img/users/${url}`}
            layout="fill"
            className="object-cover"
            onClick={onClick}
          />
        ) : (
          <Image
            src={absoluteUrl || `/img/users/${url}`}
            layout="fill"
            className="object-cover"
            placeholder="blur"
            blurDataURL="/img/users/default/user.jpg"
            onClick={onClick}
          />
        )}
      </div>
    );
}

export default NextImage

import Link from 'next/link';

const WidgetIcon = ({
  children,
  link = "/",
  className,
  notifications = 0,
  active,
  tabIndex,
  tooltip
}) => {

    return (
      <Link href={link}>
        <a
          href={link}
          className={`${className} flex-1 flex justify-center items-center jusfity-center hover:bg-secondary transition ${
            active ? "border-b-4 border-blue-500 text-blue-500" : ""
          }`}
          tabIndex={tabIndex}
          tooltip={tooltip}
        >
          <div className="relative">
            {children}
            {notifications > 0 && (
              <div
                className={`absolute -top-1  rounded-full bg-red-500 flex justify-center items-center text-sm text-white h-4 ${
                  notifications > 9 ? "-right-3 w-6" : "-right-1 w-4"
                }`}
              >
                {notifications > 9 ? `9+` : notifications}
              </div>
            )}
          </div>
        </a>
      </Link>
    );
};

export default WidgetIcon

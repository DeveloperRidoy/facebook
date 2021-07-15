import Link from 'next/link';

const Links = () => {
    return (
        <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-400">
            <Item text="privacy"/>
            <Item text="terms"/>
            <Item text="advertising"/>
            <Item text="ad choices"/>
            <Item text="cookies"/>
            <Item text="more"/>
            <span>Facebook &copy; {new Date().getFullYear()}</span>
        </div>
    )
}

export default Links

const Item = ({ link = "#", text = "link" }) => (
  <Link href={link}>
    <a
      href="#"
      className="hover:underline capitalize"
    >
      {text}
    </a>
  </Link>
);
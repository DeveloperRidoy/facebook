import { useEffect, useState } from "react"
import { FaSmile } from "react-icons/fa"
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useGlobalContext } from "../context/GlobalContext";
import { DARK } from "../utils/global/variables";

const EmojiBtn = ({ children, onSelect, className}) => {
    const [state] = useGlobalContext();
    const [emojis, setEmojis] = useState({show:false, positionOnTop: true});
    
    const toggleEmojis = (e) =>
      setEmojis((state) => ({
        show: !state.show,
        positionOnTop:
          e.target.getBoundingClientRect().top / window.innerHeight > 0.5,
      }));
    
    // close emojis on escape key press
    useEffect(() => {
        const closeEmojis = (e) => { if (e.key === 'Escape') setEmojis(state => ({ ...state, show: false })) };
        document.body.addEventListener('keydown', closeEmojis);    
        return () => document.body.removeEventListener('keydown', closeEmojis);
    }, [])
    
    return (
      <div className="relative z-20">
        <button className={`transition rounded-full ${emojis.show ? 'bg-dark-300': ''} ${className}`} onClick={toggleEmojis}>{children || <FaSmile />}</button>
        {emojis.show && (
          <div
            className={`absolute right-0 z-10 ${
              emojis.positionOnTop ? "bottom-full" : ""
            }`}
          >
            <Picker
              set="facebook"
              enableFrequentEmojiSort={true}
              theme={state.theme === DARK ? "dark" : "light"}
              emojiTooltip={true}
              title="select emojis"
              onSelect={onSelect}
            />
          </div>
        )}
      </div>
    );
}

export default EmojiBtn

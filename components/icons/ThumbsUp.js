export const ThumbsUp = ({className}) => (
  <span
    style={{
      width: 24,
      height: 24,
      display: "inline-block",
      backgroundImage:
        "url(https://unpkg.com/emoji-datasource-facebook@5.0.1/img/facebook/sheets-256/64.png)",
      backgroundSize: "5700% 5700%",
      backgroundPosition: "23.2143% 67.8571%",
        }}
        className={`filter hue-rotate-50 ${className}`}
  ></span>
);

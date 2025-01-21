type Props = {
  vid_url: string;
};

const PlayerContainer = ({ vid_url }: Props) => {
  const key = vid_url.split("v=")[1] || vid_url.split("/").pop();
  const embedURL = `https://www.youtube.com/embed/${key}`;
  
  return (
    <div className="max-w-lg mx-auto rounded-xl overflow-hidden shadow-lg">
      <iframe
        src={embedURL}
        title="YouTube Video Player"
        allowFullScreen
        className="w-full aspect-video border-none"
      ></iframe>
    </div>
  );
};

export default PlayerContainer;


type Props = {
  vid_url: string;
};

const PlayerContainer = async ({ vid_url }: Props) => {
  const key = vid_url.split("v=")[1] || vid_url.split("/").pop();
  const embedURL = `https://www.youtube.com/embed/${key}`
  console.log("vid_url: ", vid_url)
  return (
    <div>
      <iframe
        src={embedURL}></iframe>
    </div>
  )
}

export default PlayerContainer;
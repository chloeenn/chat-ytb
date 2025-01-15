import axios from "axios";

export default async function YtbData (url : string) {
    const requestURL =`https://www.youtube.com/oembed?url=${url}&format=json`;
    const result = await axios.get(requestURL);
    console.log(result.data)
    return result.data;
}

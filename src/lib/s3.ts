import { PutObjectCommandOutput, S3 } from "@aws-sdk/client-s3"

export async function uploadToS3(transcript: string, ytb_key: string) {
    try {
        const s3 = new S3({
            region: `${process.env.NEXT_PUBLIC_S3_AWS_REGION}`,
            credentials: {
                accessKeyId: `${process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID}`,
                secretAccessKey: `${process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY}`
            },
        });
        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            Key: ytb_key,
            Body: transcript,
            ContentType: "text/plain",
        }

        s3.putObject(
            params,
            (_err: any, _data: PutObjectCommandOutput | undefined) => {
                return resolve({
                    ytb_key,
                });
            }
        );


    } catch (error) {
        console.error(error);
    }
}

function resolve(_arg0: { ytb_key: string; }): void {
    throw new Error("Function not implemented.");
}

export function getS3Url(file_key: string) {
    const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_AWS_REGION}.amazonaws.com/${file_key}`;
    return url;
}
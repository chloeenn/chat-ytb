import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

export async function downloadFromS3(fileKey: string): Promise<string | undefined> {
  try {
    const s3 = new AWS.S3({
      region: process.env.NEXT_PUBLIC_S3_AWS_REGION,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY as string,
      },
    });

const fullFileKey = `transcripts/${fileKey}.txt`;

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
      Key: fullFileKey,
    };

    const obj = await s3.getObject(params).promise();

    if (!obj.Body) {
      throw new Error('File content is empty.');
    }

    const fileName = path.join('/tmp', `transcript-${Date.now().toString()}.txt`);
    fs.writeFileSync(fileName, obj.Body.toString());
    
    return fileName;
  } catch (error) {
    console.error('Error downloading file from S3:', error);
    return undefined;
  }
}

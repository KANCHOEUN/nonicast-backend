import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

const BUCKET_NAME = 'nonicast0113';

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadsFile(@UploadedFile() file) {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });
    try {
      const objectName = `${Date.now() + file.originalname}`;
      AWS.config.update({ region: 'ap-northeast-2' });
      await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          Key: objectName,
          ACL: 'public-read',
        })
        .promise();
      const fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
      return { url: fileUrl };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

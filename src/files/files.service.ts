import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const filePath = path.resolve(__dirname, '..', 'static');
      const fileName = file.originalname;
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Error file module',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

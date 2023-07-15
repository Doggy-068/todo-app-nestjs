import { MaxFileSizeValidator, FileTypeValidator, ParseFilePipe, Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger'
import { FileUploadDto, FileReturnDto } from './dto/file.dto'

@ApiBearerAuth()
@ApiTags('File')
@Controller('api/file')
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a txt file which size is below 1000.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @ApiCreatedResponse({ description: 'Upload successfully.', type: FileReturnDto })
  uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000 }),
        new FileTypeValidator({ fileType: 'text/plain' })
      ]
    })
  ) file: Express.Multer.File): FileReturnDto {
    return {
      url: `/.file/${file.filename}`
    }
  }
}

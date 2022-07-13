import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  imageUpload(files: FileList, maxMB: number) {
    let data = { error: true, message: '', file: new File([], '') }
    const sizeLimit = maxMB * 1000000

    if(files.length <= 0 || files.length > 1) {
      data.message = 'No file selected!'
      return data
    }

    const file: File | null = files.item(0)
    if (!file?.type.match(/image\/*/)) {
      data.message = 'Only image files are allowed!'
      return data
    }

    if(file.size > sizeLimit) {
      data.message = 'File is too large, make sure it is smaller than 1MB!'
      return data
    }

    data.error = false
    data.file = file
    return data
  }
}

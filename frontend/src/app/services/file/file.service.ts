import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  imageUpload(files: FileList, maxMB: number) {
    let data = { error: true, message: '' }
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
      data.message = `File is too large, make sure it is smaller than ${maxMB}MB!`
      return data
    }

    data.error = false
    return data
  }

  urlToFile(url: string, filename: string, mimeType: string) {
    return (fetch(url)
        .then(res => res.arrayBuffer())
        .then(buffer => new File([buffer], filename, { type: mimeType, lastModified: Date.now() })))
  }
}

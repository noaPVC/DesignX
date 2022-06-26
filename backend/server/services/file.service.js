const multer = require('multer')
const path = require('path')
const fs = require('fs')

const tempDestination = 'server/usercontent/temp'

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, tempDestination),
    filename: (req, file, cb) => {
        cb(null, `temp-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            req.fileError = { error: true, message: `Only images allowed!, mime passed => ${ext}` }
            return cb(null, true)
        }
        req.fileError = null
        cb(null, true)
    }
})

module.exports = {
    upload,
    // responsible for moving avatar after signup
    move: function (id, uuid, dir_action) {
        if (!id || !uuid) return

        const dir = `server/usercontent/${dir_action}/${id}`
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir, { recursive: true })

        const tmpFileName = fs.readdirSync(tempDestination)[0]

        if (tmpFileName) {
            const tempFilePath = `${tempDestination}/${tmpFileName}`

            // making sure unique file names are saved
            const uniqueName = `${uuid}${path.extname(tmpFileName)}`
            const newFilePath = `${dir}/${uniqueName}`

            fs.rename(tempFilePath, newFilePath, err => {
                if (err) throw err
            })
        }
    },

    // getting the relative path of the recently stored avatar file
    getUniqueFilePath: function (id, uuid, dir_action) {
        tempFile = fs.readdirSync(tempDestination)[0]
        if (tempFile) {
            const extension = path.extname(tempFile)
            return `/usercontent/${dir_action}/${id}/${uuid}${extension}`
        }
    },

    deleteContentById: function (id, type) {
        const contentPath = `server/usercontent/${type}/${id}`

        if (fs.existsSync(contentPath))
            fs.rmdir(contentPath, { recursive: true }, err => {
                if (err) throw err
            })
    },

    clearTemp: function () {
        fs.readdir(tempDestination, (err, files) => {
            if (err) throw err

            for (const file of files) {
                fs.unlink(path.join(tempDestination, file), err => {
                    if (err) throw err
                })
            }
        })
    }
}
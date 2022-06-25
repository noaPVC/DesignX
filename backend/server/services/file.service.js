const multer = require('multer')
const path = require('path')
const fs = require('fs')

const tempDestination = 'server/usercontent/temp'

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, tempDestination),
    filename: (req, file, cb) => {
        cb(null, `temp${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

module.exports = {
    upload,
    // responsible for moving avatar after signup
    moveAvatar: function (id, uuid) {
        if (!id) return null

        const dir = `server/usercontent/avatars/${id}`
        // create folders structure of user avatar store..
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            })
        }

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
    getUniqueFilePath: function (id, uuid) {
        const extension = path.extname(fs.readdirSync(tempDestination)[0])
        return `/usercontent/avatars/${id}/${uuid}${extension}`
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
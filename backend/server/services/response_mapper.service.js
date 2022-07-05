// service controls responses and mappings to objects in form of single-functions

module.exports = {

    registrationObjectMapper: function (object) {
        return {
            firstname: object.firstname,
            lastname: object.lastname,
            username: object.username,
            bio: object.bio,
            email: object.email,
            password: object.password
        }
    },

    designObjectMapper: function (object, creator) {
        // cover image is extraced in the request itself
        return {
            caption: object.caption,
            description: object.description,
            tags: object.tags,
            creatorImageSource: creator.avatarProfileSource,
            creatorName: `${creator.lastname} ${creator.firstname}`,
            _userId: creator._id
        }
    },

    designResponseBuilder: function (object, userId) {
        let avatarSource = null

        if (object.creatorImageSource)
            avatarSource = object.creatorImageSource

        return {
            metadata: {
                _userId: object._userId,
                createdAt: object.createdAt,
                creatorImageSource: avatarSource,
                creatorName: object.creatorName,
                hasAccess: object._userId == userId
            },
            _id: object._id,
            caption: object.caption,
            description: object.description,
            coverImageSource: object.coverImageSource,
            tags: object.tags
        }
    },

    updateDesignObjectMapper: function (object) {
        return {
            caption: object.caption,
            description: object.description,
            tags: object.tags
        }
    },

    userDataResponse: function (user) {
        return {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            bio: user.bio,
            avatarProfileSource: user.avatarProfileSource,
            joined: user.joined
        }
    }
}
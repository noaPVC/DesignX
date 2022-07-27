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
            _userId: creator._id,
            creatorName: creator.username,
            creatorImageSource: creator.avatarProfileSource,
            caption: object.caption,
            description: object.description,
            tags: object.tags
        }
    },

    designResponseBuilder: function (object, userId) {
        return {
            metadata: {
                _userId: object._userId,
                createdAt: object.createdAt,
                creatorImageSource: object.creatorImageSource ?? null,
                creatorName: object.creatorName,
                hasAccess: object._userId == userId
            },
            _id: object._id,
            caption: object.caption,
            description: object.description,
            coverImageSource: object.coverImageSource,
            likes: object.likes,
            views: object.views,
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
            _id: user._id,
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
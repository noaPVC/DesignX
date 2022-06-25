
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
    }
}
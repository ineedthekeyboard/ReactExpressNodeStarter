module.exports = {
    'schema': {
        'email': { type: String, index: true, unique: true, required: true },
        'username': { type: String, required: false },
        'password': {type: String, default: ''},
        'salt': {type: String, default: ''},
        'fullname': {type: String, default: ''},
        'address': {type: String, default: ''},
        'occupation': {type: String, default: ''},
        'age': {type: Number, default: 0}
    },
    'statics': {
        'findByEmail': async function(email, cb) {
            var user = await this.find({ email: email }, cb);
            return user[0] || null;
        }
    }
}
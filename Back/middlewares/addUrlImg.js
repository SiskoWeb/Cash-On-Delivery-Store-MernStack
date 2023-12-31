class AddUrl {
    constructor(schema) {
        this.schema = schema
    }

    post(fileName) {

        this.schema.post('init', (doc) => {
            if (doc.image) {
                const imageUrl = `http://127.0.0.1:3000/${fileName}/${doc.image}`
                doc.image = imageUrl
            }

        });
        return this
    }

    save(fileName) {

        this.schema.post('save', (doc) => {
            if (doc.image) {
                const imageUrl = `http://127.0.0.1:3000/${fileName}/${doc.image}`
                doc.image = imageUrl
            }

        });
        return this
    }

}


module.exports = AddUrl;
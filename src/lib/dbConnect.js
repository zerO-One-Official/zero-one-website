import mongoose from "mongoose"

const connect = () => {
    // Connection URL
    const url = process.env.MONGO_URI;

    // Check the current connection state
    if (mongoose.connection.readyState === 0) {

        // Connect to MongoDB only if not already connected
        mongoose.connect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
            .then(() => {
                console.log('Connected to MongoDB successfully');
            })
            .catch(error => {
                console.error('Error connecting to MongoDB:', error);
            });
    }

}

export default connect;
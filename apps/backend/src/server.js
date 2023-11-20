import mongoose from 'mongoose';
import app from './app';
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
    app.listen(process.env.PORT);
});

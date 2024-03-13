const express = require('express');
const app = express();

app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api', taskRoutes);
app.use('/api', authRoutes);

app.get('/',(req,res)=>{
    res.send("hello");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

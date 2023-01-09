const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63989edc34c63199ac38b3d8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: 'https://random.imagecdn.app/500/150',
            //image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nobis harum esse autem quasi voluptatibus, necessitatibus molestias aliquam doloremque. Sunt quibusdam, magni accusantium nulla quidem atque soluta saepe ipsam dicta?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dmh1pwxld/image/upload/v1671103297/YelpCamp/pmp0rrd7lhk0dxlcxje3.jpg',
                  filename: 'YelpCamp/pmp0rrd7lhk0dxlcxje3',
                },
                {
                  url: 'https://res.cloudinary.com/dmh1pwxld/image/upload/v1671103297/YelpCamp/ybpv5iyjsrdaetmw5ugc.jpg',
                  filename: 'YelpCamp/ybpv5iyjsrdaetmw5ugc',
                }
              ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
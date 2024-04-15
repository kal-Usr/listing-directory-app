const mongoose = require("mongoose")
const Place = require("../models/place")
const { geometry } = require("../utils/hereMaps")

mongoose
  .connect("mongodb://127.0.0.1/bestpoints")
  .then((result) => {
    console.log("connected to mongodb")
  })
  .catch((err) => {
    console.log(err)
  })

async function seedPlaces() {
  const places = [
    
  ]

  try {
    const newPlace = await Promise.all(places.map(async place => {
      let geoData = await geometry(place.location)
      if (!geoData) {
        geoData = {type:'Point', coordinates: [116.32883, -8.90952]}
      }
      return {
        ...place,
        author: "6604623ca8ae811c443fb001",
        images: {
          url: "public\\images\\image-1712214999285-220497282.jpg",
          filename: "image-1712214999285-220497282.jpg",
        },
        geometry: geoData
      }
    }))
    await Place.deleteMany({})
    await Place.insertMany(newPlace)
    console.log("Data berhasil disimpan")
  } catch (err) {
    console.log("Terjadi kesalahan saat menyimpan data:", err)
  } finally {
    mongoose.disconnect()
  }
}

seedPlaces()

import Plant from "../models/Plant.js";

const postPlant = async (req, res) => {
    const { title, image, category, price, description } = req.body;

    const plant = new Plant({
        title,
        image,
        category,
        price,
        description
    })

    try {
        const savedPlant = await plant.save()

        res.json({
            success: true,
            message: "Plant created successfully",
            data: savedPlant
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message,
            data: null
        })
    }
}

const getPlants = async (req, res) => {
    const allPlants = await Plant.find().sort({ createdId: -1 })

    res.json({
        success: true,
        message: "All plants fetched successfully",
        data: allPlants
    })
}

const getPlant = async (req, res) => {
    const { id } = req.params;

    const plant = await Plant.findById(id)

    res.json({
        success: plant ? true : false,
        message: plant ? "Plant fetched successfully" : "Plant not found",
        data: plant || null
    })
}

const updatePlant = async (req, res) => {
    const { id } = req.params;

    const {
        title,
        image,
        category,
        price,
        description } = req.body

        const updateRsult = await Plant.updateOne(
            {_id: id},
            {
                $set :{
                    title,
                    image,
                    category,
                    price,
                    description
                }
            }
        )

        const updatePlant = await Plant.findById(id)

            res.json({
                success: true,
                message: "Plant updated successfully",
                data: updatePlant
            })
        
}

const deletePlant = async (req, res)=>{
    const {id} = req.params

    await Plant.deleteOne({_id: id})

    res.json({
        success: true,
        message: "Plant deleted successfully",
        data: null
    })
}

export { postPlant, getPlants, getPlant, updatePlant, deletePlant }
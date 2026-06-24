import { ITEM } from "../models/items.model.js";
import { TABLE } from "../models/tables.model.js";



//ADD TABLE
export const addTable = async (req, res) => {
    const { tableNo } = req.body;
    try {
        if (!tableNo)
            return res.status(400).json({ msg: "Table number required" });
        const table = await TABLE.create({ table_no: tableNo, });
        console.log(table);
        return res.status(200).json({ msg: "Table added successfuly", table });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: `Server Error: ${e}` });
    }
}

//GET TABLES
export const getTables = async (req, res) => {
    try {
        const tables = await TABLE.find();
        if (!tables)
            return res.status(400).json({ msg: "No table found" });
        console.log(tables);

        return res.status(200).json({ msg: "Tables found", tables });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: `Server Error: ${e}` });

    }
}

//POST ITEM
export const addItem = async (req, res) => {
    try {
        const { itemName, itemPrice, itemImage, itemCategory, chefSpecial } = req.body;
        if (!itemName || !itemPrice || !itemCategory)
            return res.status(404).json({ msg: "Name, Price, Category are required" });

        const item = await ITEM.create({
            item_name: itemName,
            item_price: itemPrice,
            item_image: itemImage,
            item_category: itemCategory,
            chef_special: chefSpecial || false,
        });

        return res.status(200).json({ msg: "Item added successfuly", item });

    } catch (e) {
        return res.status(500).json({ msg: `Server Error: ${e}` });
    }
}

//GET ITEMS
export const getItems = async (req, res) => {
    try {
        const item = await ITEM.find();
        if (!item || item.length==0)
            return res.status(404).json({ msg: "No item found" });
        return res.status(200).json({ msg: "Item found", item });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: `Server Error: ${e}` });
    }
}





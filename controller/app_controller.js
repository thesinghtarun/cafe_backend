import { ITEM } from "../models/items.model.js";
import { SESSION } from "../models/session.model.js";
import { TABLE } from "../models/tables.model.js";
import { v4 as uuidv4, v4 } from "uuid";


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

//GET TABLE INFO
export const scanTable = async (req, res) => {
  try {
    const { tableNo } = req.body;

    // =========================
    // 1. Validate input
    // =========================
    if (!tableNo) {
      return res.status(400).json({
        success: false,
        msg: "Table number required",
      });
    }

    // =========================
    // 2. Check table exists
    // =========================
    const table = await TABLE.findOne({ table_no: tableNo });

    if (!table) {
      return res.status(404).json({
        success: false,
        msg: "Table not found",
      });
    }

    // =========================
    // 3. Check existing active session
    // =========================
    let session = await SESSION.findOne({
      table_no: tableNo,
      status: "active",
      expiresAt: { $gt: new Date() },
    });

    // =========================
    // 4. If session exists → return it
    // =========================
    if (session) {
      return res.status(200).json({
        success: true,
        msg: "Existing session",
        sessionId: session.sessionId,
        tableNo,
        expiresAt: session.expiresAt,
      });
    }

    // =========================
    // 5. Create new session
    // =========================
    const sessionId = uuidv4();
    const now = new Date();

    session = await SESSION.create({
      sessionId,
      table_no: tableNo,
      status: "active",
      lastActivity: now,
      expiresAt: new Date(now.getTime() + 15 * 60 * 1000), // 15 min
    });

    // =========================
    // 6. Response
    // =========================
    return res.status(200).json({
      success: true,
      msg: "New session created",
      sessionId: session.sessionId,
      tableNo,
      expiresAt: session.expiresAt,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

//UPADTE USER ACTIVITY
export const updateActivity = async (req, res) => {
  try {
    const { sessionId } = req.body;

    await SESSION.updateOne(
      { sessionId },
      { lastActivity: new Date() }
    );

    return res.status(200).json({
      success: true,
      msg: "Activity updated",
    });

  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

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


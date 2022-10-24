const EmployeeSchema = require("../models/Employee");
const express = require("express");
const router = express.Router();

// {
//     "first_name": "john",
//     "last_name": "doe",
//     "email": "john@gmail.com",
//     "gender": "Male",
//     "salary": 8452.52
// }

router.post("/employees", async (req, res) => {
    try {
        const createdEmployee = new EmployeeSchema(req.body);
        const employee = await createdEmployee.save();
        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/employees", async (req, res) => {
    try {
        const allEmployees = await EmployeeSchema.find();
        res.status(200).send(allEmployees);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/employees/:eid", async (req, res) => {
    try {
        const employee = await EmployeeSchema.findById(
            req.params.eid,
            req.body
        );
        if (employee == false)
            return res.status(404).send("No employee found with that id.");
        res.status(200).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put("/employees/:eid", async (req, res) => {
    try {
        const updated = await EmployeeSchema.findByIdAndUpdate(
            req.params.eid,
            req.body
        );
        if (updated == false)
            return res.status(404).send("No employee found with that id.");
        const employee = await updated.save();
        res.status(200).send("Updated Successfully. \n\n " + employee);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/employees", async (req, res) => {
    try {
        const employee = await EmployeeSchema.findByIdAndDelete(
            req.query.eid,
            req.body
        );
        if (employee == false)
            return res.status(404).send("No employee found with that id.");
        res.status(200).send("Deleted Successfully");
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;

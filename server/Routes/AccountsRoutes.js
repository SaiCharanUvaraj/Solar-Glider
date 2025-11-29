import express from "express";
import { generateResponse } from "../utils/ResponseFormat.js";
import { fetchAccount, generateToken, isAccountExisting } from "../services/AccountsServices.js";
import { AccountsModel } from "../models/AccountsModel.js";

export const accountsRoutes = express.Router();

accountsRoutes.post('/create', async (req, res) => {
    const { email, password } = req.body;

    try {
        const exists = await isAccountExisting(email); 

        if (exists) {
            return res.status(409).json(
                generateResponse(false, 409, "Account already exists")
            );
        }

        const token = generateToken(email);

        await AccountsModel.create({
            email,
            password,
            token
        });

        return res.status(200).json(
            generateResponse(true, 200, "Account created")
        );

    } catch (error) {
        console.error("Error in creating account:", error);
        return res.status(500).json(
            generateResponse(false, 500, "Internal Server Error")
        );
    }
});


accountsRoutes.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    try {
        const exists = await isAccountExisting(email); 

        if (!exists) {
            return res.status(404).json(
                generateResponse(false, 404, "Account does not exist")
            );
        }

        const user = await fetchAccount(email); 

        if (user.password !== password) {
            return res.status(401).json(
                generateResponse(false, 401, "Authentication failed")
            );
        }

        // Generate NEW TOKEN
        const token = generateToken(email);
        user.token = token;
        await user.save();

        return res.status(200).json(
            generateResponse(true, 200, "Authentication success", token)
        );

    } catch (error) {
        console.error("Error in authentication:", error);
        return res.status(500).json(
            generateResponse(false, 500, "Internal Server Error")
        );
    }
});

const {v4: uuidv4} = require('uuid');
const { upsertProject } = require('../services/project.service');


async function generateKey(req, res){
    try{
        const {repo_path} = req.body;
        if(!repo_path){
            return res.status(400).json({
                success: false,
                message: 'repo_path is required'
            })
        }

        const newApiKey = uuidv4(); // Generate a new API key using UUID
        const result = await upsertProject(repo_path, newApiKey); // Upsert the project in the database

        console.log("[INFO] repo_path:", repo_path);

        return res.status(200).json({
            success: true,
            message: 'Project created/updated successfully',
            data: result.data
        });
    }
    catch(error){
        console.error('Error creating project:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

module.exports = {
    generateKey,
};
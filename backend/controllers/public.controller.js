const {v4: uuidv4} = require('uuid');
const { upsertProject, createKudo } = require('../services/project.service');


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
        console.log('[ERROR] Error creating project:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

async function postKudo(req, res){
    try{
        const authHeader = req.headers['authorization'];
        const api_key = authHeader && authHeader.split(' ')[1]; // Extract API key from the Authorization header
        
        if (!api_key) {
            console.log('[ERROR] API key is missing in the request');
            return res.status(401).json({ success: false, message: 'API key is missing' });
        }

        const {repo_path, username, pr_title, pr_url} = req.body;
        
        if(!repo_path || !username || !pr_title || !pr_url){
            console.log('[ERROR] Missing required fields in the request body');
            return res.status(400).json({
                success: false,
                message: 'repo_path, username, pr_title and pr_url are required'
            })
        }

        // Transaction: Update user + create kudo
        const result = await createKudo(api_key, repo_path, username, pr_title, pr_url);

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    }
    catch(error){
        console.log('[ERROR] Error posting kudo:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        })
    }
}

module.exports = {
    generateKey,
    postKudo
};
const db = require('../config/firebase');
const PROJECTS_COLLECTION = 'projects';

function makeSafeId(repoPath) {
  return repoPath.replace(/\//g, "_");
}

// This function will be used to create or update a project in the database.
async function upsertProject(repoPath, apiKey) {
    const projectRef = db.collection(PROJECTS_COLLECTION).doc(makeSafeId(repoPath)); // using repoPath as the document ID
    await projectRef.set({
        repo_path: repoPath,
        api_key: apiKey,
    },
    { merge: true } // overwrite the document if it already exists, otherwise create a new one
    );

    return { success: true, message: 'Project upserted successfully', data: { repo_path: repoPath, api_key: apiKey } };
}

module.exports = {
    upsertProject,
};
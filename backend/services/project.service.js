const db = require('../config/firebase');
const PROJECTS_COLLECTION = 'projects';
const USER_COLLECTION = 'users';
const KUDOS_COLLECTION = 'kudos';

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

// Fucntion to create a kudo entry and update the user's gitcoins and merge count in a transaction
async function createKudo(apiKey, repoPath, username, prTitle, prUrl) {
    const projectRef = db.collection(PROJECTS_COLLECTION).doc(makeSafeId(repoPath));
    const userRef = db.collection(USER_COLLECTION).doc(username);

    // Check if the provided API key is valid for the given repoPath
    const projectSnap = await projectRef.get();
    if(!projectSnap.exists || projectSnap.data().api_key !== apiKey){
        console.log('[ERROR] Invalid API key provided for repo_path:', repoPath);
        throw new Error('Invalid API key');
    }

    await db.runTransaction(async(t) => {
      const userSnap = await t.get(userRef);

        // if user doens't exist, create a new user with 5 gitcoins and 1 merge
        if(!userSnap.exists) {
          t.set(userRef, {
            total_gitcoins: 5,
            total_merges: 1,
            contributed_repos: [repoPath],
          });
        }
        // else, update the existing user by adding 5 gitcoins and increment the merge count by 1
        else{
          const data = userSnap.data();
          t.update(userRef, {
            total_gitcoins: data.total_gitcoins + 5,
            total_merges: data.total_merges + 1,
            contributed_repos: Array.from(new Set([...data.contributed_repos, repoPath])),
          })
        }

        // Create the kudo entry
        const kudoRef = db.collection(KUDOS_COLLECTION).doc();
        t.set(kudoRef, {
          recipient_username: username,
          repo_path: repoPath,
          pr_title: prTitle,
          pr_url: prUrl,
          project_id: projectRef.id,
          timestamp: new Date(),
        })
    })

    return { success: true, message: 'Kudo created successfully' };
}

module.exports = {
    upsertProject,
    createKudo,
};
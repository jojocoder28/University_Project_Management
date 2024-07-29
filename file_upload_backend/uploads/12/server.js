import express from 'express';
import multer from 'multer';
import { MongoClient, ObjectId } from 'mongodb';
import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';
import cors from 'cors';

const app = express();
const port = 3001;
const upload = multer({ dest: 'uploads/' });

const uri = 'mongodb+srv://dasjojo7:dasjojo7@cluster0.gyoxgac.mongodb.net/?retryWrites=true';
const client = new MongoClient(uri);

// Enable CORS to allow communication between frontend and backend
app.use(cors());

async function insertFileStructure(directoryPath, parentId = null, parentPath = 'root') {
    const database = client.db('university_project_management');
    const collection = database.collection('files');
    
    const items = fs.readdirSync(directoryPath);
    for (const item of items) {
        const itemPath = path.join(directoryPath, item);
        const stat = fs.statSync(itemPath);
        
        const document = {
            name: item,
            type: stat.isDirectory() ? 'directory' : 'file',
            parentId: parentId ? new ObjectId(parentId) : null,
            path: path.join(parentPath, item)
        };
        
        if (stat.isFile()) {
            document.content = fs.readFileSync(itemPath, 'utf-8');
        }
        
        const result = await collection.insertOne(document);
        
        if (stat.isDirectory()) {
            await insertFileStructure(itemPath, result.insertedId, document.path);
        }
    }
}

app.post('/upload', upload.single('folder'), async (req, res) => {
    try {
        await client.connect();
        
        const zipFilePath = req.file.path;
        const extractedFolderPath = path.join(__dirname, 'uploads', path.basename(zipFilePath, '.zip'));

        // Extract the uploaded folder
        await fs.createReadStream(zipFilePath).pipe(unzipper.Extract({ path: extractedFolderPath })).promise();

        await insertFileStructure(extractedFolderPath);
        
        res.status(200).send('Folder uploaded and processed successfully!');
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        await client.close();
    }
});

app.get('/api/fetch-tree', async (req, res) => {
    try {
        await client.connect();
        
        async function fetchTreeData(parentId = null) {
            const database = client.db('university_project_management');
            const collection = database.collection('files');
            
            const query = parentId ? { parentId: new ObjectId(parentId) } : { parentId: null };
            const items = await collection.find(query).toArray();
            
            const result = [];
            for (const item of items) {
                const children = item.type === 'directory' ? await fetchTreeData(item._id) : [];
                result.push({ ...item, children });
            }
            return result;
        }
        
        const treeData = await fetchTreeData();
        res.json(treeData);
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

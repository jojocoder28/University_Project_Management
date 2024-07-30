import { backend_api, fileupload_api } from '../config.js';
import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import axios from 'axios';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import FolderTree from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import {fileTypeFromBuffer} from 'file-type';
import { toast, ToastContainer} from 'react-toastify';
import {
  DiCss3,
  DiDatabase,
  DiGo,
  DiHtml5,
  DiJava,
  DiJavascript1,
  DiMarkdown,
  DiReact,
  DiPhp,
  DiPython,
} from 'react-icons/di';
import { MdCode } from "react-icons/md";
import { FaFilePdf, FaFileWord } from 'react-icons/fa6';

const FileIcons = {
  go: <DiGo />,
  html: <DiHtml5 />,
  css:<DiCss3 />,
  java: <DiJava />,
  js: <DiJavascript1 />,
  jsx: <DiReact />,
  md: <DiMarkdown />,
  php: <DiPhp />,
  pdf: <FaFilePdf />,
  docx: <FaFileWord />,
  py: <DiPython />,
  sql: <DiDatabase />
}

const fileExtensionToTechnology = {
  'js': 'JavaScript',
  'jsx': 'React',
  'ts': 'TypeScript',
  'html': 'HTML',
  'css': 'CSS',
  'scss': 'SASS',
  'py': 'Python',
  'java': 'Java',
  'c': 'C',
  'cpp': 'C++',
  'cs': 'C#',
  'rb': 'Ruby',
  'php': 'PHP',
  'pdf': "PDF",
  'go': 'Go',
  'rs': 'Rust',
  'md': 'Markdown',
  'json': 'JSON',
  'xml': 'XML',
  'yml': 'YAML',
  'sh': 'Shell',
  'docx': 'Word'
};

const FileIcon = ({ onClick: defaultOnClick, nodeData }) => {
  const [fileIcon, setFileIcon] = useState(<MdCode />);

  useEffect(() => {
    let ext = nodeData.name.split('.').pop();
    let icon = FileIcons[ext] || <MdCode />;
    setFileIcon(icon);
  }, [nodeData]);

  return fileIcon;
};


const IconComponents = {FileIcon,}

const ZipUpload = ({ onFileSelect }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    const navigate = useNavigate();
    const { projectId } = useParams();
    document.title = `Project ${projectId} - File Upload`;

  const [treeData, setTreeData] = useState(null);
  const [filesMap, setFilesMap] = useState(new Map());
  const [filesMapTemp2, setFilesMapTemp2] = useState(new Map());
  const [tags, setTags] = useState([]);
  const [files, setFiles] = useState([]);

  const handleZipUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const zip = new JSZip();
      const contents = await zip.loadAsync(file);

      const files = [];
      const filesMapTemp = new Map();

      contents.forEach(async (relativePath, zipEntry) => {
        files.push({
          name: zipEntry.name,
          isDirectory: zipEntry.dir,
          fullPath: relativePath
        });

        if (!zipEntry.dir) {
          const blob = await zipEntry.async('blob');
          const fileObject = new File([blob], zipEntry.name, { type: blob.type });
          filesMapTemp.set(zipEntry.name, fileObject);
          zipEntry.async('blob').then((blob) => {
            setFilesMapTemp2((prev) => new Map(prev).set(relativePath, blob));
          });
        }
      });

      setFilesMap(filesMapTemp);

      const tree = createTree(files);
      const generatedTags = await generateTags(contents.files, zip);
      setTreeData(tree);
      setTags(generatedTags);
    }
  };

  const createTree = (files) => {
    const tree = { name: 'root', children: [] };

    files.forEach((file) => {
      const parts = file.name.split('/');
      let currentNode = tree;

      parts.forEach((part, index) => {
        let node = currentNode.children.find((child) => child.name === part);

        if (!node) {
          node = { name: part, fullPath: file.fullPath };

          if (index < parts.length - 1 || file.isDirectory) {
            node.isDirectory = true;
            node.children = [];
          } else {
            node.isDirectory = file.isDirectory;
            if (!node.isDirectory) {
              node.children = undefined;
            }
          }
          currentNode.children.push(node);
        }

        currentNode = node;
      });
    });

    return tree;
  };
  const generateTags = async (files, zip) => {
    const tagsArray = [];

    for (const filePath of Object.keys(files)) {
      if (!files[filePath].dir) {
        const fileData = await zip.file(filePath).async('uint8array');
        const fileType = await fileTypeFromBuffer(fileData);
        const extension = fileType ? fileType.ext : filePath.split('.').pop().toLowerCase();
        const technology = fileExtensionToTechnology[extension] || extension;
        if (technology && technology.length<=10 && !tagsArray.includes(technology)) {
          tagsArray.push(technology);
        }
      }
    }

    return tagsArray;
  };

  const handleFileClick = (node) => {
    console.log("Current FilesMap: ", filesMapTemp2);
    if (!node.isDirectory) {
      const blob = filesMapTemp2.get(node.nodeData.fullPath);
      console.log("blob:", blob);
      if (blob) {
        onFileSelect(blob);
      } else {
        console.error(`Blob not found for file: ${node.nodeData.fullPath}`);
      }
    }
  };
  

  const handleSubmit = async () => {
    const formData = new FormData();
    filesMap.forEach((file, name) => {
      formData.append(name, file);
    });
    // formData.append('tags', tags);
    formData.append('projectId', projectId);
  
    // Add treeData as a JSON string to the formData
    formData.append('tree', JSON.stringify(treeData));
  
    try {
      await axios.post(
        fileupload_api+'api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }) .then((res) => {
        // toast.success(res.data.message);
        // console.log(res.data.files);
        setFiles(res.data.files);
        updateProject(res.data.files);
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error(error.response.data.message);
    }
  };

  const updateProject = async (element) => {
    const formData = new FormData();
    
      formData.append('files', JSON.stringify(element,null,2));
      formData.append('tags', tags);
      formData.append('projectId', projectId);
   
  
    // Add treeData as a JSON string to the formData
    formData.append('tree', JSON.stringify(treeData));
  
    try {
      await axios.post(
        backend_api+'api/v1/project/add/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }) .then((res) => {
        toast.success(res.data.message);
        navigate(`/project/${projectId}`);
        setFiles([]);
        setTags([]);

      });
    } catch (error) {
      console.error('Error updating project :', error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <input type="file" accept=".zip" onChange={handleZipUpload} />
      {treeData && (
        <>
          <div className="shadow rounded p-4 mb-4 folder-tree-container">
            <FolderTree
              data={treeData}
              showCheckbox={false}
              indentPixels={ 20 }
              iconComponents={IconComponents}
              className="flex items-center justify-center"
              onNameClick={(node) => {
                handleFileClick(node);
              }}
            />
          </div>

          {/* <div className="flex flex-col items-center justify-center gap-2"> 
            <h2>Tags</h2>
            <div className="flex flex-row items-center justify-center gap-2">
              {tags.map((tag, index) => (
                <span className="badge badge-neutral" key={index}>{tag}</span>
              ))}
            </div>
          </div> */}

          {/* <h2>
                TreeData
          </h2>
          <pre>
            { JSON.stringify(treeData, null, 2) }
          </pre> */}
          <button className="btn" onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
};

export default ZipUpload;

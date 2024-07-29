import React, { useState, useEffect } from 'react';

function FileTree() {
    const [tree, setTree] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/fetch-tree');
            const data = await response.json();
            setTree(data);
        }
        fetchData();
    }, []);

    function renderTree(node, path = '') {
        return (
            <ul key={node._id}>
                <li>
                    {node.type === 'directory' ? (
                        <strong>{node.name}</strong>
                    ) : (
                        node.name
                    )}
                    {node.children && node.children.map(child => renderTree(child, `${path}${node.name}/`))}
                </li>
            </ul>
        );
    }

    return <div>{tree.map(node => renderTree(node))}</div>;
}

export default FileTree;

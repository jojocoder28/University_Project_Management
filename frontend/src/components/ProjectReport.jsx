import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

const ProjectReport = () => {
  const [editorContent, setEditorContent] = useState('');
  const quillRef = useRef(null); // Create a ref for ReactQuill

  // Function to convert HTML content to plain text while preserving new lines and paragraphs
  const htmlToPlainText = (html) => {
    const temporaryDiv = document.createElement('div');
    temporaryDiv.innerHTML = html;

    let text = '';
    temporaryDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'P') {
          text += '\n\n'; // Add double new lines for paragraphs
        } else if (node.tagName === 'BR') {
          text += '\n'; // Add single new line for <br> tags
        }
        text += node.textContent;
      }
    });

    return text.trim();
  };

  // Function to parse HTML and create DOCX elements
  const parseHtmlToDocxElements = (html) => {
    const temporaryDiv = document.createElement('div');
    temporaryDiv.innerHTML = html;

    const parseNode = (node) => {
      let elements = [];

      if (node.nodeType === Node.TEXT_NODE) {
        elements.push(new TextRun(node.textContent));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        let formatting = {};

        if (node.tagName === 'B' || node.tagName === 'STRONG') {
          formatting.bold = true;
        } else if (node.tagName === 'I' || node.tagName === 'EM') {
          formatting.italic = true;
        } else if (node.tagName === 'U') {
          formatting.underline = true;
        }

        const textRun = new TextRun({ text: node.textContent, ...formatting });
        elements.push(textRun);

        const children = Array.from(node.childNodes).flatMap(parseNode);
        elements = elements.concat(children);
      }

      return elements;
    };

    const paragraphs = Array.from(temporaryDiv.childNodes).flatMap((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && (node.tagName === 'P' || node.tagName === 'DIV')) {
        return new Paragraph({
          children: parseNode(node),
        });
      }
      return [];
    });

    return paragraphs;
  };

  const generateReport = () => {
    const docxParagraphs = parseHtmlToDocxElements(editorContent);

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Project Report',
                  bold: true,
                  size: 48,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: '', // Empty text to add a blank line
                }),
              ],
            }),
            ...docxParagraphs,
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'ProjectReport.docx');
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    const content = document.createElement('div');
    content.innerHTML = quillRef.current.getEditor().root.innerHTML; // Access the Quill editor's content using the ref

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(18);
    doc.text('Project Report', doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.line(40, 50, doc.internal.pageSize.getWidth() - 40, 50);

    doc.html(content, {
      callback: function (pdf) {
        pdf.save('ProjectReport.pdf');
      },
      x: 10,
      y: 60,
    });
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg max-w-4xl mx-auto bg-white shadow-lg dark:bg-gray-800 dark:border-gray-600">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-gray-100">Project Report</h2>
      <ReactQuill
        ref={quillRef} // Attach the ref to ReactQuill
        value={editorContent}
        onChange={setEditorContent}
        placeholder="Write your project report here..."
        className="mb-4"
      />
      <div className="flex space-x-4">
        <button
          onClick={generateReport}
          className="mt-4 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          Download as Word
        </button>
        <button
          onClick={generatePDF}
          className="mt-4 px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-300 dark:bg-green-500 dark:hover:bg-green-400"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default ProjectReport;

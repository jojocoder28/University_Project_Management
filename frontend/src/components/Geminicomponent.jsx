import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { gemini_api_key } from '../config';
import jsPDF from 'jspdf';
import markdownToTxt from 'markdown-to-txt';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Geminicomponent = ({ project, jobRequests, submissions }) => {
  const [inputValue, setInputValue] = useState('');
  const [promptResponses, setpromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI(gemini_api_key);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const generateReport = () => {
    if (!project) return;

    // Generate your report content here using project, jobRequests, and submissions data
    const reportContent = `
        Project Title: ${project.projectName}
        Project Description: ${project.description}
        Deadline: ${project.deadline}
        Job Requests: ${jobRequests.map(jr => jr.title).join(', ')}
        Submissions: ${Object.values(submissions).flat().map(sub => sub.caption).join(', ')}
    `;

    exportPDF(reportContent);
  };

  const exportPDF = async (content) => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(content + " Generate project based on this content. Generate response in text format");
      setInputValue('');
      const response = result.response;
      const text = response.text();
      const plainText = markdownToTxt(text);
      setpromptResponses([...promptResponses, text]);
      setLoading(false);

      const doc = new jsPDF();
      const margin = 10;
      const pageWidth = doc.internal.pageSize.getWidth() - 2 * margin;
      const lineHeight = 10;
      const startY = margin;
      let y = startY;

      // Function to add text with wrapping and pagination
      const addTextWithWrapping = (text) => {
        const lines = doc.splitTextToSize(text, pageWidth);
        lines.forEach((line, index) => {
          if (y + lineHeight > doc.internal.pageSize.height - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += lineHeight;
        });
      };

      // Add content to PDF
      addTextWithWrapping(plainText);

      // Save the PDF
      doc.save(project.projectName+'_project_report.pdf');
    } catch (error) {
      console.error(error);
      console.log("Something Went Wrong");
      setLoading(false);
    }
  };

  const getResponseForGivenPrompt = async () => {
    const relContent = `
    Personal Information:
        I am Uni AI. I am here to solve your problems for the project and also help you out to find your queries. Ask me anything related to project. 
        
        Project Information:
        Project Title: ${project.projectName}
        Project Supervisor: ${project.supervisor}
        Project Description: ${project.description}
        Deadline: ${project.deadline}
        Job Requests: ${jobRequests.map(jr => jr.title).join(', ')}
        Submissions: ${Object.values(submissions).flat().map(sub => sub.caption).join(', ')}
    `;
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputValue + " give output only from this information: "+relContent);
      setInputValue('');
      const response = result.response;
      const text = response.text();
      setpromptResponses([...promptResponses, text]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      console.log("Something Went Wrong");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg max-w-4xl mx-auto bg-white shadow-lg dark:bg-gray-800 dark:border-gray-600">
      {loading ? (
        <div className="flex justify-center items-center m-4 overflow-hidden">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin dark:border-blue-400">
        </div>
        </div>
      
      ) : (
        <div className="mt-4">
          {promptResponses.map((promptResponse, index) => (
            <div key={index} className={`mb-2 p-2 ${index === promptResponses.length - 1 ? '' : ''}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {promptResponse}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ask Me Something You Want"
          className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={getResponseForGivenPrompt}
          className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700"
        >
          Ask
        </button>
        <button
          onClick={generateReport}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Generate Report
        </button>
      </div>
      
    </div>
  );
}

export default Geminicomponent;

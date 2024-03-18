import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [tableName, setTableName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(false);
const BASEURL="http://localhost:8080"
 

  const fetchTableOptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(BASEURL+'/tables');
      setOptions(response.data);
      console.log(response)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching table options:', error);
      setMessage('Error fetching table options.');
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTableChange = (e) => {
    setTableName(e.target.value);
    setSelected(true);
  };

  const handleSubmit = async () => {
    if (!file || !tableName) {
      setMessage('Please select a file and table name.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post(`${BASEURL}/upload/${tableName}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setMessage('File uploaded successfully.');
      } else {
        setMessage('Failed to upload file.');
      }
      setLoading(false);
      setSelected(false)
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file.');
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTableOptions();
  }, []);
  if(loading){
    return  <div className="loader">Loading...</div>
  }
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Upload Masters CSV File</h1>
    
        <div className="flex flex-col space-y-4">
          <select
            value={tableName}
            onChange={handleTableChange}
            className="border p-2 rounded-md w-1/4 "
            
          >
            <option value=""  >Please Select Table</option>
            {options?.map((option, index) => (
              <option key={index} value={option}>{option.replace(/_/g, " ")}</option>
            ))}
          </select>
         {selected&&tableName&& <div>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="border p-2 rounded-md"
          />
          <button
            onClick={handleSubmit}
            disabled={!file || !tableName || loading}
            className={`bg-blue-500 w-1/4 m-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ${
              !file || !tableName || loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            Upload
          </button>


          </div>}
          {message && <p className="text-red-500">{message}</p>}
        </div>
    
    </div>
  );
};

export default FileUpload;

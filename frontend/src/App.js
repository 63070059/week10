import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageProcessing = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', 'John');
    formData.append('surname', 'Doe');
    formData.append('numbers', JSON.stringify([1, 2, 3, 4, 5]));

    try {
      const response = await axios.post('http://3.85.108.108:8088/process-image', formData);
      setProcessedImage(response.data.processed_image);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Processor</h1>
        <input type="file" onChange={handleImageUpload} />
        <button onClick={handleImageProcessing} disabled={!image}>
          Process Image
        </button>
        {processedImage && (
          <img src={processedImage} alt="Processed" style={{ width: '50%' }} />
        )}
      </header>
    </div>
  );
}

export default App;
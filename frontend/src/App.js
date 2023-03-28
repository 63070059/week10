import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageProcessing = async () => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64data = reader.result;
      const data = {
        image: base64data,
        name: 'John',
        surname: 'Doe',
        numbers: [1, 2, 3, 4, 5]
      };
      try {
        const response = await axios.post('http://localhost:8088/process-image', data);
        setProcessedImage(response.data.processed_image);
      } catch (error) {
        console.log(error);
      }
    };
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
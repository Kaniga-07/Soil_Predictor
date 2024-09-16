import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './soilpredictor.css';

function SoilPredictor() {
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [cropInfo, setCropInfo] = useState([]); // Store crops info
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmitFile = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data && response.data.soil_type) {
                setPrediction(response.data.soil_type);
                setError(null);

                // Fetch crop information based on prediction
                fetchCropInfo(response.data.soil_type);
            } else {
                setError('Invalid response from server');
                setPrediction(null);
            }
        } catch (error) {
            console.error('Error:', error.response || error.message);
            setError('Error predicting soil type');
            setPrediction(null);
        }
    };

    const fetchCropInfo = (soilType) => {
        const cropDetails = {
            Alluvial: [
                {
                    name: 'Wheat',
                    image: 'https://www.openaccessgovernment.org/wp-content/uploads/2020/01/dreamstime_xxl_121974236.jpg',
                    growPeriod: '6-8 months',
                    advice: 'Requires well-drained soil with adequate water.',
                    details: 'wheat'
                },
                {
                    name: 'Rice',
                    image: 'https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg',
                    growPeriod: '4-6 months',
                    advice: 'Needs plenty of water and warmth.',
                    details: 'rice'
                }
            ],
            Black: [
                {
                    name: 'Cotton',
                    image: 'https://static.vecteezy.com/system/resources/thumbnails/037/996/577/small_2x/ai-generated-cotton-flower-branch-on-nature-photo.jpg',
                    growPeriod: '5-7 months',
                    advice: 'Best suited for dry and warm regions.',
                    details: 'cotton'
                },
                {
                    name: 'Groundnut',
                    image: 'https://www.shutterstock.com/image-photo/peanut-known-groundnut-goober-pindar-260nw-2173708277.jpg',
                    growPeriod: '4-6 months',
                    advice: 'Grows well in black soil with good drainage.',
                    details: 'groundnut'
                }
            ],
            Clay: [
                {
                    name: 'Rice',
                    image: 'https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg',
                    growPeriod: '4-6 months',
                    advice: 'Requires moisture and grows well in water-logged areas.',
                    details: 'rice'
                },
                {
                    name: 'Lentils',
                    image: 'https://www.shutterstock.com/image-photo/closeup-lentil-plant-white-flowers-260nw-1397559449.jpg',
                    growPeriod: '3-5 months',
                    advice: 'Thrives in cool, dry environments with minimal moisture.',
                    details: 'lentils'
                }
            ],
            Red: [
                {
                    name: 'Millet',
                    image: 'https://world-crops.com/wp-content/uploads/Finger-millet-by-Dinesh-Valke-2934263357_95491b5e18_z.jpg',
                    growPeriod: '3-6 months',
                    advice: 'Best suited for dry and warm regions with low water content.',
                    details: 'millet'
                },
                {
                    name: 'Sorghum',
                    image: 'https://media.istockphoto.com/id/1263003686/photo/sorghum-bicolor-is-a-genus-of-flowering-plants-in-the-grass-family-poaceae-native-to.jpg?s=612x612&w=0&k=20&c=6XNaes_x3uNmXoq2FW1tjB_LD1CLhzT2h1NEu4OkDcQ=',
                    growPeriod: '5-7 months',
                    advice: 'Grows well in semi-arid regions with minimal water.',
                    details: 'sorghum'
                }
            ]
        };

        setCropInfo(cropDetails[soilType] || []);
    };

    const handleCropClick = (cropDetails) => {
        // Redirect to the crop detail page
        navigate(`/crop/${cropDetails.details}`, { state: { crop: cropDetails } });
    };

    return (
        <div className="predict">
        <div className="app-container">
            <h1>Soil Type Predictor</h1>
            <form onSubmit={handleSubmitFile}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Predict Soil Type</button>
            </form>

            {prediction && <p style={{ color: "#e2fa6" }}>Predicted Soil Type: {prediction}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="crop-card-container">
                {cropInfo.map((crop, index) => (
                    <div className="crop-card" key={index} onClick={() => handleCropClick(crop)}>
                        <img src={crop.image} alt={crop.name} className="crop-image" />
                        <h3>{crop.name}</h3>
                        <p><strong>Growth Period:</strong> {crop.growPeriod}</p>
                        <p><strong>Advice:</strong> {crop.advice}</p>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default SoilPredictor;

import React, { useState } from 'react';
import { 
    FaWineGlass, 
    FaWineBottle, 
    FaThermometerHalf, 
    FaGlassCheers, 
    FaSearch,
    FaArrowRight 
} from 'react-icons/fa';
import './WinePage.css';
import axios from '../config/axios';

function WinePage() {
    const [loading, setLoading] = useState(false);
    const [selectedWine, setSelectedWine] = useState('');
    const [wineData, setWineData] = useState(null);
    const [error, setError] = useState(null);
    const [winePairing, setWinePairing] = useState(null);

    // Get wine description
    const getWineDescription = async (wine) => {
        try {
            setLoading(true);
            const response = await axios.get(`/food/wine/description?wine=${wine}`);
            setWineData(response.data);
        } catch (err) {
            setError('Failed to fetch wine description');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Get wine pairing for food
    const getWinePairing = async (food) => {
        try {
            setLoading(true);
            const response = await axios.get(`/food/wine/pairing?food=${food}`);
            return response.data;
        } catch (err) {
            setError('Failed to fetch wine pairing');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Get dish pairing for wine
    const getDishPairing = async (wine) => {
        try {
            setLoading(true);
            const response = await axios.get(`/food/wine/dishes?wine=${wine}`);
            return response.data;
        } catch (err) {
            setError('Failed to fetch dish pairing');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Get recommended wines
    const getRecommendedWines = async (maxPrice) => {
        try {
            setLoading(true);
            const response = await axios.get(`/food/wine/recommendation?maxPrice=${maxPrice}`);
            return response.data;
        } catch (err) {
            setError('Failed to fetch wine recommendations');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Wine catalog with descriptions and pairings
    const wineTypes = {
        'cabernet-sauvignon': {
            name: 'Cabernet Sauvignon',
            description: 'Full-bodied red wine with rich dark fruit flavors and firm tannins.',
            pairings: ['Steak', 'Lamb', 'Strong Cheeses'],
            serving: '60-65°F',
            characteristics: 'Full-bodied'
        },
        'pinot-noir': {
            name: 'Pinot Noir',
            description: 'Light to medium-bodied red wine with red fruit and earthy notes.',
            pairings: ['Chicken', 'Duck', 'Mushrooms'],
            serving: '55-60°F',
            characteristics: 'Light to Medium-bodied'
        },
        'chardonnay': {
            name: 'Chardonnay',
            description: 'Full-bodied white wine with apple and vanilla notes.',
            pairings: ['Fish', 'Poultry', 'Cream Sauces'],
            serving: '45-50°F',
            characteristics: 'Full-bodied'
        },
        'sauvignon-blanc': {
            name: 'Sauvignon Blanc',
            description: 'Crisp white wine with citrus and herbal notes.',
            pairings: ['Seafood', 'Salads', 'Goat Cheese'],
            serving: '45-50°F',
            characteristics: 'Light-bodied'
        },
        'merlot': {
            name: 'Merlot',
            description: 'Medium-bodied red wine with soft tannins and plum flavors.',
            pairings: ['Chicken', 'Pork', 'Pasta'],
            serving: '60-65°F',
            characteristics: 'Medium-bodied'
        }
    };

    const handleWineSelect = (wineKey) => {
        setSelectedWine(wineKey);
    };

    const popularPairings = [
        { name: 'steak', icon: '🥩' },
        { name: 'chicken', icon: '🍗' },
        { name: 'fish', icon: '🐟' },
        { name: 'pasta', icon: '🍝' },
        { name: 'chocolate', icon: '🍫' }
    ];

    // Add this new constant for pairings data
    const pairingGuide = [
        {
            food: 'Red Meat',
            icon: '🥩',
            description: 'Rich, fatty meats pair perfectly with full-bodied red wines that have high tannin levels.',
            wines: ['Cabernet Sauvignon', 'Malbec', 'Syrah']
        },
        {
            food: 'Poultry',
            icon: '🍗',
            description: 'Light to medium-bodied wines complement the subtle flavors of poultry dishes.',
            wines: ['Chardonnay', 'Pinot Noir', 'Sauvignon Blanc']
        },
        {
            food: 'Seafood',
            icon: '🐟',
            description: 'Light, crisp whites enhance seafood\'s natural flavors without overpowering them.',
            wines: ['Pinot Grigio', 'Sauvignon Blanc', 'Chablis']
        },
        {
            food: 'Pasta',
            icon: '🍝',
            description: 'Italian wines and pasta are natural partners, with the wine complementing various sauce types.',
            wines: ['Chianti', 'Barbera', 'Sangiovese']
        },
        {
            food: 'Cheese',
            icon: '🧀',
            description: 'The right wine can elevate a cheese plate from good to extraordinary.',
            wines: ['Port', 'Champagne', 'Cabernet Sauvignon']
        },
        {
            food: 'Dessert',
            icon: '🍰',
            description: 'Sweet wines complement desserts by matching or slightly exceeding their sweetness level.',
            wines: ['Moscato', 'Port', 'Sauternes']
        }
    ];

    return (
        <div className="wine-page">
            <div className="wine-container">
                <header className="wine-header">
                    <div className="wine-header-content">
                        <FaWineGlass className="wine-header-icon" />
                        <h1>Wine Companion</h1>
                        <p>Discover the perfect wine for every moment</p>
                    </div>
                </header>

                {loading ? (
                    <div className="wine-loading">
                        <div className="wine-loading-content">
                            <FaWineGlass className="wine-loading-icon" />
                            <span>Discovering perfect pairings...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="wine-selection-section">
                            <div className="wine-main-card">
                                <div className="wine-card-header">
                                    <FaWineBottle className="wine-card-icon" />
                                    <h2>Explore Wines</h2>
                                </div>
                                <div className="wine-card-body">
                                    <div className="wine-select-container">
                                        <select 
                                            className="wine-select"
                                            value={selectedWine}
                                            onChange={(e) => handleWineSelect(e.target.value)}
                                        >
                                            <option value="">Select a wine variety...</option>
                                            {Object.entries(wineTypes).map(([key, wine]) => (
                                                <option key={key} value={key}>
                                                    {wine.name}
                                                </option>
                                            ))}
                                        </select>
                                        <FaWineGlass className="wine-select-icon" />
                                    </div>

                                    {selectedWine && (
                                        <div className="wine-info">
                                            <h3>{wineTypes[selectedWine].name}</h3>
                                            <p className="wine-description">
                                                {wineTypes[selectedWine].description}
                                            </p>
                                            <div className="wine-characteristics">
                                                <div className="wine-characteristic">
                                                    <FaWineGlass className="characteristic-icon" />
                                                    <h4>Body</h4>
                                                    <p>{wineTypes[selectedWine].characteristics}</p>
                                                </div>
                                                <div className="wine-characteristic">
                                                    <FaThermometerHalf className="characteristic-icon" />
                                                    <h4>Serving</h4>
                                                    <p>{wineTypes[selectedWine].serving}</p>
                                                </div>
                                                <div className="wine-characteristic">
                                                    <FaGlassCheers className="characteristic-icon" />
                                                    <h4>Pairs Well With</h4>
                                                    <p>{wineTypes[selectedWine].pairings.join(', ')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="wine-pairing-section">
                            <div className="wine-main-card">
                                <div className="wine-card-header">
                                    <FaGlassCheers className="wine-card-icon" />
                                    <h2>Perfect Pairings Guide</h2>
                                </div>
                                <div className="wine-card-body">
                                    <div className="wine-pairing-grid">
                                        {pairingGuide.map((pairing, index) => (
                                            <div key={index} className="pairing-card">
                                                <div className="pairing-header">
                                                    <span className="pairing-icon">{pairing.icon}</span>
                                                    <h3 className="pairing-title">{pairing.food}</h3>
                                                </div>
                                                <p className="pairing-description">{pairing.description}</p>
                                                <div className="pairing-wines">
                                                    {pairing.wines.map((wine, idx) => (
                                                        <span key={idx} className="pairing-wine-tag">
                                                            <FaWineBottle /> {wine}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="wine-tips">
                            <h2>Wine Guide Essentials</h2>
                            <div className="wine-tips-grid">
                                <div className="wine-tip-card">
                                    <FaThermometerHalf className="wine-tip-icon" />
                                    <h3>Temperature Guide</h3>
                                    <p>Serve red wines at 60-65°F, white wines at 45-50°F, and sparkling wines at 40-45°F for optimal taste and aroma.</p>
                                </div>
                                <div className="wine-tip-card">
                                    <FaWineGlass className="wine-tip-icon" />
                                    <h3>Glassware Selection</h3>
                                    <p>Choose larger glasses for reds to allow breathing, smaller glasses for whites to preserve aromas, and flutes for sparkling wines.</p>
                                </div>
                                <div className="wine-tip-card">
                                    <FaGlassCheers className="wine-tip-icon" />
                                    <h3>Tasting Tips</h3>
                                    <p>Look at color and clarity, swirl to release aromas, smell the bouquet, and taste while noting the finish and complexity.</p>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}

export default WinePage; 
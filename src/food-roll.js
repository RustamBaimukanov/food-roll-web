import React, {useState} from 'react';
import axios from 'axios';

function FoodRoll() {
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [difficulty, setDifficulty] = useState('EASY');

    const fetchRandomFood = () => {
        setLoading(true);
        setError(null);
        axios.get(`http://localhost:8080/foods/roll?difficulty=${difficulty}`)
            .then(response => {
                setFood(response.data); // Предположим, что сервер возвращает один объект еды
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    return (
        <div>
            <h1>Выбор случайной еды</h1>
            <label htmlFor="difficulty">Выберите уровень сложности: </label>
            <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
            >
                <option value="EASY">EASY</option>
                <option value="NORMAL">NORMAL</option>
                <option value="HARD">HARD</option>
            </select>
            <button onClick={fetchRandomFood} disabled={loading}>
                {loading ? 'Загрузка...' : 'Выбрать случайную еду'}
            </button>
            {error && <div>Ошибка: {error}</div>}
            {food && (
                <div>
                    <h2>Случайная еда:</h2>
                    <p>{food.name}</p>
                    <img
                        src={`data:image/${food.imageFileExtension};base64,${food.image}`}
                        alt={food.name}
                        style={{maxWidth: '100%', height: 'auto'}}
                    />
                </div>

            )}
        </div>
    );
}

export default FoodRoll;

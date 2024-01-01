import { useContext, useState, useEffect } from 'react';
import './style.css';
import GoodsContext from '../../context/goods.context';
import GoodsComponent from '../goods';

const CounterComponent = () => {

  const [selectedGoods, setSelectedGoods] = useState([]); 
  const { data } = useContext(GoodsContext); 

  const findBestCombination = (data) => {
    const combinations = [];
    const bestCombination = [];
    let minSum = Infinity;

    function backtrack(combination, start, currentSum) {
      if (currentSum >= 40) {
        combinations.push(combination.slice());
        if (currentSum < minSum) {
          minSum = currentSum;
          bestCombination.splice(0, bestCombination.length, ...combination);
        }
        return;
      }

      for (let i = start; i < data.length; i++) {
        combination.push(data[i]);
        backtrack(combination, i + 1, currentSum + data[i]);
        combination.pop();
      }
    }

    backtrack([], 0, 0);
    return bestCombination;
  };

  const handleAutoDetect = () => { 
    const bestCombination = findBestCombination(data.map((el) => el.cost));
    const selectedIds = bestCombination.map((item) => data.find((good) => good.cost === item).id);
    setSelectedGoods(data.filter((good) => selectedIds.includes(good.id)));
  };

  const renderSelectedGoods = () => {
    const selectedIds = selectedGoods.map((item) => data.find((good) => good.cost === item).cost);
    const sum = selectedIds.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
    return (
      <div className='selected-goods'>
        {
          selectedGoods
          .map(el => <GoodsComponent {...el} key={'selected' + el.id} />)
        }
        <div className='sum'>{sum}</div>
      </div>
    );
  };

  return (
    <div className='cost-wrapper'>
      <div className='auto-detect' onClick={handleAutoDetect}>auto-detect</div>
      {renderSelectedGoods()}
    </div>
  );
};

export default CounterComponent;
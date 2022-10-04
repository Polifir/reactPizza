import React, {useState, useEffect} from 'react'
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";

export const Home = () => {
  const [pizzaCart, setPizzaCart] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({name: 'популярности', sortProperty: 'rating'});
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ]

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://633a752de02b9b64c6103a99.mockapi.io/PizzaCart?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=desc`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPizzaCart(json);
        setIsLoading(false);
      });
      window.scrollTo(0,0) 
  }, [categoryId, sortType]);
  return (
    <div className="container">
         <div className="content__top">
            <Categories value={categoryId} onClickCategory={(index)=> setCategoryId(index)} categories={categories} />
            <Sort value={sortType} onClickSort = {(i)=> setSortType(i)} />
          </div>
          <h2 className="content__title">{categories[categoryId]}</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
              : pizzaCart.map((obj, i) => <PizzaBlock key={i} {...obj} />)}
          </div>
    </div>    
  )
}

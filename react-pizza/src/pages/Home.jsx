import React, {useState, useEffect, createContext} from 'react'

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import {setCategoryId} from '../redux/slices/filterSlice'
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';

export const SortOrderContext = createContext()

export const Home = ({search}) => {
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sort.sortProperty)
  const sortOrderType = useSelector(state => state.filter.orderSort.sortOrderProperty)
  const dispatch = useDispatch();
  const [pizzaCart, setPizzaCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true);
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ]

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id))
  };


  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sortType;
  const descOrAsc = sortOrderType;
  // нет фильтрации на бекенде по запросу, так как mocapi плохо работает с дополнительными параметрами
 // пагинация захардкожена, так как бекенд не возвращает количетсво оставшихся страниц

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://633a752de02b9b64c6103a99.mockapi.io/PizzaCart?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${descOrAsc}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPizzaCart(json);
        setIsLoading(false);
      });
      window.scrollTo(0,0) 
  }, [categoryId, sortType, descOrAsc, search, currentPage]);
  return (
    <div className="container">

            <div className="content__top">
              <Categories value={categoryId} onClickCategory={onClickCategory} categories={categories} />
              <Sort 
              />
            </div>
            <h2 className="content__title">{categories[categoryId]}</h2>
            <div className="content__items">
              {isLoading
                ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
                : pizzaCart.filter((obj)=> obj.title.toLowerCase().includes(`${search.toLowerCase()}`)).map((obj, i) => <PizzaBlock key={i} {...obj} />)}
            </div>

          <Pagination onChangePage={number => setCurrentPage(number) }/>
    </div>    
  )
}

export default Home

import React, {useState, useEffect, createContext, useRef} from 'react'
import axios from 'axios';
import qs from 'qs'
import { Categories } from "../components/Categories";
import { Sort, sortList } from "../components/Sort";
import {setCategoryId, setPageCount, setFilters} from '../redux/slices/filterSlice'
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orderSortValue } from '../components/OrderSort/OrderSort';

export const SortOrderContext = createContext()

export const Home = ({search}) => {

  const isSearch = useRef(false)
  const isMountend = useRef(false)
  const navigate = useNavigate()
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sort.sortProperty)
  const sortOrderType = useSelector(state => state.filter.orderSort.sortOrderProperty)
  const pageCount = useSelector(state => state.filter.pageCount)
  const dispatch = useDispatch();
  const [pizzaCart, setPizzaCart] = useState([]);
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

  useEffect(()=>{
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1))
      console.log(params)
      console.log(window.location.search)
      const sort = sortList.find((obj)=> obj.sortProperty === params.sortType)
      const orderSort = orderSortValue.find((obj) => obj.sortOrderProperty === params.descOrAsc)
      dispatch(setFilters({
        ...params, sort, orderSort
      }))
      isSearch.current = true;
    }
  },[])

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sortType;
  const descOrAsc = sortOrderType;
  const onChangePage = number =>{
    dispatch(setPageCount(number))
  }

  const fetchPizzas = () =>{
    setIsLoading(true)
      axios.get(`https://633a752de02b9b64c6103a99.mockapi.io/PizzaCart?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${descOrAsc}`).then(res =>{
      setPizzaCart(res.data);
      setIsLoading(false);})
      window.scrollTo(0,0) 
  }

  useEffect(() => {
    window.scrollTo(0,0)

    if(!isSearch.current){
      fetchPizzas()
    }
    isSearch.current = false;
  }, [categoryId, sortType, descOrAsc, search, pageCount]);

  useEffect(()=>{
   if(isMountend.current){
    const queryString = qs.stringify({
      search,
      sortType,
      categoryId,
      pageCount,
      descOrAsc
    })
    navigate(`?${queryString}`)
   }

   isMountend.current = true;
  }, [categoryId, sortType, descOrAsc, search, pageCount])

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

          <Pagination value={pageCount} onChangePage={number => onChangePage(number) }/>
    </div>    
  )
}

export default Home

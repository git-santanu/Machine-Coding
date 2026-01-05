import { useCallback, useEffect, useState } from 'react'
import '../App.css';
import ProductItem from './ProductItem';
const PER_PAGE_ITEMS = 10;

const Pagination = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PER_PAGE_ITEMS;
  const endIndex = startIndex + PER_PAGE_ITEMS;
  const totalPages = Math.ceil(items.length / PER_PAGE_ITEMS);

  const fetchItems = useCallback(async () => {
    try {
      const data = await fetch('https://dummyjson.com/products?limit=100');
      const json = await data.json();
      setItems(json.products);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }, [setItems]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  console.log('items', items);

  return (
    <>
      <div className='container'>
        {items.length > 0 ?
          items.slice(startIndex, endIndex).map(item =>
              <ProductItem key={item.id} item={item} />
          )
          : <p>loading...</p>
        }
      </div>
      <div className='pagination_container'>
        {
          [...Array(totalPages)].map((_, index) => (
            <button key={index} className='page_button' style={{
              backgroundColor: index === currentPage - 1 ? '#007bff' : '',
            }}
              onClick={() => {
                setCurrentPage(index + 1)
              }}
            >
              {index + 1}
            </button>
          ))
        }
      </div>
    </>
  )
}

export default Pagination;
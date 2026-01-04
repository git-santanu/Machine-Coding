import { useCallback, useEffect, useState } from 'react'
import '../App.css';
const PER_PAGE_ITEMS = 10;

const Pagination = () => {
  const [isHover, setIsHover] = useState({});
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PER_PAGE_ITEMS;
  const endIndex = startIndex + PER_PAGE_ITEMS;
  const totalPages = Math.ceil(items.length / PER_PAGE_ITEMS);

  const fetchItems = async () => {
    try {
      const data = await fetch('https://dummyjson.com/products?limit=100');
      const json = await data.json();
      setItems(json.products);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  console.log(items);
  useEffect(() => {
    fetchItems();
  }, []);

  const handleHoverEnter = useCallback((id) => {
    setIsHover(prev => ({...prev, [id]: true}));
  }, [isHover]);

  const handleHoverLeave = useCallback((id) => {
    setIsHover(prev => ({...prev, [id]: false}));
  }, [isHover]);

  return (
    <>
      <div className='container'>
        {items.length > 0 ?
          items.slice(startIndex, endIndex).map(item =>
            <div key={item.id} className='prduct_details'>
              <img src={item.thumbnail} alt={item.title} width="100" />
              <div
                onMouseEnter={() => handleHoverEnter(item.id)}
                onMouseLeave={() => handleHoverLeave(item.id)}
              >
                {item.title}
              </div>
              {isHover[item.id] && <div className='product_description'>{item.description}</div>}
            </div>
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
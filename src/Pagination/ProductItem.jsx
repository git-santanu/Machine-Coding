import { memo, useCallback, useState } from "react";
import "../App.css";

const ProductItem = memo(({ item }) => {
    const [isHover, setIsHover] = useState({});

    const handleHoverEnter = useCallback((id) => {
        setIsHover(prev => ({ ...prev, [id]: true }));
    }, []);

    const handleHoverLeave = useCallback((id) => {
        setIsHover(prev => ({ ...prev, [id]: false }));
    }, []);

    return (
        <div className="prduct_details">
            <img src={item.thumbnail} width="100" alt={item.title} />

            <div
                onMouseEnter={() => handleHoverEnter(item.id)}
                onMouseLeave={() => handleHoverLeave(item.id)}
            >
                {item.title}
            </div>

            {isHover[item.id] && (
                <div className="product_description">
                    {item.description}
                </div>
            )}
        </div>
    );
});
export default ProductItem;

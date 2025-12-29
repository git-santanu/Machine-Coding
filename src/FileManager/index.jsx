import  { useState } from 'react'

const FileManager = ({ data }) => {
  const [expandIds, setExpandIds] = useState(new Set());

  const handleExpand = (eachItemId) => {
    setExpandIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(eachItemId)) {
        newSet.delete(eachItemId);
      } else {
        newSet.add(eachItemId);
      }
      return newSet;
    });
  };

  return (
    <div>
      {
        data.length > 0 && data.map((item) => {
          const isExpanded = expandIds.has(item.id);
          return (
            <div key={item.id}>
              {item?.children && (
                <span style={{ margin: '5px', cursor: 'pointer' }} onClick={() => handleExpand(item.id)}>
                  {isExpanded ? '▼' : '▶'}
                  </span>)
              } {item.name}
              {isExpanded && item?.children && item.children.map((child) => (
                <div key={child.id} style={{ marginLeft: '20px' }}>
                  <FileManager data={[child]} />
                </div>
              ))}
            </div>
          )
        })
      }
    </div>
  )
}

export default FileManager;
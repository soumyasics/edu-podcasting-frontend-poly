import React, { useState, useEffect } from 'react';

function HidePermanentlyOnClick() {
  const [isHidden, setIsHidden] = useState(localStorage.getItem('isHidden') === 'true');

  const handleClick = () => {
    setIsHidden(true);
    localStorage.setItem('isHidden', 'true');
  };

  useEffect(() => {
    if (isHidden) {
      localStorage.setItem('isHidden', 'true');
    } else {
      localStorage.removeItem('isHidden');
    }
  }, [isHidden]);

  return (
    <div>
      {!isHidden && (
        <div>
          <h2>This is the content you want to hide permanently.</h2>
          <button onClick={handleClick}>Hide Content Permanently</button>
        </div>
      )}
    </div>
  );
}

export default HidePermanentlyOnClick;

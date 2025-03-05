import React, { useState } from "react";

const images = [
  "https://picsum.photos/200/300", 
  "https://picsum.photos/200/301", 
  "https://picsum.photos/200/302",
  "https://picsum.photos/200/303",
  "https://picsum.photos/200/304",
];

const Carousel = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - visibleCount >= 0 ? prev - visibleCount : 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + visibleCount < images.length ? prev + visibleCount : null
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="number"
        min="1"
        max={images.length}
        value={visibleCount}
        onChange={(e) => setVisibleCount(Math.min(images.length, e.target.value))}
        style={{ marginBottom: "10px" }}
      />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <button onClick={handlePrev} disabled={startIndex === 0}>⬅</button>
        <div style={{ display: "flex", overflow: "hidden", width: `${visibleCount * 310}px` }}>
          {images.slice(startIndex, startIndex + visibleCount).map((src, index) => (
            <img key={index} src={src} alt={`Slide ${index}`} style={{ width: "300px", margin: "5px" }} />
          ))}
        </div>
        <button onClick={handleNext} disabled={startIndex + visibleCount >= images.length}>➡</button>
      </div>
    </div>
  );
};

export default Carousel;

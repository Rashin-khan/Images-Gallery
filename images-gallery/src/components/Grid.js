import { useState, useRef, useEffect } from "react";
import { useScreenResize } from "../utils/handlers";
import { masonryColumns } from "../utils/masonry";
import { HeartIcon } from "../styles/icons";
import data from "../utils/data";

export function ContainerGrid({
  photosArray,
  rowGap,
  columnGap,
  minColumns,
  handleLike
}) {

  const screenWidths = [
    data.SCREEN_WIDTH_1COLUMN,
    data.SCREEN_WIDTH_2COLUMNS,
    data.SCREEN_WIDTH_3COLUMNS,
  ];
    
  const imageWidths = [
    data.IMAGE_WIDTH_1COLUMN,
    data.IMAGE_WIDTH_2COLUMNS,
    data.IMAGE_WIDTH_3COLUMNS,
  ];

  const [maxImageWidth, setMaxImageWidth] = useState(
    imageWidths[imageWidths.length - 1]
  );
  const [currentImageWidth, setCurrentImageWidth] = useState(
    imageWidths[imageWidths.length - 1]
  );
  const [columns, setColumns] = useState([]);
  const [numberOfColumns, setNumberOfColumns] = useState(
    imageWidths.length - 1
  );

  const gridRef = useRef();
  let [screenWidth] = useScreenResize(100);

  useEffect(() => {
    for (let i = 0; i < screenWidths.length; i++) {
      if (screenWidth < screenWidths[i]) {
        setNumberOfColumns(i + minColumns);
        setMaxImageWidth(imageWidths[i]);
        break;
      }
      setNumberOfColumns(screenWidths.length - 1);
      setMaxImageWidth(screenWidths[screenWidths.length - 1]);
    }
  }, [screenWidth, imageWidths, screenWidths, minColumns]);

  useEffect(() => {
    if (photosArray && photosArray.length !== 0) {
      setColumns(
        masonryColumns({
          photosArray,
          numberOfColumns,
          IMAGE_WIDTH: maxImageWidth,
          ROW_GAP: rowGap,
        })
      );
    }
  }, [photosArray, numberOfColumns, rowGap, maxImageWidth]);

  useEffect(() => {
    if (gridRef.current) {
      const newWidth = gridRef.current.clientWidth / columns.length - columnGap;
      if (newWidth > maxImageWidth) {
        setCurrentImageWidth(maxImageWidth);
      } else {
        setCurrentImageWidth(newWidth); 
      }
    }
  }, [columnGap, screenWidth, columns, maxImageWidth]);

  if (photosArray === undefined || photosArray.length === 0) {
    return null;
  }

  return (
    <div className="grid" style={{ gap: columnGap }} ref={gridRef}>
      {columns.map((column, index) => {
        return (
          <div className="container" key={index}>
            {column.map((image) => {
              return (
                <>
                <div className="Yc58P qO6EX">
                  <button className="like-icon" title="Like" type="button" onClick={handleLike}>
                    <HeartIcon />
                  </button>
                  </div>
                <img
                  key={image.id}
                  src={image.urls.thumb}
                  IMAGE_WIDTH={currentImageWidth}
                />
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
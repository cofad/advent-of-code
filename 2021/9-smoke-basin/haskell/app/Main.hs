import Data.Char

main = do
  heightMapString <- readFile "data-example.txt"
  let heightMap = createHeightMap heightMapString
  print heightMap

createHeightMap :: String -> [[Int]]
createHeightMap heightMapString = [map digitToInt row | row <- lines heightMapString]

-- getNeighbors heightMap
-- compareNeighbors

newtype Top = Top Int

newtype Left = Left Int

newtype Right = Right Int

newtype Bottom = Bottom Int

newtype PointWithNeighbors = PointWithNeighbors Int Top Right Bottom Left

getNeighbors :: [[Int]] -> [PointWithNeighbors]
getNeighbors = [1 2 3 4 5 6]

-- import Data.Char
-- import qualified Data.Functor

-- data Coord = Coord Int Int Int deriving (Show)

-- data Point = Point Coord [Coord] deriving (Show)

-- main = do
--   heightMapString <- readFile "data-example.txt"
--   let heightMap = createHeightMap heightMapString
--   let maxRowIndex = length heightMap - 1
--   let maxColIndex = length (head heightMap) - 1
--   let indices = [(x, y) | x <- [0 .. maxRowIndex], y <- [0 .. maxColIndex]]
--   let points = foldl (\acc (x, y) -> createPoint x y heightMap : acc) [] indices
--   let minPoints = foldl (\acc point -> addMinPoint (isMinPoint point) point acc) [] points
--   let partOne = foldl (\sum (Point (Coord _ _ val) _) -> sum + val + 1) 0 minPoints

--   print heightMap
--   print maxRowIndex
--   print maxColIndex
--   print indices
--   print points
--   print partOne

-- createHeightMap :: String -> [[Int]]
-- createHeightMap heightMapString = [map digitToInt row | row <- lines heightMapString]

-- createPoint :: Int -> Int -> [[Int]] -> Point
-- createPoint rowIndex colIndex matrix = do
--   let entry = matrix !! rowIndex !! colIndex
--   let Just (neighborPoints, _) = addNeighbor (rowIndex - 1) colIndex ([], matrix) >>= addNeighbor (rowIndex + 1) colIndex >>= addNeighbor rowIndex (colIndex -1) >>= addNeighbor rowIndex (colIndex + 1)
--   Point (Coord rowIndex colIndex entry) neighborPoints

-- addNeighbor :: Int -> Int -> ([Coord], [[Int]]) -> Maybe ([Coord], [[Int]])
-- addNeighbor rowIndex colIndex (points, matrix)
--   | rowIndex >= 0 && colIndex >= 0 = case nthElem colIndex (nthElem rowIndex (Just matrix)) of
--     Nothing -> Just (points, matrix)
--     Just val -> Just (Coord rowIndex colIndex val : points, matrix)
--   | otherwise = Just (points, matrix)

-- nthElem :: Int -> Maybe [a] -> Maybe a
-- nthElem _ Nothing = Nothing
-- nthElem _ (Just []) = Nothing
-- nthElem 0 (Just (x : xs)) = Just x
-- nthElem n (Just (x : xs)) = nthElem (n - 1) (Just xs)

-- addMinPoint :: Bool -> Point -> [Point] -> [Point]
-- addMinPoint True point sum = point : sum
-- addMinPoint False _ sum = sum

-- isMinPoint :: Point -> Bool
-- isMinPoint (Point (Coord x y val) []) = True
-- isMinPoint (Point (Coord x y val) ((Coord _ _ checkVal) : rest))
--   | val <= checkVal = isMinPoint (Point (Coord y x val) rest)
--   | otherwise = False
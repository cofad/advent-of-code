module Lib ( calculateMaxCalories, calculateTopThreeCaloriesSum ) where

import Data.List.Split
import Data.List

calculateMaxCalories :: String -> Integer
calculateMaxCalories calorieData =
  maximum (map sum (splitWhen isZero (map parseToInt (lines calorieData))))

calculateTopThreeCaloriesSum :: String -> Integer
calculateTopThreeCaloriesSum calorieData =
  sum (take 3 (reverse (sort (map sum (splitWhen isZero (map parseToInt (lines calorieData)))))))

isZero :: Integer -> Bool
isZero 0 = True
isZero _ = False

parseToInt :: String -> Integer 
parseToInt "" = 0
parseToInt x = read x
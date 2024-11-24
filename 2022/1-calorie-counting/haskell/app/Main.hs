module Main (main) where

import Lib

main :: IO ()
main = do
  calorieDataExample <- readFile "data-example.txt"
  calorieData <- readFile "data.txt"

  print "Day 1 - Part One - Example"
  print (calculateMaxCalories calorieDataExample)

  print "Day 1 - Part One"
  print (calculateMaxCalories calorieData)

  print "Day 1 - Part Two - Example"
  print (calculateTopThreeCaloriesSum calorieDataExample)

  print "Day 1 - Part Two - Example"
  print (calculateTopThreeCaloriesSum calorieData)

use std::fs;

pub const DATA_FILE_NAME: &str = "data.txt";
pub const DATA_FILE_NAME_EXAMPLE: &str = "data-example.txt";

fn main() {
    println!(
        "Part One - Example: Max Calories            = {}",
        calculate_max_carried_calories(DATA_FILE_NAME_EXAMPLE)
    );

    println!(
        "Part One          : Max Calories            = {}",
        calculate_max_carried_calories(DATA_FILE_NAME)
    );

    println!(
        "Part Two - Example: Top Three Calories Sum  = {}",
        sum_top_three_carried_calories(DATA_FILE_NAME_EXAMPLE)
    );

    println!(
        "Part Two          : Top Three Calories Sums = {}",
        sum_top_three_carried_calories(DATA_FILE_NAME)
    );
}

fn calculate_max_carried_calories(filename: &str) -> i32 {
    let calorie_data: String = read_in_data(filename);

    let mut max_carried_calories: i32 = 0;
    let mut carried_calories: i32 = 0;

    for calories in calorie_data.lines() {
        match calories {
            "" => {
                if carried_calories > max_carried_calories {
                    max_carried_calories = carried_calories
                }

                carried_calories = 0;
            }
            _ => carried_calories += calories.parse::<i32>().unwrap(),
        }
    }

    max_carried_calories
}

fn sum_top_three_carried_calories(filename: &str) -> i32 {
    let calorie_data: String = read_in_data(filename);
    let mut all_carried_calories = vec![];
    let mut carried_calories: i32 = 0;

    for calories in calorie_data.lines() {
        match calories {
            "" => {
                all_carried_calories.push(carried_calories);
                carried_calories = 0;
            }
            _ => {
                carried_calories += calories.parse::<i32>().unwrap();
            }
        }
    }

    all_carried_calories.sort();
    all_carried_calories.reverse();
    all_carried_calories[..3].to_vec().into_iter().sum()
}

fn read_in_data(filename: &str) -> String {
    // Add new line to end to locate the end of the last section
    fs::read_to_string(filename).expect("error reading file") + "\n\n"
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn should_pass_part_one_example() {
        let max_calories: i32 = calculate_max_carried_calories(DATA_FILE_NAME_EXAMPLE);
        assert_eq!(24000, max_calories);
    }

    #[test]
    fn should_pass_part_one() {
        let max_calories: i32 = calculate_max_carried_calories(DATA_FILE_NAME);
        assert_eq!(69528, max_calories);
    }

    #[test]
    fn should_pass_part_two_example() {
        let top_three_max_calories: i32 = sum_top_three_carried_calories(DATA_FILE_NAME_EXAMPLE);
        assert_eq!(45000, top_three_max_calories);
    }

    #[test]
    fn should_pass_part_two() {
        let top_three_max_calories: i32 = sum_top_three_carried_calories(DATA_FILE_NAME);
        assert_eq!(206152, top_three_max_calories);
    }
}

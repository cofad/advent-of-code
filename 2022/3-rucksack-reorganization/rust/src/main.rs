use std::fs;

pub const DATA_FILE_NAME: &str = "data.txt";
pub const DATA_FILE_NAME_EXAMPLE: &str = "data-example.txt";

fn main() {
    println!(
        "Part One - Example: Rucksack Content Priorities Sum = {}",
        calculate_priorities_sum(DATA_FILE_NAME_EXAMPLE)
    );

    println!(
        "Part One          : Rucksack Content Priorities Sum = {}",
        calculate_priorities_sum(DATA_FILE_NAME)
    );

    println!(
        "Part Two - Example: Get Badge Items Sum             = {}",
        calculate_badge_priority_sum(DATA_FILE_NAME_EXAMPLE)
    );

    println!(
        "Part Two          : Get Badge Items Sum             = {}",
        calculate_badge_priority_sum(DATA_FILE_NAME)
    );
}

fn calculate_priorities_sum(filename: &str) -> i32 {
    let rucksack_items = read_in_data(filename);
    let mut priority_sum = 0;

    for items in rucksack_items {
        let compartment_one_items = items.get(0..items.len() / 2).unwrap();
        let compartment_two_items = items.get(items.len() / 2..).unwrap();

        let mut first_items: u64 = 0;

        for item in compartment_one_items.chars() {
            let item_ascii_value = item as u32;

            if item_ascii_value >= 97 {
                first_items = first_items | (2 as u64).pow(item_ascii_value - 96 - 1)
            } else {
                first_items = first_items | (2 as u64).pow(item_ascii_value - 64 + 26 - 1)
            }
        }

        let mut second_items: u64 = 0;

        for item in compartment_two_items.chars() {
            let item_ascii_value = item as u32;

            if item_ascii_value >= 97 {
                second_items = second_items | (2 as u64).pow(item_ascii_value - 96 - 1)
            } else {
                second_items = second_items | (2 as u64).pow(item_ascii_value - 64 + 26 - 1)
            }
        }

        let mut duplicate_item = first_items & second_items;

        let mut priority = 0;

        while duplicate_item > 0 {
            duplicate_item = duplicate_item >> 1;
            priority += 1;
        }

        priority_sum += priority;
    }

    priority_sum
}

fn calculate_badge_priority_sum(filename: &str) -> i32 {
    let mut rucksack_items = read_in_data(filename);
    let mut grouped_rucksack_items: Vec<[String; 3]> = vec![];
    let mut priority_sum = 0;

    while (rucksack_items.len() / 3) > 0 {
        grouped_rucksack_items.push([
            rucksack_items.remove(0),
            rucksack_items.remove(0),
            rucksack_items.remove(0),
        ]);
    }

    for group in grouped_rucksack_items {
        let mut first_items: u64 = 0;

        for item in group[0].chars() {
            let item_ascii_value = item as u32;

            if item_ascii_value >= 97 {
                first_items = first_items | (2 as u64).pow(item_ascii_value - 96 - 1)
            } else {
                first_items = first_items | (2 as u64).pow(item_ascii_value - 64 + 26 - 1)
            }
        }

        let mut second_items: u64 = 0;

        for item in group[1].chars() {
            let item_ascii_value = item as u32;

            if item_ascii_value >= 97 {
                second_items = second_items | (2 as u64).pow(item_ascii_value - 96 - 1)
            } else {
                second_items = second_items | (2 as u64).pow(item_ascii_value - 64 + 26 - 1)
            }
        }

        let mut third_items: u64 = 0;

        for item in group[2].chars() {
            let item_ascii_value = item as u32;

            if item_ascii_value >= 97 {
                third_items = third_items | (2 as u64).pow(item_ascii_value - 96 - 1)
            } else {
                third_items = third_items | (2 as u64).pow(item_ascii_value - 64 + 26 - 1)
            }
        }

        let mut badge = first_items & second_items & third_items;

        let mut priority = 0;

        while badge > 0 {
            badge = badge >> 1;
            priority += 1;
        }

        priority_sum += priority;
    }

    priority_sum
}

fn read_in_data(filename: &str) -> Vec<String> {
    fs::read_to_string(filename)
        .expect("error reading file")
        .split("\n")
        .map(String::from)
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn should_pass_part_one_example() {
        let priorities_sum: i32 = calculate_priorities_sum(DATA_FILE_NAME_EXAMPLE);
        assert_eq!(157, priorities_sum);
    }

    #[test]
    fn should_pass_part_one() {
        let priorities_sum: i32 = calculate_priorities_sum(DATA_FILE_NAME);
        assert_eq!(7889, priorities_sum);
    }

    #[test]
    fn should_pass_part_two_example() {
        let badge_priority_sum: i32 = calculate_badge_priority_sum(DATA_FILE_NAME_EXAMPLE);
        assert_eq!(70, badge_priority_sum);
    }

    #[test]
    fn should_pass_part_two() {
        let top_three_max_calories: i32 = calculate_badge_priority_sum(DATA_FILE_NAME);
        assert_eq!(2825, top_three_max_calories);
    }
}

use std::fs;

pub const DATA_FILE_NAME: &str = "data.txt";
pub const DATA_FILE_NAME_EXAMPLE: &str = "data-example.txt";

#[derive(Debug)]
struct Sections {
    start: i32, // inclusive
    end: i32,   // inclusive
}

fn main() {
    println!(
        "Part One - Example: Count of Nested Sections      = {}",
        calculate_num_nested_sections(DATA_FILE_NAME_EXAMPLE)
    );

    println!(
        "Part One          : Count of Nested Sections      = {}",
        calculate_num_nested_sections(DATA_FILE_NAME)
    );

    println!(
        "Part Two - Example: Count of Overlapping Sections = {}",
        calculate_num_overlapping_sections(DATA_FILE_NAME_EXAMPLE)
    );

    println!(
        "Part Two          : Count of Overlapping Sections = {}",
        calculate_num_overlapping_sections(DATA_FILE_NAME)
    );
}

fn calculate_num_nested_sections(filename: &str) -> i32 {
    let all_section_pairs = read_in_data(filename);
    let mut count = 0;

    for pair in all_section_pairs {
        let sections_a = pair.get(0).unwrap();
        let sections_b = pair.get(1).unwrap();

        if calculate_if_sections_are_nested(sections_a, sections_b) {
            count += 1;
        }
    }

    count
}

fn calculate_num_overlapping_sections(filename: &str) -> i32 {
    let all_section_pairs = read_in_data(filename);

    let mut count = 0;

    for pair in all_section_pairs {
        let sections_a = pair.get(0).unwrap();
        let sections_b = pair.get(1).unwrap();

        if calculate_if_sections_are_overlapping(sections_a, sections_b) {
            count += 1;
        }
    }

    count
}

fn calculate_if_sections_are_overlapping(sections_a: &Sections, sections_b: &Sections) -> bool {
    (sections_a.end >= sections_b.start && sections_a.start <= sections_b.start)
        || (sections_b.end >= sections_a.start && sections_b.start <= sections_a.start)
}

fn calculate_if_sections_are_nested(sections_a: &Sections, sections_b: &Sections) -> bool {
    let is_sections_a_nested =
        sections_a.start >= sections_b.start && sections_a.end <= sections_b.end;

    let is_sections_b_nested =
        sections_b.start >= sections_a.start && sections_b.end <= sections_a.end;

    return is_sections_a_nested || is_sections_b_nested;
}

fn read_in_data(filename: &str) -> Vec<Vec<Sections>> {
    let pairs: Vec<String> = fs::read_to_string(filename)
        .expect("error reading file")
        .split("\n")
        .map(String::from)
        .collect();

    pairs
        .into_iter()
        .map(|pair| {
            pair.split(",")
                .map(|pair| Sections {
                    start: pair.split_once("-").unwrap().0.parse().unwrap(),
                    end: pair.split_once("-").unwrap().1.parse().unwrap(),
                })
                .collect()
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn should_pass_part_one_example() {
        let num_nested_sections: i32 = calculate_num_nested_sections(DATA_FILE_NAME_EXAMPLE);
        assert_eq!(2, num_nested_sections);
    }

    #[test]
    fn should_pass_part_one() {
        let num_nested_sections: i32 = calculate_num_nested_sections(DATA_FILE_NAME);
        assert_eq!(536, num_nested_sections);
    }

    #[test]
    fn should_pass_part_two_example() {
        let num_overlapping_sections: i32 =
            calculate_num_overlapping_sections(DATA_FILE_NAME_EXAMPLE);
        assert_eq!(4, num_overlapping_sections);
    }

    #[test]
    fn should_pass_part_two() {
        let num_overlapping_sections: i32 = calculate_num_overlapping_sections(DATA_FILE_NAME);
        assert_eq!(845, num_overlapping_sections);
    }
}

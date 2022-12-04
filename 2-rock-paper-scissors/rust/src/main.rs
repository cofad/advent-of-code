use std::fs;

pub const DATA_FILE_NAME: &str = "data.txt";
pub const DATA_FILE_NAME_EXAMPLE: &str = "data-example.txt";

fn main() {
    println!(
        "Part One - Example: Strategy Guide Score         = {}",
        calculate_strategy_guide_score(DATA_FILE_NAME_EXAMPLE)
    );

    println!(
        "Part One          : Strategy Guide Score         = {}",
        calculate_strategy_guide_score(DATA_FILE_NAME)
    );

    println!(
        "Part Two - Example: Updated Strategy Guide Score = {}",
        calculate_updated_strategy_guide_score(DATA_FILE_NAME_EXAMPLE)
    );

    println!(
        "Part Two          : Updated Strategy Guide Score = {}",
        calculate_updated_strategy_guide_score(DATA_FILE_NAME)
    );
}

fn calculate_strategy_guide_score(filename: &str) -> i32 {
    let strategy_guide_data: String = read_in_data(filename);

    strategy_guide_data
        .lines()
        .map(|strategy| calculate_score(strategy))
        .sum::<i32>()
}

fn calculate_updated_strategy_guide_score(filename: &str) -> i32 {
    let strategy_guide_data: String = read_in_data(filename);

    strategy_guide_data
        .lines()
        .map(|strategy| calculate_updated_score(strategy))
        .sum::<i32>()
}

fn calculate_score(strategy: &str) -> i32 {
    // A = Rock = 1
    // B = Paper = 2
    // C = Scissors = 3

    // X = Rock
    // Y = Paper
    // Z = Scissors

    match strategy {
        "A X" => 3 + 1,
        "A Y" => 6 + 2,
        "A Z" => 0 + 3,

        "B X" => 0 + 1,
        "B Y" => 3 + 2,
        "B Z" => 6 + 3,

        "C X" => 6 + 1,
        "C Y" => 0 + 2,
        "C Z" => 3 + 3,

        _ => 0,
    }
}

fn calculate_updated_score(strategy: &str) -> i32 {
    // A = Rock = 1
    // B = Paper = 2
    // C = Scissors = 3

    // X = Lose
    // Y = Draw
    // Z = Win

    match strategy {
        "A X" => 0 + 3,
        "A Y" => 3 + 1,
        "A Z" => 6 + 2,

        "B X" => 0 + 1,
        "B Y" => 3 + 2,
        "B Z" => 6 + 3,

        "C X" => 0 + 2,
        "C Y" => 3 + 3,
        "C Z" => 6 + 1,

        _ => 0,
    }
}

fn read_in_data(filename: &str) -> String {
    // Add new line to end to locate the end of the last section
    fs::read_to_string(filename).expect("error reading file")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn should_pass_part_one_example() {
        let score: i32 = calculate_strategy_guide_score(DATA_FILE_NAME_EXAMPLE);
        assert_eq!(15, score);
    }

    #[test]
    fn should_pass_part_one() {
        let score: i32 = calculate_strategy_guide_score(DATA_FILE_NAME);
        assert_eq!(12586, score);
    }

    #[test]
    fn should_pass_part_two_example() {
        let score: i32 = calculate_updated_strategy_guide_score(DATA_FILE_NAME_EXAMPLE);
        assert_eq!(12, score);
    }

    #[test]
    fn should_pass_part_two() {
        let score: i32 = calculate_strategy_guide_score(DATA_FILE_NAME);
        assert_eq!(13193, score);
    }
}

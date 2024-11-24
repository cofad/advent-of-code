use std::fs;

pub const FILE_NAME: &str = "data.txt";
pub const FILE_NAME_EXAMPLE: &str = "data-example.txt";

// const CANONICAL: [u8; 10] = [
//     0b1110111, 0b0010010, 0b1011101, 0b1011011, 0b0111010, 0b1101011, 0b1101111, 0b1010010,
//     0b1111111, 0b1111011,
// ];

pub struct Display {
    pub unique_signals: Vec<String>,
    pub outputs: Vec<String>,
}

pub fn part_two(displays: &Vec<Display>) {
    // let values = displays.first().unwrap().unique_signals.map(|x| x.to_owned()).collect();

    let mut counts: [u32; 7] = [0, 0, 0, 0, 0, 0, 0];

    for signal in &displays.first().unwrap().unique_signals {
        for char in signal.chars() {
            let index = char as usize - 97;
            counts[index] = counts[index] + 1;
        }
    }

    for (i, el) in counts.iter().enumerate() {
        if (count == 6) {}
    }

    println!("{}",);
    println!("{}",);

    println!("{:?}", counts);

    // println!("{:?}",);
}

pub fn read_in_displays(filename: &str) -> Vec<Display> {
    let input_str = fs::read_to_string(filename).expect("error reading file");

    input_str
        .lines()
        .map(|line| {
            let (signals, displays) = line.split_once(" | ").unwrap();
            let unique_signals = signals.split(" ").map(|x| x.to_owned()).collect();
            let outputs = displays.split(" ").map(|x| x.to_owned()).collect();

            Display {
                unique_signals,
                outputs,
            }
        })
        .collect()
}

pub fn calculate_digit_count_of_1_4_7_8(displays: &Vec<Display>) -> u64 {
    let mut digit_count = 0;
    for display in displays {
        for output in &display.outputs {
            let increment;

            match output.len() {
                2..=4 | 7 => increment = 1,
                _ => increment = 0,
            }

            digit_count = digit_count + increment;
        }
    }

    digit_count
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn should_pass_part_one_for_example() {
        let displays = read_in_displays(FILE_NAME_EXAMPLE);
        assert_eq!(26, calculate_digit_count_of_1_4_7_8(&displays));
    }

    #[test]
    fn should_pass_part_one() {
        let displays = read_in_displays(FILE_NAME);
        assert_eq!(255, calculate_digit_count_of_1_4_7_8(&displays));
    }

    // #[test]
    // fn should_pass_part_two_for_example() {
    //     let displays = read_in_displays(FILE_NAME_EXAMPLE);
    //     assert_eq!(26, calculate_sum_of_outputs(displays));
    // }

    // #[test]
    // fn should_pass_part_two() {
    //     let displays = read_in_displays(FILE_NAME);
    //     assert_eq!(26, calculate_sum_of_outputs(displays));
    // }
}

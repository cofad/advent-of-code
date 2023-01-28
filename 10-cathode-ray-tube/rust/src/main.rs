use std::fs;

pub const DATA_FILE_NAME: &str = "data.txt";
pub const DATA_FILE_NAME_EXAMPLE: &str = "data-example.txt";

#[derive(Debug, Clone)]
enum Opcode {
    ADDX,
    NOOP,
}

#[derive(Debug, Clone)]
struct Instruction {
    opcode: Opcode,
    value: Option<i32>,
}

#[derive(Debug)]
struct Cycle {
    count: i32,
    register: i32,
}

fn main() {
    println!("Part One - Example: {}", part_one(DATA_FILE_NAME_EXAMPLE));
    println!("Part One          : {}", part_one(DATA_FILE_NAME));
}

fn part_one(filename: &str) -> i32 {
    let mut register = 1;
    let mut count = 1;
    let mut cycles: Vec<Cycle> = vec![];

    let instructions = parse_data(filename);

    for instruction in instructions {
        match instruction.opcode {
            Opcode::ADDX => {
                count += 1;

                cycles.push(Cycle {
                    count: count,
                    register: register,
                });

                count += 1;

                match instruction.value {
                    Some(x) => register += x,
                    None => register += 0,
                };
            }
            Opcode::NOOP => {
                count += 1;
            }
        }

        cycles.push(Cycle {
            count: count.to_owned(),
            register: register.to_owned(),
        });
    }

    let check_cycles = [20, 60, 100, 140, 180, 220];

    cycles
        .into_iter()
        .filter(|x| check_cycles.contains(&x.count))
        .map(|x| x.register * x.count)
        .sum::<i32>()
}

fn parse_data(filename: &str) -> Vec<Instruction> {
    fs::read_to_string(filename)
        .expect("error reading file")
        .split('\n')
        .map(|x| {
            let instruction: Vec<&str> = x.split(" ").collect();

            Instruction {
                opcode: match instruction.get(0).unwrap().to_owned() {
                    "addx" => Opcode::ADDX,
                    "noop" => Opcode::NOOP,
                    _ => panic!("unknown opcode in input data"),
                },
                value: match instruction.get(1) {
                    Some(x) => Some(x.to_owned().parse::<i32>().unwrap()),
                    None => None,
                },
            }
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn should_pass_part_one_example() {
        assert_eq!(13140, part_one(DATA_FILE_NAME_EXAMPLE));
    }

    #[test]
    fn should_pass_part_one() {
        assert_eq!(16880, part_one(DATA_FILE_NAME));
    }

    // #[test]
    // fn should_pass_part_two_example() {
    //     assert_eq!(45000, part_two());
    // }

    // #[test]
    // fn should_pass_part_two() {
    //     assert_eq!(45000, part_two());
    // }
}

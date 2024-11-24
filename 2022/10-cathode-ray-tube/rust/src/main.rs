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
    crt: i32,
}

fn main() {
    println!("Part One - Example: {}", part_one(DATA_FILE_NAME_EXAMPLE));
    println!("Part One          : {}", part_one(DATA_FILE_NAME));
    println!(
        "Part Two - Example: \n\n{}",
        part_two(DATA_FILE_NAME_EXAMPLE)
    );
    println!("Part Two          : \n\n{}", part_two(DATA_FILE_NAME));
}

fn part_one(filename: &str) -> i32 {
    let instructions = parse_data(filename);
    let cycles = create_cycles(instructions);
    let check_cycles = [20, 60, 100, 140, 180, 220];

    cycles
        .into_iter()
        .filter(|x| check_cycles.contains(&x.count))
        .map(|x| x.register * x.count)
        .sum::<i32>()
}

fn part_two(filename: &str) -> String {
    let instructions = parse_data(filename);
    let cycles = create_cycles(instructions);
    let crt = generate_crt(&cycles);
    crt
}

fn create_cycles(instructions: Vec<Instruction>) -> Vec<Cycle> {
    let mut register = 1;
    let mut count = 1;
    let mut cycles: Vec<Cycle> = vec![];

    cycles.push(Cycle {
        count,
        register,
        crt: (count - 1) % 40,
    });

    for instruction in instructions {
        if count >= 240 {
            break;
        }

        match instruction.opcode {
            Opcode::ADDX => {
                count += 1;

                cycles.push(Cycle {
                    count,
                    register,
                    crt: (count - 1) % 40,
                });

                match instruction.value {
                    Some(x) => register += x,
                    None => register += 0,
                };

                count += 1;

                cycles.push(Cycle {
                    count,
                    register,
                    crt: (count - 1) % 40,
                });
            }
            Opcode::NOOP => {
                count += 1;

                cycles.push(Cycle {
                    count,
                    register,
                    crt: (count - 1) % 40,
                });
            }
        }
    }

    cycles
}

fn generate_crt(cycles: &Vec<Cycle>) -> String {
    let mut crt = "".to_owned();

    for cycle in cycles {
        if (cycle.register - cycle.crt).abs() < 2 {
            crt.push_str("#");
        } else {
            crt.push_str(".");
        }

        if cycle.crt != 0 && cycle.crt % 39 == 0 {
            crt.push_str("\n");
        }
    }

    crt
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

    #[test]
    fn should_pass_part_two_example() {
        let mut crt = String::from("");
        crt.push_str("##..##..##..##..##..##..##..##..##..##..\n");
        crt.push_str("###...###...###...###...###...###...###.\n");
        crt.push_str("####....####....####....####....####....\n");
        crt.push_str("#####.....#####.....#####.....#####.....\n");
        crt.push_str("######......######......######......####\n");
        crt.push_str("#######.......#######.......#######.....\n");

        assert_eq!(crt, part_two(DATA_FILE_NAME_EXAMPLE));
    }

    #[test]
    fn should_pass_part_two() {
        let mut crt = String::from("");
        crt.push_str("###..#..#..##..####..##....##.###..###..\n");
        crt.push_str("#..#.#.#..#..#....#.#..#....#.#..#.#..#.\n");
        crt.push_str("#..#.##...#..#...#..#..#....#.###..#..#.\n");
        crt.push_str("###..#.#..####..#...####....#.#..#.###..\n");
        crt.push_str("#.#..#.#..#..#.#....#..#.#..#.#..#.#.#..\n");
        crt.push_str("#..#.#..#.#..#.####.#..#..##..###..#..#.\n");

        assert_eq!(crt, part_two(DATA_FILE_NAME));
    }
}

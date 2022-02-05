mod lib;

fn main() {
    let displays = lib::read_in_displays(lib::FILE_NAME);
    let digit_count_part_one = lib::calculate_digit_count_of_1_4_7_8(&displays);
    let part_two = lib::part_two(&displays);

    println!("");
    println!(
        "Part One: Count of 1, 4, 7, or 8 Digits = {}",
        digit_count_part_one
    );
    println!("Part Two: ?? = {}", "??");
    println!("");
}

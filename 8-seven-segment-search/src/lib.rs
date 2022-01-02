use std::fs;

pub fn read_in_digits(filename: &str) -> String {
    fs::read_to_string(filename).expect("Something went wrong reading the file")
}

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn internal() {
//         assert_eq!(4, read_in_digits("temp"));
//     }
// }

export class MagentoCountry {
  id: string;
  twoLetterAbbreviation?: string;
  threeLetterAbbreviation?: string;
  fullNameEnglish: string;

  constructor({
    id,
    two_letter_abbreviation,
    three_letter_abbreviation,
    full_name_english,
  }: {
    id: string;
    two_letter_abbreviation?: string;
    three_letter_abbreviation?: string;
    full_name_english: string;
  }) {
    this.id = id;
    this.twoLetterAbbreviation = two_letter_abbreviation;
    this.threeLetterAbbreviation = three_letter_abbreviation;
    this.fullNameEnglish = full_name_english;
  }
}

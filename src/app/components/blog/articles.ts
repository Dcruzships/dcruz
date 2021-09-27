export class Article {
  id: string;
  title: string;
  author: string;
  date: any;
  body: any;
  banner: any;

  parseDate(date: string): String {
    // Date is in format 2021-08-19T20:14:58.836Z
    const formatted = date.split("T");
    if(formatted.length !== 2) return "";
    const fields = formatted[0].split("-");
    const day = fields[2];
    const month = this.parseMonth(parseInt(fields[1]));
    const year = fields[0];
    // 20:14:58.836Z -> split(.) = 20:14:58 -> split(:)
    const fTime = formatted[1].split(".")[0].split(":");
    let fHour = parseInt(fTime[0]);
    // Time is 0 based
    fHour++;
    // Convert from UTC to my time CST (6 hours back)
    fHour -= 6;
    if(fHour < 0) fHour = 24 - fHour;
    const hour = (fHour > 12) ? (fHour - 12) : fHour;
    const min = fTime[1];
    const xm = (fHour > 12) ? "pm" : "am";
    return `${month} ${day}, ${year} at ${hour}:${min}${xm}`;
  }

  parseMonth(month: number): string {
    switch(month) {
      case 1: return "January";
      case 2: return "February";
      case 3: return "March";
      case 4: return "April";
      case 5: return "May";
      case 6: return "June";
      case 7: return "July";
      case 8: return "August";
      case 9: return "SEPTEMBER";
      case 10: return "October";
      case 11: return "November";
      case 12: return "December";
      default: return "Some Month";
    }
  }

  constructor(id: string, doc: string, date: string) {
    this.id = id;

    // Title will be wrapped in {} for now
    const titleRegex = /{([^}]*)}/;
    const title = (doc.match(titleRegex));
    this.title = (title) ? title[1] : "Unknown Title";

    // Body will be after {title} with white lines in front
    const bodyRegex = /^\s*$(?:\r\n?|\n)/gm;
    let body = doc.replace(bodyRegex,"");
    body = body.split("}")[1].substring(1);
    body = body.split("\r").join("\n\n");
    this.body = body;

    // Date is in format 2021-08-19T20:14:58.836Z
    this.date = this.parseDate(date);

    this.author = "Captain Brando!"
  }
}

/**
 * A static "Article" that contains basic information for each Article share link
 */
export interface PseudoArt {
    title: string;
    date: string;
    banner: string;
}

/**
 * Static list of all Articles, must be updated manually for now
 */
export const allArticles: PseudoArt[] = [
    {
        title: "Money Moves",
        date: "August 20, 2021",
        banner: ""
    },
    {
        title: "Bachelor In Paradise S7E1 Review",
        date: "August 21, 2021",
        banner: ""
    }
]
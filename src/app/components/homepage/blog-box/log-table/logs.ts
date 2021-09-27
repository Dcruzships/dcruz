/**
 * A Log, or an updates list to keep track of site changes
 */
export class Log {
  title: string;
  messages: string[];
  date: string;

  constructor(title: string, date: string, msg: string[]) {
    this.title = title;
    this.date = date;
    this.messages = msg;
  }
}

/**
 * Where all Logs are stored, must be updated manually
 */
export const logs: Log[] = [
    new Log("Log Init", "August 31, 2021", [
        "Created log list",
        "Added old Cigs Inside recordings",
        "Modularized item lists and tidied up code",
        "Created psudo-blog list for possible static blog share links"
    ]),
    new Log("Updated Projects", "September 20, 2021", [
        "Updated Projects panel",
        "Used swiper.js for better showcase list",
        "Changed inactive text for music visualizer"
    ])
];
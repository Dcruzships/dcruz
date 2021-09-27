import { trigger, transition, style, animate } from "@angular/animations";
import { Component, ViewEncapsulation, OnInit, HostListener } from "@angular/core";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export class Project {
  id: string;
  name: string;
  media: string;
  mediaAlt: string;
  description: string;
  tech: string;
  link: string;

  constructor(id: number, name: string, media: string, description: string, tech: string, link: string) {
    this.id = `vid${id}`;
    this.name = name;
    this.media = `../../../assets/vid/${media}`;
    this.mediaAlt = `../../../assets/vid/${media.substring(0, (media.length - 5))}.m4v`;
    this.description = description
    this.tech = tech;
    this.link = link;
  }
}

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('InOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-750px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateX(0px)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0px)' }),
        animate('500ms', style({ opacity: 0, transform: 'translateX(750px)' })),
      ])
    ]),
    trigger('OutIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(750px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateX(0px)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0px)' }),
        animate('500ms', style({ opacity: 0, transform: 'translateX(-750px)' })),
      ])
    ]),
  ]
})
export class ShowcaseComponent implements OnInit {

  projects: Project[] = [
    new Project(0, "am_radio", "amradio.webm", "A Spotify player that allows for live music listening and discovery through 24/7 user created radio stations. Features a rich customizable visualizer, websocket chatrooms, and more.", "Angular 12, Spring Boot, Spotify Web API/Playback SDK, Sock.js, Stomp.js, Java 11 Threads, d3 Data, Docker, AWS EC2", "https://amradio.app"),
    new Project(1, "Day Six Farm", "goats.webm", "A website for Day Six Farm in Prosper, TX.", "React.js, MongoDB, Grommet, GitHub Pages", "https://dcruzships.github.io/goats"),
    new Project(2, "Link Social Network", "link.webm", "Social media website with chatrooms, custom JWT authorization, and notifications along with all 40forty features. Built with a microservice architecture and test driven development. Created as part of a Revature training boot camp with a team of 20 in April 2021.", "Angular 8, JSON Web Token, Spring Boot Data / Web / WebSocket / Gateway / Eureka, JDBC, Lombok, PostgreSQL, AWS RDS & S3, Docker, JUnit 5, Bootstrap 5, Log4J", "https://github.com/LinkSocialNetwork/GlobalReadMe"),
    new Project(3, "40forty", "forty.webm", "Social media website where all user data is deleted every 40 days. Features post feeds, media sharing, and user profiles. Created with test driven development as part of a Revature training boot camp with a team of 4 in March 2021.", "Angular 8, Spring MVC / AOP, Hibernate, H2 DB, PostgreSQL, AWS RDS & S3 & Lambda, JUnit 5, HTML/CSS/JS, Log4J", "https://github.com/cptnbrando/40forty")
  ];

  swiper: any;
  index: number = 0;
  showInfo: boolean = false;
  isMobile: boolean = false;

  constructor() { }

  ngOnInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

  /**
   * Set the swiper and play the first vid
   * @param swiper The swiper element
   */
  onSwiper(swiper: any) {
    this.swiper = swiper;
    this.swiper.el.querySelector(`#vid0`).play();
  }

  /**
   * On the slide change, play the video and pause the previous one
   */
  change() {
    if(this.swiper) {
      if(this.swiper.realIndex !== this.index) {
        this.index = this.swiper.realIndex;
        this.swiper.el.querySelector(`#vid${this.swiper.previousIndex - 1}`).pause();
        this.swiper.el.querySelector(`#vid${this.index}`).play();
      }
    }
  }

  info(num: number): boolean {
    if(this.isMobile) return true;
    else {
      return (num === 1) ? true : false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(event.target.innerWidth <= 800) {
      this.isMobile = true;
      this.showInfo = true;
    } else {
      this.isMobile = false;
      this.showInfo = false;
    }
  }

}

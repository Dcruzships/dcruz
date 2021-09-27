import { Component, OnInit } from '@angular/core';
import { faBandcamp, faFacebook, faGithub, faInstagram, faLinkedin, faSoundcloud, faSpotify, faTwitter, faYoutube, IconLookup } from '@fortawesome/free-brands-svg-icons';

interface Social{
  name: string;
  icon: IconLookup;
  link: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  socials: Social[] = [
    {
      name: "Facebook",
      icon: faFacebook,
      link: "https://www.facebook.com/cptnbrando"
    },
    {
      name: "Instagram",
      icon: faInstagram,
      link: "https://www.instagram.com/captainbrandooo/"
    },
    {
      name: "Twitter",
      icon: faTwitter,
      link: "https://twitter.com/captainbrandooo"
    },
    {
      name: "Github",
      icon: faGithub,
      link: "https://github.com/cptnbrando"
    },
    {
      name: "LinkedIn",
      icon: faLinkedin,
      link: "https://github.com/cptnbrando"
    },
    {
      name: "YouTube",
      icon: faYoutube,
      link: "https://www.youtube.com/channel/UCI4jsm1lBwLHCF_dLr4iM9Q"
    },
    {
      name: "Spotify",
      icon: faSpotify,
      link: "https://open.spotify.com/artist/5jAV7NfXioEK4rS1WmoeDA?si=VSvC2JqLRLyIO_Cyuf2Tbw"
    },
    {
      name: "SoundCloud",
      icon: faSoundcloud,
      link: "https://soundcloud.com/cptnbrando"
    },
    {
      name: "Bandcamp",
      icon: faBandcamp,
      link: "https://cptnbrando.bandcamp.com"
    }
  ]

  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faGithub = faGithub;
  faSpotify = faSpotify;
  faYoutube = faYoutube;
  faSoundcloud = faSoundcloud;
  faBandcamp = faBandcamp;
  faLinkedin = faLinkedin;

  constructor() { }

  ngOnInit(): void {
  }

  vid(): void {
    window.open("https://youtu.be/XcForynThz0", "_blank");
  }

}

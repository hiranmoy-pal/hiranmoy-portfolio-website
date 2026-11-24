import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../../layout/header/header';
import { About } from '../../layout/about/about';
import { Contact } from '../../layout/contact/contact';
import { Education } from '../../layout/education/education';
import { HeroSection } from '../../layout/hero-section/hero-section';
import { Projects } from '../../layout/projects/projects';
import { Skills } from '../../layout/skills/skills';
import { WorkExperience } from '../../layout/work-experience/work-experience';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, Header, About, Contact, Education, HeroSection, Projects, Skills, WorkExperience],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home { }

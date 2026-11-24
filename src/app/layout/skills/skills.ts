import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type SkillCategoryKey = 'all' | 'languages' | 'technologies' | 'tools' | 'familiar';

interface SkillGroup {
  key: Exclude<SkillCategoryKey, 'all'>;
  title: string;
  subtitle: string;
  icon: string;
  items: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  activeCategory = signal<SkillCategoryKey>('all');

  readonly marqueeStack = [
    'Angular v22',
    'Angular Signals',
    'Angular SSR',
    'Hydration',
    'Ionic Framework',
    'Capacitor & Cordova',
    'TypeScript',
    'RxJS & NgRx',
    'RESTful APIs',
    'SCSS',
  ];

  readonly filterTabs: { key: SkillCategoryKey; label: string }[] = [
    { key: 'all', label: 'All Stack' },
    { key: 'languages', label: 'Languages' },
    { key: 'technologies', label: 'Technologies' },
    { key: 'tools', label: 'Tools' },
    { key: 'familiar', label: 'Familiar With' },
  ];

  readonly skillGroups: SkillGroup[] = [
    {
      key: 'languages',
      title: 'Languages',
      subtitle: 'Core web foundations',
      icon: 'fa-code',
      items: ['HTML5', 'CSS', 'JavaScript', 'TypeScript'],
    },
    {
      key: 'technologies',
      title: 'Technologies',
      subtitle: 'Frameworks, state & hybrid mobile',
      icon: 'fa-cubes',
      items: [
        'Angular (v2 to v22)',
        'Angular Signals',
        'Angular-SSR',
        'Hydration',
        'Angular CLI',
        'Angular Material',
        'Angular Forms (Reactive & Template-driven)',
        'Angular Routing & Lazy Loading',
        'Angular Animations',
        'RxJS',
        'NgRx',
        'HTTPClientModule',
        'RESTful APIs Integration',
        'Ionic Framework (Cordova & Capacitor)',
        'Ionic CLI',
        'Ionic Components',
        'Ionic Native / Plugins (Camera, Storage, Push Notifications, Firebase Integration, etc.)',
        'SCSS',
        'Bootstrap',
        'jQuery',
        'AJAX',
      ],
    },
    {
      key: 'tools',
      title: 'Tools',
      subtitle: 'Daily dev & collaboration workflow',
      icon: 'fa-wrench',
      items: [
        'Visual Studio Code',
        'Postman',
        'Swagger',
        'Jira',
        'Git',
        'GitHub',
        'GitLab',
      ],
    },
    {
      key: 'familiar',
      title: 'Familiar With',
      subtitle: 'Backend & delivery methodologies',
      icon: 'fa-compass',
      items: ['Java', 'MySQL', 'Agile & Scrum Methodology'],
    },
  ];

  readonly visibleGroups = computed(() => {
    const selected = this.activeCategory();
    if (selected === 'all') return this.skillGroups;
    return this.skillGroups.filter((group) => group.key === selected);
  });

  setCategory(key: SkillCategoryKey): void {
    this.activeCategory.set(key);
  }
}
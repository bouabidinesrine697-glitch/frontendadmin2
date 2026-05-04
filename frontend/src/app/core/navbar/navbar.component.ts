import { Component } from '@angular/core';
interface NavItem {
  label: string;
  route: string;
  icon: string;
  badge?: number;
  badgeType?: 'default' | 'warn';
}

interface NavSection {
  title: string;
  items: NavItem[];
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 isOpen = true;

  sections: NavSection[] = [
    {
      title: 'Principal',
      items: [
        { label: 'Tableau de bord', route: '/dashboard', icon: 'dashboard' },
      ],
    },
    {
      title: 'Gestion',
      items: [
                { label: 'Zones', route: '/zone/list', icon: 'scooter',  badge: 42 },

        { label: 'Trottinettes', route: '/trottinette/list', icon: 'scooter',  badge: 42 },
        { label: 'Clients',      route: '/client/clients',      icon: 'users',    badge: 128 },
        { label: 'Réservations', route: '/reservation/list', icon: 'calendar', badge: 7, badgeType: 'warn' },
                 { label: 'Factures', route: '/facture/', icon: 'scooter', badge: 4, badgeType: 'warn' },

      ],
    },
    {
      title: 'Compte',
      items: [
        { label: 'Profil',       route: '/profil',       icon: 'profile' },
        { label: 'Utilisateurs', route: '/utilisateurs', icon: 'team' },
        { label: 'Paramètres',   route: '/parametres',   icon: 'settings' },
      ],
    },
    
  ];

  toggle() { this.isOpen = !this.isOpen; }
  closeUserDropdown(){}
}
